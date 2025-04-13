import { prisma } from "@/lib/db";
import Link from "next/link";
import Carousel from "./components/Carousel";

export default async function Home() {
  const games = await prisma.game.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="min-h-screen">
      <div className="w-full">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> */}
        {/* {games.map((game: any) => (
            <Link
              key={game.id}
              href={`/games/${game.id}`}
              className="block p-6 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold">{game.name}</h2>
            </Link>
          ))} */}
        {/* </div> */}

        <Carousel />
      </div>
    </main>
  );
}
