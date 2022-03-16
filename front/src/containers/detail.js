import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { config } from "../config";
import { loadProducts } from "../actions/product/productAction";
import { addToBasket } from "../actions/basket/basketAction";
import Popup from "../components/popup";
import { FaPlusCircle } from "react-icons/fa";

//Page détail
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: "",
      error: null,
      isPopUp: false,
    };
  }

  //au click ajout dans le panier
  onClickAddBasket = (product) => {
    if (this.state.quantity !== "" && !isNaN(this.state.quantity)) {
      this.setState({ isPopUp: true });
      this.props.addToBasket(
        this.props.cart.basket,
        product,
        this.state.quantity
      );
    } else {
      this.setState({ error: "Entrez une valeur correcte (chiffre)" });
    }
  };

  render() {
    let id = this.props.params.id;
    let index = this.props.product.products.findIndex(
      (product) => product.id === parseInt(id)
    );
    console.log(id);
    console.log(index);
    return (
      <div>
        <h2>Detail</h2>

        {/*POPUP HERE*/}
        <Popup
          isPopUp={this.state.isPopUp}
          msg={
            "Vous avez ajouté : " +
            this.state.quantity +
            " produits à votre panier !"
          }
          onClickClose={() => {
            this.setState({ isPopUp: false, quantity: "" });
          }}
        />
        {/*AFFICHAGE DU PRODUIT + FORM D'ENVOI*/}
        {index !== -1 && (
          <div>
            <Link className="comeBack" to="/product">
              <i className="fa fa-arrow-circle-left"></i>
            </Link>
            <div className="productDetail">
              <img
                src={
                  config.pict_url + this.props.product.products[index].picture
                }
                alt=""
              />
              <h3>{this.props.product.products[index].name}</h3>
              <p>{this.props.product.products[index].description}</p>
              {this.state.error !== null && <p>{this.state.error}</p>}
              <div className="paymentPart">
                <span className="paymentSpan">
                  Prix Unitaire :{" "}
                  <em>{this.props.product.products[index].price} €</em>
                </span>

                <form>
                  <input
                    className="inputQuantity"
                    type="text"
                    value={this.state.quantity}
                    onChange={(e) => {
                      this.setState({ quantity: e.currentTarget.value });
                    }}
                  />
                  <div
                    className="addToBasket"
                    onClick={(e) => {
                      this.onClickAddBasket(this.props.product.products[index]);
                    }}
                  >
                    <FaPlusCircle />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
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
  loadProducts,
  addToBasket,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
