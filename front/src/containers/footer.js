import React from "react";
import { IoLogoFacebook } from "react-icons/io";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SiGooglemaps } from "react-icons/si";

class Footer extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <hr className="line"/>
      <footer>
        <div>
          <a href="https://www.facebook.com/misscoquettecora59400/">
            <IoLogoFacebook />
          </a>
          <a href="/">
            <AiFillTwitterCircle />
          </a>
          <a href="https://www.google.com/maps/place/Miss+Coquette/@50.1478779,3.2201121,17z/data=!3m1!4b1!4m5!3m4!1s0x47c2bb4f993aa257:0xf66ecc132478ea90!8m2!3d50.1478779!4d3.2223008">
            <SiGooglemaps />
          </a>
        </div>
        </footer>
        </>
    );
  }
}

export default Footer;
