import { prisma } from "@/lib/db";
import Carousel from "./components/Carousel";

export default async function Home() {
  // Fetch games with their screenshots
  const games = await prisma.game.findMany({
    orderBy: { order: "asc" }, // Order by the order field instead of name
    include: {
      screenshots: {
        orderBy: { gameCover: "desc" }, // Order by gameCover (true values first)
        take: 1, // We only need one screenshot per game for the carousel
      },
    },
  });

  return (
    <main className="min-h-screen">
      <div className="w-full">
        <Carousel games={games} />
      </div>
    </main>
  );
}
