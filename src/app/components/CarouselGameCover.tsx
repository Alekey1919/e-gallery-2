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
    <div className="group relative">
      <ScreenshotWithParallax {...screenshotProps} />
      <div className="absolute -top-10 left-2 translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
        <span className="text-xl font-medium">{gameName}</span>
      </div>
    </div>
  );
};

export default CarouselGameCover;
