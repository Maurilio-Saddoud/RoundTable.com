import { Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { handleDownload } from "../../utils/handleDownload";

const HeroContainer = () => {
  const [fallingObjects, setFallingObjects] = useState([]);
  const [windowActive, setWindowActive] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setWindowActive(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    let timeoutId;
    const addObject = () => {
      if (windowActive) {
        setFallingObjects((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).slice(2, 11),
            left: Math.random() * 100,
            duration: Math.random() * 3 + 6,
            rotation: Math.random() * 30 - 15,
            size: Math.random() * 4 + 3,
          },
        ]);
      }
      const nextTimeout = Math.random() * 1000 + 250;
      timeoutId = setTimeout(addObject, nextTimeout);
    };
    addObject();
    return () => clearTimeout(timeoutId);
  }, [windowActive]);

  const handleAnimationEnd = (id) => {
    setFallingObjects((prev) => prev.filter((obj) => obj.id !== id));
  };

  return (
    <>
      <div className="relative h-screen w-screen bg-heroBackground/70 overflow-hidden">
        <Grid2 container spacing={0} className="h-full">
          <Grid2 size={{ xs: 12, md: 6 }} className="h-full">
            <div className="h-full flex flex-col justify-center px-20">
              <h1 className="font-space text-7xl font-bold text-primary">
                RoundTable
              </h1>
              <h1 className="font-space text-7xl font-bold text-primary">
                Smartcasts
              </h1>
              <p className="font-space text-3xl text-primary py-4">
                Turn reading materials into real-time, engaging, {" "}
                <strong>interactive </strong>
                podcasts—anytime, anywhere.
              </p>
              <div className="flex w-72 h-12 justify-between mt-4">
                <Button width={"8rem"} onClick={handleDownload}>Download</Button>
                <Button
                  backgroundColor={"#ffffff"}
                  color={"#16ABFF"}
                  width={"8rem"}
                >
                  About
                </Button>
              </div>
            </div>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }} className="h-full">
            <div className="h-full flex justify-center items-center">
              <img
                className="w-96"
                src="/round-table.png"
                alt="RoundTable logo"
              />
            </div>
          </Grid2>
        </Grid2>
      </div>

      <div className="absolute top-[-3rem] left-0 w-screen h-[calc(100vh+3rem)] overflow-hidden z-[-2]">
        {fallingObjects.map((obj) => (
          <img
            key={obj.id}
            src="/round-table.png"
            alt="falling-object"
            className="absolute animate-fall"
            style={{
              left: `${obj.left}%`,
              animationDuration: `${obj.duration}s`,
              "--rotation": `${obj.rotation}deg`,
              width: `${obj.size}rem`,
              height: `${obj.size}rem`,
              transform: `rotate(${obj.rotation}deg)`,
            }}
            onAnimationEnd={() => handleAnimationEnd(obj.id)}
          />
        ))}
      </div>
    </>
  );
};

export default HeroContainer;