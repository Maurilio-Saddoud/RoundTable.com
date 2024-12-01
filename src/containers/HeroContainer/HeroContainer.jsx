import React, { useEffect, useState } from "react";
import "./styles.css";
import { Grid2 } from "@mui/material";
import DownloadButton from "../../components/DownloadButton";

const HeroContainer = () => {
  const [fallingObjects, setFallingObjects] = useState([]);
  const [windowActive, setWindowActive] = useState(!document.hidden);

  // Track window visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setWindowActive(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Add falling objects when window is active
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
          {
            id: Math.random().toString(36).slice(2, 11),
            left: Math.random() * 100,
            duration: Math.random() * 3 + 6,
            rotation: Math.random() * 30 - 15,
            size: Math.random() * 4 + 3,
          }
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
      <div className="hero-container-background"></div>
      <div className="hero-container">
        <Grid2 container spacing={0}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <div className="hero-copy">
              <h1>RoundTable</h1>
              <h1>Smartcasts</h1>
              <p>
                Turn reading materials into engaging, real-time,{" "}
                <strong>interactive </strong>
                podcasts—anytime, anywhere.
              </p>
              <div className="hero-button-container">
                <DownloadButton width={"6rem"}>Download</DownloadButton>
                <DownloadButton
                  backgroundColor={"#ffffff"}
                  color={"#16ABFF"}
                  width={"6rem"}
                >
                  About
                </DownloadButton>
              </div>
            </div>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <div className="hero-logo">
              <img
                className="hero-logo-img"
                src="/round-table.png"
                alt="RoundTable logo"
              />
            </div>
          </Grid2>
        </Grid2>
      </div>
      <div className="falling-elements-container">
        {fallingObjects.map((obj) => (
          <img
            key={obj.id}
            src="/round-table.png"
            alt="falling-object"
            className="falling-object"
            style={{
              left: `${obj.left}%`,
              animationDuration: `${obj.duration}s`,
              "--rotation": `${obj.rotation}deg`,
              transform: `rotate(${obj.rotation}deg)`,
              width: `${obj.size}rem`,
              height: `${obj.size}rem`,
            }}
            onAnimationEnd={() => handleAnimationEnd(obj.id)}
          />
        ))}
      </div>
    </>
  );
};

export default HeroContainer;
