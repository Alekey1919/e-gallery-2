import Image from "next/image";

const Card = ({ img }: { img: string }) => {
  return (
    <div className="w-[500px] 4xl:w-[1000px] shrink-0">
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
