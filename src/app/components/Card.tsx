import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

interface Screenshot {
  id: string;
  url: string;
  gameId: string;
}

interface Game {
  id: string;
  name: string;
  screenshots?: Screenshot[];
}

interface CardProps {
  game: Game;
  onClick: () => void;
  carouselRef: React.RefObject<HTMLDivElement | null>;
}

const Card = ({ game, onClick, carouselRef }: CardProps) => {
  const containerRef = useRef(null);

  const { scrollXProgress } = useScroll({
    container: carouselRef,
    target: containerRef,
    axis: "x", // Explicitly track horizontal scroll
    offset: ["start end", "end start"],
  });

  const translateX = useTransform(scrollXProgress, [0, 1], ["10%", "-10%"]);

  const getScreenshotUrl = () => {
    if (game.screenshots && game.screenshots.length > 0) {
      return game.screenshots[0].url;
    }

    return "";
  };

  return (
    <div
      className={twMerge(
        "lg:w-[800px] 4xl:w-[1200px] shrink-0 relative cursor-pointer group "
      )}
      onClick={onClick}
    >
      <div className="w-full overflow-hidden" ref={containerRef}>
        <motion.div className="w-full scale-[1.2]" style={{ translateX }}>
          <Image
            src={getScreenshotUrl()}
            alt={`Screenshot from ${game.name}`}
            className="w-full"
            width={1000}
            height={1000}
          />
        </motion.div>
      </div>
      <div className="absolute -top-10 left-2 translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
        <span className="text-xl font-medium">{game.name}</span>
      </div>
    </div>
  );
};

export default Card;
