import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

enum AnimationStep {
  LOADING,
  ENTER,
  EXIT,
}

const ShowcaseContent = ({
  screenshots,
  handleClose,
}: {
  screenshots: string[];
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

  const onClose = () => {
    if (containerRef.current && lenisInst) {
      lenisInst.scrollTo(containerRef.current.scrollTop + 500);
    }

    setTimeout(() => {
      setAnimationStep(AnimationStep.EXIT);

      setTimeout(() => {
        handleClose();
      }, 800); // Match the duration of the CSS transition
    }, 100);
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
        id="containerRef"
      >
        <div
          className="flex flex-col items-center space-y-6 w-full"
          id="contentRef"
          ref={contentRef}
        >
          {screenshots.map((screenshot, index) => {
            return (
              <Image
                src={screenshot}
                key={index}
                className="4xl:w-[1200px]"
                alt={`Screenshot ${index + 1}`}
                width={800}
                height={450}
              />
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
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default ShowcaseContent;
