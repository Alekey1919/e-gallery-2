import { twMerge } from "tailwind-merge";
import ScreenshotWithParallax, {
  ScreenshotWithParallaxProps,
} from "./ScreenshotWithParallax";

const CarouselGameCover = ({
  gameName,
  screenshotProps,
  styles,
}: {
  gameName: string;
  screenshotProps: ScreenshotWithParallaxProps;
  styles?: string;
}) => {
  return (
    <div
      className={twMerge(
        "group relative w-full lg:w-1/4 3xl:w-1/2 max-w-[1000px] shrink-0",
        styles
      )}
    >
      <ScreenshotWithParallax
        {...screenshotProps}
        styles="w-full"
        key={screenshotProps.parallaxAxis}
      />
      <div className="absolute -top-10 left-2 translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
        <span className="text-xl font-medium">{gameName}</span>
      </div>
    </div>
  );
};

export default CarouselGameCover;
