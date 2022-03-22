import React from "react";
import logo1 from "../assets/giulia-notte-head.png";
import logo2 from "../assets/Ikks.png";
import logo3 from "../assets/logo-le-temps-des-cerises.png";
import logo4 from "../assets/mango.png";
import logo5 from "../assets/mexx.png";
import logo6 from "../assets/stradivarius.png";

// Page Home
class Home extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <div className="bannerContainer">
          <img src={logo1} alt="" />
          <img src={logo2} alt="" />
          <img src={logo3} alt="" />
          <img src={logo4} alt="" />
          <img src={logo5} alt="" />
          <img src={logo6} alt="" />
        </div>
      </>
    );
  }
}

export default Home;
