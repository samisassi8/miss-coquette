import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo/miss-coquette_logo.jpg";
import { connect } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";

//Gestion de la navigation
const Header = (props) => {
  const [isCollapse, setIsCollapse] = useState(true);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setIsScroll(true);
      } else setIsScroll(false); // if not 100px down
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <>
      {/* if mobile hidden, else nav-bg-blur */}
      <nav className={`${isCollapse && "hidden"} ${isScroll && "nav-bg-blur"}`}>
        <ul>
          <li className="desktopOnly">
            <Link to="/" className="nav-li header-pic">
              <img src={logo} alt="company logo" />
            </Link>
          </li>
          <li>
            <Link to="/product" className="nav-li">
              Produits
            </Link>
          </li>
          {props.user.isLogged === false && (
            <li>
              <Link to="/register" className="nav-li">
                S'enregistrer
              </Link>
            </li>
          )}
          {props.user.isLogged === false && (
            <li>
              <Link to="/login" className="nav-li">
                Se connecter
              </Link>
            </li>
          )}

          {props.user.isLogged && props.user.infos.role === "admin" && (
            <li>
              <Link to="/admin" className="nav-li">
                Admin
              </Link>
            </li>
          )}
          {props.user.isLogged && (
            <li>
              <Link to="/logout" className="nav-li">
                Se déconnecter
              </Link>
            </li>
          )}
          {props.user.isLogged && (
            <li>
              <Link to="/profil" className="nav-li">
                {props.user.infos.firstName}
              </Link>
            </li>
          )}
          <li>
            <Link to="/basket" className="nav-li">
              Panier
            </Link>
          </li>
        </ul>
      </nav>
      <button
        onClick={() => {
          setIsCollapse(!isCollapse);
        }}
        className="nav-btn"
      >
        {isCollapse ? <GiHamburgerMenu /> : <CgClose />}
      </button>
    </>
  );
};

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
