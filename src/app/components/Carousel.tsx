"use client";

import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Showcase from "./Showcase";

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
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Create a more isolated scroll tracking configuration
  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: targetRef,
    offset: ["start", "end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  useEffect(() => {
    history.scrollRestoration = "manual";
  }, []);

  const x = useTransform(smoothProgress, [0, 1], ["0%", "-83%"]);

  return (
    <>
      <div ref={containerRef} className="h-screen overflow-auto">
        <div ref={targetRef} className="relative flex h-[500vh] w-full">
          <div className="sticky top-0 h-screen bg-background flex items-end overflow-hidden w-full left-0">
            <div className="absolute top-20 left-20">
              <h1 className="text-4xl font-bold mb-8">E-gallery</h1>
              <p className="text-xl">The art of in-game photography</p>
            </div>
            <motion.div
              className="flex space-x-10 pb-4 px-4"
              style={{ x }}
              transition={{ type: "tween", ease: "easeOut" }}
            >
              {games.map((game) => (
                <Card
                  key={game.id}
                  game={game}
                  onClick={() => setSelectedGame(game.id)}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      {selectedGame !== null && (
        <Showcase
          gameId={selectedGame}
          handleClose={() => setSelectedGame(null)}
        />
      )}
    </>
  );
};

export default Carousel;
