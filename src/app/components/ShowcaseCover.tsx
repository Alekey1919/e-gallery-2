import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const ShowcaseCover = ({
  screenshot,
  gameName,
  gameId,
  containerRef,
}: {
  screenshot: string;
  gameName: string;
  gameId: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Set up isReady state after component mounts and containerRef is valid
  useEffect(() => {
    setIsReady(true);
  }, []);

  // Use framer-motion's useScroll to track scroll progress on the container
  const { scrollYProgress } = useScroll(
    isReady
      ? {
          container: containerRef,
          target: targetRef,
          offset: ["start start", "end start"],
        }
      : {}
  );

  // Map scroll progress [0, 1] to blur [0px, 20px]
  const blur = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(0px)", "blur(20px)"]
  );

  const translateValue = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <div
      className="w-screen h-screen !bg-cover relative overflow-hidden"
      ref={targetRef}
    >
      <motion.img
        src={screenshot}
        alt={`${gameName} cover`}
        className="w-full h-full object-cover absolute inset-0 z-0 scale-[1.5]"
        style={{
          filter: blur,
          translateY: translateValue,
        }}
      />
      <div className="w-full h-full bg-white opacity-15 absolute inset-0 z-10" />
      <h1
        className={twMerge(
          "absolute bottom-1/4 left-0 right-0 mx-auto lg:right-[unset] lg:mx-0 lg:left-1/4",
          "text-center lg:text-left text-xl lg:text-4xl lg:leading-[50px] 3xl:!text-[55px] 4xl:!text-[70px]",
          "mb-7 lg:mb-12 3xl:!mb-16 text-white z-20 max-w-[80%] lg:max-w-[35%]"
        )}
      >
        <a
          href={`https://store.steampowered.com/app/${gameId}/`}
          target="_blank"
        >
          {gameName}
        </a>
      </h1>
    </div>
  );
};

export default ShowcaseCover;
