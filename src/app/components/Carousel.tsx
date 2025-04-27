"use client";

import { useEffect, useRef, useState } from "react";
import Showcase from "./Showcase";
import Lenis, { LenisOptions } from "lenis";
import CarouselGameCover from "./CarouselGameCover";
import useMediaQueryState, {
  DefaultBreakpoints,
} from "../hooks/useMediaQueryState";
import { twMerge } from "tailwind-merge";
import InitialAnimation from "./InitialAnimation";
import Title from "./Title";
import { CarouselContextProvider } from "../contexts/CarouselContext";

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
  const [lenisInst, setLenisInst] = useState<Lenis | null>(null);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [initialScrollHappened, setInitialScrollHappened] = useState(false);
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

    setLenisInst(lenis);

    return () => {
      lenis.destroy();
    };
  }, [lgScreen]);

  useEffect(() => {
    if (initialScrollHappened) return;

    if (animationFinished) {
      // Trigger Lenis scroll animation to the top of the container
      if (lenisInst && containerRef.current) {
        lenisInst.scrollTo(
          lgScreen ? window.innerWidth / 2 : window.innerHeight / 2,
          {
            duration: 2,
            // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          }
        );
        setInitialScrollHappened(true);
      }
    }
  }, [animationFinished, lenisInst, lgScreen, initialScrollHappened]);

  return (
    <CarouselContextProvider
      state={{
        carouselContainerRef: containerRef,
        carouselTargetRef: targetRef,
        setAnimationFinished,
        animationFinished,
      }}
    >
      <>
        <div className="lg:h-screen overflow-auto">
          <div className="relative lg:flex-row lg:h-[500vh] w-full">
            <div
              className={twMerge(
                "flex flex-col lg:flex-row lg:sticky lg:top-0 lg:h-screen bg-background items-start lg:items-end justify-between overflow-hidden w-full left-0",
                "lg:!p-0 space-y-10 lg:space-y-0 scroll-smooth"
              )}
              ref={containerRef}
            >
              <Title style="hidden lg:block fixed top-10 lg:top-10 lg:left-10 3xl:!top-20 3xl:!left-20 z-20" />

              <div
                className={twMerge(
                  "grid gap-6 grid-cols-1 md:grid-cols-2 lg:gap-0 mx-auto lg:mx-0",
                  "lg:flex lg:flex-row lg:items-end lg:space-x-6 3xl:!space-x-10 4xl:!space-x-14 pb-6 lg:px-10 lg:pb-10 3xl:!pb-20 3xl:!px-20"
                )}
                ref={targetRef}
              >
                {lenisInst && <InitialAnimation />}
                <Title style="lg:hidden text-center md:col-span-2" />
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
                      styles="px-6"
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
    </CarouselContextProvider>
  );
};

export default Carousel;
