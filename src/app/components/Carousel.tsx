"use client";

import { useEffect, useRef, useState } from "react";
import Showcase from "./Showcase";
import Lenis from "lenis";
import CarouselGameCover from "./CarouselGameCover";

// Define types for game data
interface Screenshot {
  id: string;
  url: string;
  gameId: string;
}

interface Game {
  id: string;
  name: string;
  screenshots?: Screenshot[];
}

const Carousel = ({ games }: { games: Game[] }) => {
  const [selectedGame, setSelectedGame] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (!targetRef.current || !containerRef.current) return;

    // Initialize Lenis with the container element as the wrapper
    const lenis = new Lenis({
      wrapper: containerRef.current,
      content: targetRef.current,
      orientation: "horizontal",
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="h-screen overflow-auto">
        <div className="relative flex h-[500vh] w-full">
          <div
            className="sticky top-0 h-screen bg-background flex items-end justify-between overflow-hidden w-full left-0"
            ref={containerRef}
          >
            <div className="fixed top-20 left-20">
              <h1 className="text-4xl font-bold mb-8">E-gallery</h1>
              <p className="text-xl">The art of in-game photography</p>
            </div>
            <div className="w-full">
              <div
                className="flex items-end space-x-10 pb-20 px-20"
                ref={targetRef}
              >
                {games.map((game) => {
                  if (!game.screenshots) return null; // Skip if no screenshots

                  return (
                    <CarouselGameCover
                      key={game.id}
                      gameName={game.name}
                      screenshotProps={{
                        src: game.screenshots[0].url,
                        onClick: () =>
                          setSelectedGame({ id: game.id, name: game.name }),
                        containerRef: containerRef,
                        parallaxAxis: "x",
                      }}
                    />
                  );
                })}
                <div className="bg-transparent h-1 w-10 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedGame !== null && (
        <Showcase
          gameId={selectedGame.id}
          gameName={selectedGame.name}
          handleClose={() => setSelectedGame(null)}
        />
      )}
    </>
  );
};

export default Carousel;
