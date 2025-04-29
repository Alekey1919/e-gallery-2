import { twMerge } from "tailwind-merge";
import ScreenshotWithParallax, {
  ScreenshotWithParallaxProps,
} from "./ScreenshotWithParallax";
import useMediaQueryState from "../hooks/useMediaQueryState";

const CarouselGameCover = ({
  gameName,
  screenshotProps,
  styles,
  isLoading,
}: {
  gameName: string;
  screenshotProps: ScreenshotWithParallaxProps;
  styles?: string;
  isLoading: boolean;
}) => {
  const hasMouse = useMediaQueryState({
    query: "(hover: hover), (pointer: fine)",
  });

  return (
    <div
      className={twMerge(
        "group relative w-full lg:w-1/4 3xl:w-1/2 max-w-[1000px] shrink-0",
        styles,
        isLoading && "skeleton"
      )}
    >
      <ScreenshotWithParallax
        {...screenshotProps}
        styles="w-full"
        key={screenshotProps.parallaxAxis}
      />
      {hasMouse && (
        <div className="absolute -top-10 left-2 translate-y-full opacity-0 transition-all duration-300 ease-out mouse:hover:text-red-400 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="text-xl font-medium">{gameName}</span>
        </div>
      )}
    </div>
  );
};

export default CarouselGameCover;
