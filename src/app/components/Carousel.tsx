"use client";

import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const Carousel = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
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

  const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div ref={targetRef} className="relative flex h-[500vh] w-full">
      <div className="sticky top-0 h-screen bg-purple-400 flex items-end overflow-hidden w-full left-0">
        <motion.div
          className="flex space-x-10"
          style={{ x }}
          transition={{ type: "tween", ease: "easeOut" }}
        >
          {new Array(10).fill(0).map((_, index) => (
            <Card
              img={
                "https://images.steamusercontent.com/ugc/2462985844203913726/09C2D8A14331E0180553879C47040165961B7870/"
              }
              key={index}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Carousel;
