import React from "react";
import "./styles.css";
import DownloadButton from "../DownloadButton";

const NavBar = () => {
  return (
    <>
      <div className="nav-bar-background"></div>
      <div className="nav-bar">
        <img className="logo" src="/round-table.png" alt="RoundTable logo" />
        <div className="nav-links">
          <p>Features</p>
          <p>About</p>
          <p>Pricing</p>
          <p>Contact</p>
        </div>
        <div className="download-button-container">
          <DownloadButton>Download</DownloadButton>
        </div>
      </div>
    </>
  );
};

export default NavBar;
