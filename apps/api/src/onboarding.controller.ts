import { Controller, Post, Body, HttpStatus, HttpException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

interface VerifyDto {
  phoneNumber: string;
  phoneNumberId: string;
  accessToken: string;
  wabaId: string;
}

@Controller("onboarding")
export class OnboardingController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post("verify")
  async verifyAndLink(@Body() dto: VerifyDto) {
    try {
      const { phoneNumber, phoneNumberId, accessToken, wabaId } = dto;

      if (!phoneNumber || !phoneNumberId || !accessToken) {
        throw new HttpException("Missing required credentials", HttpStatus.BAD_REQUEST);
      }

      // 1. Find or create default Workspace
      let workspace = await this.prismaService.client.workspace.findFirst();
      if (!workspace) {
        workspace = await this.prismaService.client.workspace.create({
          data: {
            name: "My Business Workspace",
            slug: "my-business-workspace",
          },
        });
      }

      // 2. Link WhatsApp account parameters to DB
      let waAccount = await this.prismaService.client.whatsAppAccount.findFirst({
        where: { workspaceId: workspace.id },
      });

      if (waAccount) {
        await this.prismaService.client.whatsAppAccount.update({
          where: { id: waAccount.id },
          data: {
            phoneNumberId,
            wabaId,
            accessToken,
            verifyToken: "flowchat_secret_token",
          },
        });
      } else {
        await this.prismaService.client.whatsAppAccount.create({
          data: {
            workspaceId: workspace.id,
            phoneNumberId,
            wabaId,
            accessToken,
            verifyToken: "flowchat_secret_token",
          },
        });
      }

      return { status: "success", message: "WhatsApp number successfully linked to workspace!" };
    } catch (err: any) {
      throw new HttpException(err.message || "Failed to link credentials", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
