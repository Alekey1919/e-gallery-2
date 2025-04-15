import Image from "next/image";
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
}

const Card = ({ game, onClick }: CardProps) => {
  // Get the first screenshot URL or use a placeholder
  const getScreenshotUrl = () => {
    if (game.screenshots && game.screenshots.length > 0) {
      return game.screenshots[0].url;
    }

    return "";
  };

  return (
    <div
      className={twMerge(
        "lg:w-[800px] 4xl:w-[1200px] shrink-0 relative cursor-pointer group"
      )}
      onClick={onClick}
    >
      <Image
        src={getScreenshotUrl()}
        alt={`Screenshot from ${game.name}`}
        className="w-full"
        width={1000}
        height={1000}
      />
      <div className="absolute -top-10 left-2 translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
        <span className="text-xl font-medium">{game.name}</span>
      </div>
    </div>
  );
};

export default Card;
