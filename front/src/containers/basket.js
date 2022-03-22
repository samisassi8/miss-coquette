import React from "react";
import { connect } from "react-redux";
import { deleteToBasket } from "../actions/basket/basketAction";
import { config } from "../config";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Lottie from "react-lottie";
import basketAnimation from "../lotties/basketAnim.json";
// basketAnimation is just a random name to describe the json object

//Page panier
class Basket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      navigate: false,
      orderId: null,
      isLoading: false,
    };
    this.defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: basketAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
  }

  // chargement des produits dans le panier
  listBasket() {
    return this.props.cart.basket.map((product) => {
      let total = parseInt(product.price) * parseInt(product.quantityInCart);
      return (
        <tr key={product.id_product}>
          <td>
            <span className="mobileOnly">Quanitié</span>
            <span>{product.quantityInCart}</span>
          </td>
          <div className="basketProduct">
            {product.name}
            <div className="basketProductImg">
              <img src={config.pict_url + product.picture} alt={product.name} />
            </div>
          </div>

          <td>
            <span className="mobileOnly">Prix Unitaire</span>
            <span>{product.price} €</span>
          </td>
          <td>
            <span className="mobileOnly">Prix Total</span>
            <span>{total} €</span>
          </td>
          <td>
            <button
              className="trash-product"
              onClick={() => {
                this.props.deleteToBasket(this.props.cart.basket, product);
              }}
            >
              <FaTrashAlt />
            </button>
          </td>
        </tr>
      );
    });
  }

  // au click on enregistre une commande
  onClickSaveOrder() {
    if (this.props.user.isLogged === true) {
      this.setState({ isLoading: true });

      let data = {
        user_id: this.props.user.infos.id,
        basket: this.props.cart.basket,
      };

      // post vers l'api
      axios
        .post(config.api_url + "/api/v1/order/save", data, {
          headers: { "x-access-token": this.props.user.infos.token },
        })
        .then((response) => {
          setTimeout(() => {
            this.setState({ navigate: true, orderId: response.data.orderId });
          }, 3000);
        });
    } else {
      this.setState({ redirect: true });
    }
  }

  render() {
    if (this.state.navigate) {
      return <Navigate to={"/success/" + this.state.orderId} />;
    }

    if (this.state.redirect) {
      return <Navigate to={"/login"} />;
    }
    return (
      <div>
        {this.state.isLoading ? (
          <div className="animationBasket">
            <Lottie options={this.defaultOptions} height={400} width={400} />
          </div>
        ) : (
          <>
            <h2>Panier</h2>

            <div id="displayBasket">
              {this.props.cart.basket.length > 0 ? (
                <table className="basketTable">
                  <thead>
                    <tr>
                      <th>Quantité</th>
                      <th>Produit</th>
                      <th className="desktop">Prix Unitaire</th>
                      <th>Prix Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr id="totalPrice">
                      <td>Prix Total</td>
                      <td>{this.props.cart.totalPrice} €</td>
                    </tr>
                  </tfoot>
                  {this.props.cart.basket.length > 0 && (
                    <tbody>{this.listBasket()}</tbody>
                  )}
                </table>
              ) : (
                <p>Votre panier est vide...</p>
              )}
              {this.props.cart.basket.length > 0 && (
                <button
                  className="basket__submit"
                  onClick={(e) => {
                    this.onClickSaveOrder();
                  }}
                >
                  Payer
                </button>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    product: store.products,
    cart: store.basket,
    user: store.user,
  };
};
const mapDispatchToProps = {
  deleteToBasket,
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
