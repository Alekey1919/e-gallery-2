import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import ScreenshotWithParallax from "./ScreenshotWithParallax";

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
  const [lenisInst, setLenisInst] = useState<Lenis | null>(null);

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
      touchMultiplier: 2,
      autoRaf: true,
    });

    setLenisInst(lenis);

    // Cleanup function
    return () => {
      lenis.destroy();
    };
  }, []);

  const onClose = ({ scrolledAllTheWay }: { scrolledAllTheWay: boolean }) => {
    // Scroll a bit to perform a little animation while the entire section is disappearing towards the top
    if (containerRef.current && lenisInst) {
      lenisInst.scrollTo(containerRef.current.scrollTop + 500);
    }

    setTimeout(
      () => {
        setAnimationStep(AnimationStep.EXIT);

        setTimeout(() => {
          handleClose();
        }, 800); // Match the duration of the CSS transition
      },
      scrolledAllTheWay ? 0 : 100 // If scrolled all the way, close immediately; otherwise, give time to see the scrolling animation
    );
  };

  const onScroll = () => {
    if (!containerRef.current) return;

    const scrolledAllTheWay =
      containerRef.current.scrollTop + window.innerHeight >=
      containerRef.current.scrollHeight;

    if (scrolledAllTheWay) {
      onClose({ scrolledAllTheWay: true });
    }
  };

  return (
    <>
      <div
        className={twMerge(
          "bg-background fixed top-0 left-0 h-screen w-screen overflow-y-auto overflow-x-hidden translate-y-full duration-700 ease-out transition-transform pb-40 pt-20",
          animationStep === AnimationStep.ENTER && "translate-y-0",
          animationStep === AnimationStep.EXIT && "ease-in -translate-y-full"
        )}
        ref={containerRef}
        onScroll={onScroll}
        id="containerRef"
      >
        <div
          className="flex flex-col items-center space-y-6 w-full"
          id="contentRef"
          ref={contentRef}
        >
          <h1 className="text-2xl text-left mb-10 hover:underline">
            <a
              href={`https://store.steampowered.com/app/${gameId}/`}
              target="_blank"
            >
              {gameName}
            </a>
          </h1>

          {screenshots.map((screenshot, index) => {
            return (
              <a
                href={screenshot}
                key={index}
                target="_blank"
                className="cursor-default"
              >
                <ScreenshotWithParallax
                  src={screenshot}
                  styles="lg:w-[800px] 4xl:w-[1200px]"
                  parallaxAxis="y"
                  containerRef={containerRef}
                />
              </a>
            );
          })}
        </div>
      </div>

      <div
        className={twMerge(
          "fixed top-4 right-4 z-[100] transition-opacity duration-300",
          animationStep === AnimationStep.EXIT && "opacity-0"
        )}
      >
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => onClose({ scrolledAllTheWay: false })}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default ShowcaseContent;
