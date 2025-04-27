import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import useMediaQueryState, {
  DefaultBreakpoints,
} from "../hooks/useMediaQueryState";

enum AnimationStep {
  zoomInAll,
  zoomOutAll,
  zoomInMain,
}

const screenshots = [
  "https://images.steamusercontent.com/ugc/2390935227017158390/0E14CE073CFEF90DC5D5488B7A7D42F7FC5DA47C/",
  "https://images.steamusercontent.com/ugc/941699520637200854/0AAFD613EC3DD91DE7AB28AD99B11310366891DA/",
  "https://images.steamusercontent.com/ugc/2511402976540690723/9F23E7F4A3FF7D2DA26212F66EA30ABB6D538307/",
  "https://images.steamusercontent.com/ugc/2511402976540651474/0B66ADB578B230C8F5E08A085147F9F973DB3047/",
  "https://images.steamusercontent.com/ugc/51333180571993947/CFDA2B369829AC478D2988D248D1C924128F9AF4/",
];

const ANIMATION_DURATION = 200;

const InitialAnimation = ({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const lgScreen = useMediaQueryState({ breakpoint: DefaultBreakpoints.lg });

  const randomScreenshots = useMemo(() => {
    return [...screenshots].sort(() => 0.5 - Math.random());
  }, []);

  // Set up isReady state after component mounts and containerRef is valid
  useEffect(() => {
    setIsReady(true);
  }, []);

  // Use framer-motion's useScroll to track scroll progress on the container
  const { scrollXProgress, scrollYProgress } = useScroll(
    isReady
      ? {
          container: lgScreen ? containerRef : undefined,
          target: lgScreen ? targetRef : undefined,
          offset: lgScreen
            ? ["start end", "end start"] // Horizontal scroll offset (for desktop)
            : ["start start", "end end"], // Vertical scroll offset (for mobile)
        }
      : {}
  );

  // Map scroll progress [0, 1] to blur [0px, 20px]
  const blur = useTransform(
    lgScreen ? scrollXProgress : scrollYProgress,
    [0, 1],
    ["blur(0px)", lgScreen ? "blur(200px)" : "blur(50px)"]
  );

  const [animationStep, setAnimationStep] = useState(AnimationStep.zoomInAll);
  const [animatedScreenshots, setAnimatedScreenshots] = useState<{
    [key: number]: boolean;
  }>({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });

  useEffect(() => {
    for (let i = randomScreenshots.length - 1; i >= 0; i--) {
      setTimeout(() => {
        setAnimatedScreenshots((prev) => ({
          ...prev,
          [i]: true,
        }));
      }, (randomScreenshots.length - i) * ANIMATION_DURATION);
    }

    setTimeout(() => {
      setAnimationStep(AnimationStep.zoomOutAll);

      setTimeout(() => {
        setAnimationStep(AnimationStep.zoomInMain);
      }, 450);
    }, randomScreenshots.length * ANIMATION_DURATION + 500);
  }, [randomScreenshots.length]);

  return (
    <div
      className="w-screen h-screen bg-white shrink-0  lg:-translate-x-10 lg:translate-y-10 3xl:!-translate-x-20 3xl:!translate-y-20 relative overflow-hidden justify-center items-center z-10"
      ref={targetRef}
    >
      {randomScreenshots.map((screenshots, index) => {
        const isFulScreen =
          animationStep === AnimationStep.zoomInMain && index === 0;

        let scale = 1;
        let transitionTime = "0.5s";

        if (isFulScreen) {
          scale = 1.2;
          transitionTime = "0.7s";
        } else if (animationStep === AnimationStep.zoomInAll) {
          scale = index * 0.1 + 1;
        }

        return (
          <motion.img
            key={index}
            src={screenshots}
            alt={`Cover ${index}`}
            className={twMerge(
              "object-cover absolute inset-0 top-0 bottom-0 right-0 left-0 m-auto",
              isFulScreen
                ? "w-full h-screen"
                : "h-[300px] w-[200px] sm:h-[400px] sm:w-[280px] lg:w-[600px] lg:h-[400px] 3xl:!w-[700px] 3xl:!h-[500px]"
            )}
            style={{
              filter: blur,
              transform: animatedScreenshots[index] ? `scale(${scale})` : "",
              visibility: animatedScreenshots[index] ? "visible" : "hidden",
              zIndex: -(index + 1),
              transition: `all ${transitionTime} ${
                animationStep !== AnimationStep.zoomInAll
                  ? "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
                  : "ease-out"
              }, filter 0s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default InitialAnimation;
