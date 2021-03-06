import React from "react";
import { connect } from "react-redux";
import { config } from "../config";
import { loadProducts } from "../actions/product/productAction";
import { addToBasket } from "../actions/basket/basketAction";
import Popup from "../components/popup";

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
      this.props.addToBasket(
        this.props.cart.basket,
        product,
        this.state.quantity
      );
      this.setState({ isPopUp: true });
      setTimeout(() => {
        this.setState({ isPopUp: false });
      }, 3200);
    } else {
      this.setState({ error: "Entrez une valeur correcte (chiffre)" });
    }
  };

  render() {
    let id = this.props.params.id;
    let index = this.props?.product?.products.findIndex(
      (product) => product.id === parseInt(id)
    );
    return (
      <>
        <h2>{this.props.product?.products[index]?.name}</h2>

        {/*POPUP HERE*/}
        <Popup
          isPopUp={this.state.isPopUp}
          msg={
            "Vous avez ajouté " +
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
            <div className="productDetail">
              <div className="productDetail__img">
                <img
                  src={
                    config.pict_url + this.props.product?.products[index]?.picture
                  }
                  alt=""
                />
              </div>
              <p>{this.props.product?.products[index]?.description}</p>
              {this.state.error !== null && <p>{this.state.error}</p>}
              <div className="paymentPart">
                <span className="paymentSpan">
                  Prix Unitaire :{" "}
                  <em>{this.props.product?.products[index]?.price} €</em>
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
                  <button
                    className="addToBasket"
                    onClick={(e) => {
                      e.preventDefault();
                      this.onClickAddBasket(this.props.product?.products[index]);
                    }}
                  >
                    Ajouter au panier
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
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
