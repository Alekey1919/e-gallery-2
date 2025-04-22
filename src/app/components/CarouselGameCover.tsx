import ScreenshotWithParallax, {
  ScreenshotWithParallaxProps,
} from "./ScreenshotWithParallax";

const CarouselGameCover = ({
  gameName,
  screenshotProps,
}: {
  gameName: string;
  screenshotProps: ScreenshotWithParallaxProps;
}) => {
  return (
    <div className="group relative w-full lg:w-1/2 max-w-[1000px] shrink-0">
      <ScreenshotWithParallax {...screenshotProps} styles="w-full" />
      <div className="absolute -top-10 left-2 translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
        <span className="text-xl font-medium">{gameName}</span>
      </div>
    </div>
  );
};

export default CarouselGameCover;
