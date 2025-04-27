import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import ScreenshotWithParallax from "./ScreenshotWithParallax";
import ShowcaseCover from "./ShowcaseCover";

enum AnimationStep {
  LOADING,
  ENTER,
  EXIT,
}

const ShowcaseContent = ({
  screenshots,
  gameId,
  gameName,
  handleClose,
}: {
  screenshots: string[];
  gameName: string;
  gameId: string;
  handleClose: () => void;
}) => {
  const [animationStep, setAnimationStep] = useState(AnimationStep.LOADING);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !containerRef.current) return;

    setTimeout(() => {
      setAnimationStep(AnimationStep.ENTER);
    }, 100);

    // Initialize Lenis with the container element as the wrapper
    const lenis = new Lenis({
      wrapper: containerRef.current,
      content: contentRef.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      syncTouch: true, // Synchronizes touch events
      autoRaf: true,
    });

    // Cleanup function
    return () => {
      lenis.destroy();
    };
  }, []);

  const onClose = () => {
    setAnimationStep(AnimationStep.EXIT);

    setTimeout(() => {
      handleClose();
    }, 800); // Match the duration of the CSS transition
  };

  const onScroll = () => {
    if (!containerRef.current) return;

    const scrolledAllTheWay =
      containerRef.current.scrollTop + window.innerHeight >=
      containerRef.current.scrollHeight;

    if (scrolledAllTheWay) {
      onClose();
    }
  };

  return (
    <>
      <div
        className={twMerge(
          "bg-background fixed top-0 left-0 h-screen w-screen overflow-y-auto overflow-x-hidden translate-y-full duration-700 transition-transform",
          "pb-20 lg:pb-28 3xl:!pb-40",
          animationStep === AnimationStep.ENTER && "translate-y-0",
          animationStep === AnimationStep.EXIT && "-translate-y-full"
        )}
        ref={containerRef}
        onScroll={onScroll}
        style={{
          transitionTimingFunction: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
        }}
        id="containerRef"
      >
        <ShowcaseCover
          screenshot={screenshots[0]}
          gameName={gameName}
          gameId={gameId}
          containerRef={containerRef}
        />

        <div
          className="flex flex-col items-center space-y-6 3xl:!space-y-10 w-full pt-10 lg:pt-14 3xl:!pt-20"
          id="contentRef"
          ref={contentRef}
        >
          {screenshots.map((screenshot, index) => {
            return (
              <a
                href={screenshot}
                key={index}
                target="_blank"
                className="cursor-default flex justify-center"
              >
                <ScreenshotWithParallax
                  src={screenshot}
                  styles="w-10/12 max-w-[400px] sm:max-w-[600px] lg:max-w-[unset] lg:w-[600px] 3xl:!w-[1000px] 4xl:w-[1200px] opacity-15"
                  parallaxAxis="y"
                  containerRef={containerRef}
                />
              </a>
            );
          })}
        </div>
      </div>

      <button
        className={twMerge(
          "fixed top-4 right-4 lg:top-6 lg:right-6 3xl:!top-8 3xl:!right-8 z-[100] transition-opacity duration-300 cursor-pointer text-white mix-blend-difference",
          animationStep === AnimationStep.EXIT && "opacity-0"
        )}
        onClick={onClose}
      >
        Back
      </button>
    </>
  );
};

export default ShowcaseContent;
