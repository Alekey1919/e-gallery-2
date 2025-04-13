import Image from "next/image";
import { twMerge } from "tailwind-merge";

const Card = ({ img, onClick }: { img: string; onClick: () => void }) => {
  return (
    <div
      className={twMerge("lg:w-[800px] 4xl:w-[1200px] shrink-0")}
      onClick={onClick}
    >
      <Image
        src={img}
        alt="Game"
        className="w-full"
        width={1000}
        height={1000}
      />
    </div>
  );
};

export default Card;
