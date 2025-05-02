import React from "react";
import HeroContainer from "../../containers/HeroContainer";
import NavBar from "../../components/NavBar";
import FeaturesContainer from "../../containers/FeaturesContainer";
import AboutContainer from "../../containers/AboutContainer";
import PricingContainer from "../../containers/PricingContainer";
import ContactContainer from "../../containers/ContactContainer";

const RoundTablePage = () => {
  return (
    <>
      <NavBar />
      <HeroContainer />
      <AboutContainer />
      <FeaturesContainer />
      <PricingContainer />
      <ContactContainer />
    </>
  );
};

export default RoundTablePage;
