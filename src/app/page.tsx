import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const games = await prisma.game.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-8">Game Gallery</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {games.map((game: any) => (
            <Link
              key={game.id}
              href={`/games/${game.id}`}
              className="block p-6 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold">{game.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
