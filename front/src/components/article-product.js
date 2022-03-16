import React from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import { connect } from "react-redux";
import { addToBasket } from "../actions/basket/basketAction";
import Popup from "./popup";
import { FaPlusCircle } from "react-icons/fa";

class ArticleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: "",
      error: null,
      isPopUp: false,
    };
  }
  onClickAddBasket = () => {
    console.log("this.props:", this.props);
    if (this.state.quantity !== "" && !isNaN(this.state.quantity)) {
      this.setState({ isPopUp: true });
      this.props.addToBasket(
        this.props.cart.basket,
        this.props.productToLoad,
        this.state.quantity
      );
    } else {
      this.setState({
        error: "Entrez une valeur correcte (Un chiffre s'il vous plaît)",
      });
    }
  };
  render() {
    return (
      <li className="product-mosaic">
        <Popup
          isPopUp={this.state.isPopUp}
          msg={
            "Vous avez ajouté : " +
            this.state.quantity +
            " produit(s) à votre panier !"
          }
          onClickClose={() => {
            this.setState({ isPopUp: false, quantity: "" });
          }}
        />
        {this.state.error !== null && <p>{this.state.error}</p>}
        <Link to={"detail/" + this.props.productToLoad.id}>
          <div className="products-cards">
            <h3>{this.props.productToLoad.name}</h3>
            <img
              className="product-img"
              src={config.pict_url + this.props.productToLoad.picture}
              alt=""
            />
            <p>{this.props.productToLoad.description.substr(0, 50)}</p>
            <p className="card-price">{this.props.productToLoad.price} €</p>
          </div>
        </Link>
        <form>
          <input
            type="text"
            value={this.state.quantity}
            onChange={(e) => {
              this.setState({ quantity: e.currentTarget.value });
            }}
          />
          <div
            className="addToBasket"
            onClick={(e) => {
              this.onClickAddBasket();
            }}
          >
            <FaPlusCircle />
          </div>
        </form>
      </li>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    product: store.products,
    cart: store.basket,
  };
};

const mapDispatchToProps = {
  addToBasket,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleProduct);
