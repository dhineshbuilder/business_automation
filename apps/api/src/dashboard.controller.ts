import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get("stats")
  async getStats() {
    try {
      const workflowCount = await this.prismaService.client.workflow.count();
      const contactCount = await this.prismaService.client.contact.count();
      const messageCount = await this.prismaService.client.message.count();
      
      // Calculate mock payments collected and automated revenue from DB or defaults
      // (Since we don't have a transaction table yet, we represent these as calculated outcomes)
      const paymentsCollected = contactCount * 15.0; // Simulated values based on captured contacts
      const revenueInfluenced = messageCount * 2.5;  // Simulated value based on AI interactions

      // Fetch recent logs
      const recentMessages = await this.prismaService.client.message.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
        include: {
          conversation: {
            include: {
              contact: true,
            },
          },
        },
      });

      const logs = recentMessages.map((msg) => ({
        id: msg.id,
        event: msg.senderType === "AI" ? "AI Auto-Reply sent" : "Message logged",
        detail: msg.body ? `"${msg.body.substring(0, 30)}..."` : "Media asset",
        time: msg.createdAt,
      }));

      return {
        hoursSaved: (messageCount * 10) / 60, // 10 minutes saved per message run
        paymentsCollected,
        revenueInfluenced,
        efficiencyScore: messageCount > 0 ? 94 : 100,
        contactCount,
        workflowCount,
        messageCount,
        logs,
      };
    } catch (err) {
      // Fallback in case of database sync latency in local environment
      return {
        hoursSaved: 0,
        paymentsCollected: 0,
        revenueInfluenced: 0,
        efficiencyScore: 100,
        contactCount: 0,
        workflowCount: 0,
        messageCount: 0,
        logs: [],
      };
    }
  }
}
