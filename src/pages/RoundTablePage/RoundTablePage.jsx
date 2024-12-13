import React from "react";
import HeroContainer from "../../containers/HeroContainer";
import NavBar from "../../components/NavBar";
import FeaturesContainer from "../../containers/FeaturesContainer";
import AboutContainer from "../../containers/AboutContainer";
// import FeaturesContainer from '../../containers/FeaturesContainer'

const RoundTablePage = () => {
  return (
    <>
      <NavBar />
      <HeroContainer />
      <AboutContainer />
      <FeaturesContainer />
      {/* Main Content */}
      <div>
        <section className="h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
          <h1 className="text-5xl font-bold">Section 1</h1>
        </section>
        <section className="h-screen bg-gradient-to-b from-white to-blue-100 flex items-center justify-center">
          <h1 className="text-5xl font-bold">Section 2</h1>
        </section>
        <section className="h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
          <h1 className="text-5xl font-bold">Section 3</h1>
        </section>
      </div>
    </>
  );
};

export default RoundTablePage;
