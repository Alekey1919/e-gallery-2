"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  setShowcaseLoaded,
}: {
  gameId: string;
  gameName: string;
  handleClose: () => void;
  setShowcaseLoaded: Dispatch<SetStateAction<boolean>>;
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

        setTimeout(() => {
          setShowcaseLoaded(true);
        }, 1000); // Delay to allow for smooth transition
      }
    };

    fetchScreenshots();
  }, [gameId, setShowcaseLoaded]);

  useEffect(() => {
    return () => setShowcaseLoaded(false);
  }, [setShowcaseLoaded]);

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
