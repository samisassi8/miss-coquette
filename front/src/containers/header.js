import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo/miss-coquette_logo.jpg";
import { connect } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";

//Gestion de la navigation
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapse: true,
    };
  }

  render() {
    return (
      <>
        <nav className={this.state.isCollapse && "hidden"}>
          <ul>
            <li>
              <Link to="/" className="nav-li header-pic">
                <img src={logo} alt="company logo" />
              </Link>
            </li>
            <li>
              <Link to="/product" className="nav-li">
                Produits
              </Link>
            </li>
            {this.props.user.isLogged === false && (
              <li>
                <Link to="/register" className="nav-li">
                  S'enregistrer
                </Link>
              </li>
            )}
            {this.props.user.isLogged === false && (
              <li>
                <Link to="/login" className="nav-li">
                  Se connecter
                </Link>
              </li>
            )}

            {this.props.user.isLogged &&
              this.props.user.infos.role === "admin" && (
                <li>
                  <Link to="/admin" className="nav-li">
                    Admin
                  </Link>
                </li>
              )}
            {this.props.user.isLogged && (
              <li>
                <Link to="/logout" className="nav-li">
                  Se déconnecter
                </Link>
              </li>
            )}
            {this.props.user.isLogged && (
              <li>
                <Link to="/profil" className="nav-li">
                  {this.props.user.infos.firstName}
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
            this.setState({ isCollapse: !this.state.isCollapse });
          }}
          className="nav-btn"
        >
          {this.state.isCollapse ? <GiHamburgerMenu /> : <CgClose />}
        </button>
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
