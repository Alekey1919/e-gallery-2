"use client";

import { useEffect, useRef, useState } from "react";
import Showcase from "./Showcase";
import Lenis, { LenisOptions } from "lenis";
import CarouselGameCover from "./CarouselGameCover";
import useMediaQueryState, {
  DefaultBreakpoints,
} from "../hooks/useMediaQueryState";
import { twMerge } from "tailwind-merge";

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

  const lgScreen = useMediaQueryState({ breakpoint: DefaultBreakpoints.lg });

  useEffect(() => {
    history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    // On desktop - use refs for horizontal scrolling within container
    if (!targetRef.current || !containerRef.current) return;

    const lenisOptions: LenisOptions = {
      duration: 1.2,
      touchMultiplier: 4, // Increased for better touch response
      syncTouch: true, // Synchronizes touch events
      smoothWheel: true, // Smooth wheel scrolling
      wheelMultiplier: 1, // Adjust wheel sensitivity
      autoRaf: true,
      orientation: lgScreen ? "horizontal" : "vertical",
    };

    // For mobile, we don't need specific refs as we're scrolling the entire document
    // For desktop, we use the container and target refs for horizontal scrolling
    if (lgScreen) {
      lenisOptions.wrapper = containerRef.current;
      lenisOptions.content = targetRef.current;
    }

    const lenis = new Lenis({
      ...lenisOptions,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    return () => {
      lenis.destroy();
    };
  }, [lgScreen]);

  return (
    <>
      <div className="lg:h-screen overflow-auto">
        <div className="relative lg:flex-row lg:h-[500vh] w-full">
          <div
            className={twMerge(
              "flex flex-col lg:flex-row lg:sticky lg:top-0 lg:h-screen bg-background items-start lg:items-end justify-between overflow-hidden w-full left-0",
              "px-4 py-8 lg:!p-0 space-y-10 lg:space-y-0"
            )}
            ref={containerRef}
          >
            <div className="lg:fixed lg:top-10 lg:left-10 3xl:!top-20 3xl:!left-20">
              <h1 className="text-2xl sm:text-3xl 3xl:!text-4xl font-bold mb-4 3xl:!mb-8">
                E-gallery
              </h1>
              <p className="text-base sm:text-lg 3xl:!text-xl">
                The art of in-game photography
              </p>
            </div>
            <div
              className={twMerge(
                "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:gap-0 mx-auto lg:mx-0",
                "lg:flex lg:flex-row lg:items-end lg:space-x-6 3xl:!space-x-10 4xl:!space-x-14 lg:px-10 lg:pb-10 3xl:!pb-20 3xl:!px-20 "
              )}
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
                      containerRef: lgScreen ? containerRef : undefined,
                      parallaxAxis: lgScreen ? "x" : "y",
                    }}
                  />
                );
              })}
              {/* Add some space at the end of the carousel */}
              <div className="hidden lg:block bg-transparent h-1 lg:w-2 3xl:!w-10 shrink-0" />
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
