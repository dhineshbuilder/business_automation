const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding real Meta WhatsApp credentials into local database...");

  // 1. Get or create Workspace
  let workspace = await prisma.workspace.findFirst();
  if (!workspace) {
    workspace = await prisma.workspace.create({
      data: {
        name: "My Business Workspace",
        slug: "my-business-workspace",
      },
    });
  }

  // 2. Insert WhatsAppAccount credentials
  let waAccount = await prisma.whatsAppAccount.findFirst({
    where: { workspaceId: workspace.id },
  });

  const payload = {
    phoneNumberId: "1251524281378095",
    wabaId: "877271865426658",
    accessToken: "EAAVnQ0rVkZBsBR9MYvf1VZAy0tRS0wmSuofBHW5uKr0mkzOzf6l7QYj93ceiOZAll16ApriDtobp3ZCGZCzjP3ZB1H0oxplUAfamZBIZAI33fXRXqNsLv7NmZBX4LntIsAyZBk4dtRkZBeSKz2MkOYDORYp4GfhQYgrwBURfi0KaUOijtmYcw7FM0tAj1g53haZCjYE7yZBeBV0eZABZBlUc3DNEiLLl3WSQFnBP7NO4BV5xzZC0kuSrewD44D2S4Jm3RqcaXMG2MFaZAYfeIMqw2xTbFw6QH",
    verifyToken: "flowchat_secret_token",
    numberStatus: "ACTIVE",
    qualityRating: "HIGH",
  };

  if (waAccount) {
    waAccount = await prisma.whatsAppAccount.update({
      where: { id: waAccount.id },
      data: payload,
    });
    console.log("Updated existing WhatsAppAccount connection.");
  } else {
    waAccount = await prisma.whatsAppAccount.create({
      data: {
        workspaceId: workspace.id,
        ...payload,
      },
    });
    console.log("Created new WhatsAppAccount connection.");
  }

  console.log("Done! Real credentials successfully linked to workspace:", workspace.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
