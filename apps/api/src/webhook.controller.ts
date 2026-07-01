import { Controller, Get, Post, Req, Res, Query, HttpStatus } from "@nestjs/common";
import * as express from "express";
import { PrismaService } from "./prisma.service";

@Controller("webhook")
export class WebhookController {
  private readonly VERIFY_TOKEN = "flowchat_secret_token";

  constructor(private readonly prismaService: PrismaService) {}

  // Meta Developer Webhook Verification Challenge
  @Get()
  verifyWebhook(
    @Query("hub.mode") mode: string,
    @Query("hub.verify_token") token: string,
    @Query("hub.challenge") challenge: string,
    @Res() res: express.Response
  ) {
    if (mode === "subscribe" && token === this.VERIFY_TOKEN) {
      return res.status(HttpStatus.OK).send(challenge);
    }
    return res.status(HttpStatus.FORBIDDEN).send("Verification failed");
  }

  // Receive Incoming WhatsApp message payloads
  @Post()
  async handleIncomingMessage(@Req() req: express.Request, @Res() res: express.Response) {
    try {
      const payload = req.body;

      // Check if this is a WhatsApp status update or actual message payload
      const entry = payload?.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const message = value?.messages?.[0];
      const contactInfo = value?.contacts?.[0];

      if (message) {
        const from = message.from; // Customer phone number
        const textBody = message.text?.body || "";
        const messageSid = message.id; // Meta Message ID
        const contactName = contactInfo?.profile?.name || "WhatsApp User";

        // 1. Fetch or create a default workspace to assign the records
        let workspace = await this.prismaService.client.workspace.findFirst();
        if (!workspace) {
          workspace = await this.prismaService.client.workspace.create({
            data: {
              name: "Default Workspace",
              slug: "default-workspace",
            },
          });
        }

        // 2. Find or create the contact in our CRM directory
        let contact = await this.prismaService.client.contact.findFirst({
          where: {
            workspaceId: workspace.id,
            phoneNumber: from,
          },
        });

        if (!contact) {
          contact = await this.prismaService.client.contact.create({
            data: {
              workspaceId: workspace.id,
              phoneNumber: from,
              firstName: contactName,
            },
          });
        }

        // 3. Find or create WhatsApp account connection
        let waAccount = await this.prismaService.client.whatsAppAccount.findFirst({
          where: { workspaceId: workspace.id },
        });

        if (!waAccount) {
          waAccount = await this.prismaService.client.whatsAppAccount.create({
            data: {
              workspaceId: workspace.id,
              phoneNumberId: "1234567890",
              wabaId: "0987654321",
              verifyToken: this.VERIFY_TOKEN,
              accessToken: "mock_token",
            },
          });
        }

        // 4. Find or create the active conversation thread
        let conversation = await this.prismaService.client.conversation.findFirst({
          where: {
            whatsAppAccountId: waAccount.id,
            contactId: contact.id,
          },
        });

        if (!conversation) {
          conversation = await this.prismaService.client.conversation.create({
            data: {
              whatsAppAccountId: waAccount.id,
              contactId: contact.id,
            },
          });
        }

        // 5. Save the inbound message record in the database
        await this.prismaService.client.message.create({
          data: {
            conversationId: conversation.id,
            senderType: "CUSTOMER",
            messageType: "TEXT",
            body: textBody,
            messageSid,
            status: "READ",
          },
        });

        // 6. Simulate an AI response and log it (to demo automation logs)
        if (textBody.toLowerCase().includes("pricing") || textBody.toLowerCase().includes("cost")) {
          await this.prismaService.client.message.create({
            data: {
              conversationId: conversation.id,
              senderType: "AI",
              messageType: "TEXT",
              body: "Here is our Price Catalog: Starter tier is $29/mo, Growth is $99/mo.",
              status: "SENT",
            },
          });
        }
      }

      return res.status(HttpStatus.OK).json({ status: "success" });
    } catch (err: any) {
      console.error("Webhook processing error:", err);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  }
}
