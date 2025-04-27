import React from "react";
import useCarouselContext from "../contexts/CarouselContext";
import { twMerge } from "tailwind-merge";

const Title = ({ style }: { style?: string }) => {
  const { animationFinished } = useCarouselContext();

  return (
    <div
      className={twMerge(
        "transition-opacity duration-500",
        style,
        animationFinished ? "opacity-100" : "opacity-0"
      )}
    >
      <h1 className="text-2xl sm:text-3xl 3xl:!text-4xl font-bold mb-4 3xl:!mb-8">
        E-gallery
      </h1>
      <p className="text-base sm:text-lg 3xl:!text-xl">
        The art of in-game photography
      </p>
    </div>
  );
};

export default Title;
