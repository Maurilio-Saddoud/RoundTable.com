import React from "react";
import Button from "../Button/Button";
import { handleDownload } from "../../utils/handleDownload";

const NavBar = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-16 bg-heroBackground/70 backdrop-blur-md flex items-center px-8 z-50 shadow-md">
        <img className="w-20" src="/round-table.png" alt="RoundTable logo" />
        <div className="flex ml-12 space-x-8 font-space  font-bold text-lg !text-[#0D6799] text-primary">
          <p className="cursor-pointer">Features</p>
          <p className="cursor-pointer">About</p>
          <p className="cursor-pointer">Pricing</p>
          <p className="cursor-pointer">Contact</p>
        </div>
        <div className="absolute right-8">
          <Button onClick={handleDownload}>Download</Button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
