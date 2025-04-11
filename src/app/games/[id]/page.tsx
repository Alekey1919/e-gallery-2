import { prisma } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// Generate static paths for each game
export async function generateStaticParams() {
  const games = await prisma.game.findMany();
  return games.map((game: any) => ({
    id: game.id,
  }));
}

// Using 'any' for params to satisfy Next.js 15's PageProps constraint
export default async function GamePage({ params }: { params: any }) {
  const id = params.id as string;

  const game = await prisma.game.findUnique({
    where: { id },
    include: { screenshots: true },
  });

  if (!game) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-6xl">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 hover:underline">
            &larr; Back to Gallery
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8">{game.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {game.screenshots.map((screenshot: any) => (
            <div
              key={screenshot.id}
              className="border rounded-lg overflow-hidden"
            >
              <a
                href={screenshot.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative aspect-video">
                  <Image
                    src={screenshot.url}
                    alt={`Screenshot from ${game.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
