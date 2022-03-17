import React from "react";
import banner from "../assets/logo/logoMC.png";

// Page Home
class Home extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <div className="bannerContainer">
        <img src={banner} alt="banner" />
        </div>
        <div className="container">
          {/* <h1 id="home-presentation"> */}
          <h1 className="txt">
            On a toutes le droit aux vêtements tendances.
          </h1>
        </div>
      </>
    );
  }
}

export default Home;
