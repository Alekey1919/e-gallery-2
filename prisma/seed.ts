import { PrismaClient } from "@prisma/client";
import gamesData from "../data/games.json";
import screenshotsData from "../data/screenshots.json";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Clear existing data
  await prisma.screenshot.deleteMany({});
  await prisma.game.deleteMany({});

  console.log("Cleared existing data");

  // Insert games
  for (const game of gamesData) {
    await prisma.game.create({
      data: {
        id: game.id,
        name: game.name,
      },
    });
  }

  console.log(`Inserted ${gamesData.length} games`);

  // Insert screenshots
  for (const screenshot of screenshotsData) {
    await prisma.screenshot.create({
      data: {
        url: screenshot.url,
        gameId: screenshot.gameId,
      },
    });
  }

  console.log(`Inserted ${screenshotsData.length} screenshots`);

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
