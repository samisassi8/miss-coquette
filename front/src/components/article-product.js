import React from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import { connect } from "react-redux";
import { addToBasket } from "../actions/basket/basketAction";
import Popup from "./popup";

class ArticleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: "",
      error: null,
      isPopUp: false,
    };
  }

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
            <div className="products-cards-img">
              <img
                src={config.pict_url + this.props.productToLoad.picture}
                alt=""
              />
            </div>
            <div className="products-cards-bottom">
              <h3>{this.props.productToLoad.name}</h3>
              <p className="card-price">{this.props.productToLoad.price} €</p>
            </div>
          </div>
        </Link>
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
