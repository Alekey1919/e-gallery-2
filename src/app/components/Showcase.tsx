"use client";

import { useEffect, useState } from "react";
import ShowcaseContent from "./ShowcaseContent";

interface Screenshot {
  id: string;
  url: string;
  gameId: string;
}

const Showcase = ({
  gameId,
  gameName,
  handleClose,
}: {
  gameId: string;
  gameName: string;
  handleClose: () => void;
}) => {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/games/screenshots?gameId=${gameId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch screenshots");
        }

        const data = await response.json();
        setScreenshots(data.screenshots || []);
      } catch (error) {
        console.error("Error fetching screenshots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScreenshots();
  }, [gameId]);

  if (loading) {
    return <></>;
  }

  return (
    <ShowcaseContent
      screenshots={screenshots.map((s) => s.url)}
      gameId={gameId}
      gameName={gameName}
      handleClose={handleClose}
    />
  );
};

export default Showcase;
