import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma.service";
import { DashboardController } from "./dashboard.controller";
import { WebhookController } from "./webhook.controller";
import { OnboardingController } from "./onboarding.controller";

@Module({
  imports: [],
  controllers: [AppController, DashboardController, WebhookController, OnboardingController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
