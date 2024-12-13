import { Grid2 } from "@mui/material";
import React from "react";

const Feature = ({ title, copy, standOut, src, width, textFirst = true }) => {
  return (
    <Grid2 container spacing={0} className="mt-16">
      <Grid2
        size={{ xs: 12, md: 6 }}
        className="flex items-center justify-center"
      >
        {textFirst ? (
          <FeatureText title={title} copy={copy} standOut={standOut} />
        ) : (
          <FeatureImg src={src} width={width} />
        )}
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 6 }}
        className="flex items-center justify-center"
      >
        {!textFirst ? (
          <FeatureText title={title} copy={copy} standOut={standOut} />
        ) : (
          <FeatureImg src={src} width={width} />
        )}
      </Grid2>
    </Grid2>
  );
};

const FeatureText = ({ title, copy, standOut }) => {
  return (
    <div className="px-4 pb-2 mx-8 my-8 backdrop-blur-lg bg-heroBackground/40 max-w-xl rounded-xl overflow-clip">
      <h1 className="text-2xl py-2 font-space font-bold">{title}</h1>
      <p className="text-lg font-space py-1">{copy}</p>
      <p className="text-lg font-space text-primary">{standOut}</p>
    </div>
  );
};

const FeatureImg = ({ src, width }) => {
  return <img src={src} alt="" className={`max-w-md ${width}`} />;
};

export default Feature;
