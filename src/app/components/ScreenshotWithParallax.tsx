import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
export interface ScreenshotWithParallaxProps {
  src: string;
  parallaxAxis: "x" | "y";
  onClick?: () => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  styles?: string;
}

const ScreenshotWithParallax = ({
  src,
  parallaxAxis,
  onClick,
  containerRef,
  styles,
}: ScreenshotWithParallaxProps) => {
  const contentRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Set up isReady state after component mounts and containerRef is valid
  useEffect(() => {
    setIsReady(true);
  }, []);

  // Only create the scroll progress when the container is ready
  const { scrollXProgress, scrollYProgress } = useScroll(
    isReady
      ? {
          container: containerRef,
          target: contentRef,
          axis: parallaxAxis,
          offset: ["start end", "end start"],
        }
      : { target: contentRef }
  );

  const translateValue = useTransform(
    parallaxAxis === "x" ? scrollXProgress : scrollYProgress,
    [0, 1],
    ["10%", "-10%"]
  );

  return (
    <div
      className={twMerge(
        "relative cursor-pointer opacity-0 transition-opacity",
        styles,
        isReady && "opacity-100"
      )}
      onClick={onClick}
    >
      <div className="w-full overflow-hidden" ref={contentRef}>
        <motion.div
          className="w-full scale-[1.2]"
          style={{
            translateX: parallaxAxis === "x" ? translateValue : 0,
            translateY: parallaxAxis === "y" ? translateValue : 0,
          }}
        >
          <Image
            src={src}
            alt={`Screenshot`}
            className="w-full"
            width={1000}
            height={1000}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ScreenshotWithParallax;
