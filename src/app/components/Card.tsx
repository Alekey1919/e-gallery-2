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
        "lg:w-[800px] 4xl:w-[1200px] shrink-0 relative cursor-pointer"
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
      {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <h3 className="text-white text-xl font-medium">{game.name}</h3>
      </div> */}
    </div>
  );
};

export default Card;
