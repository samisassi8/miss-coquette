import React from "react";
import { connect } from "react-redux";
import { loadProducts } from "../../actions/product/productAction";
import { Link } from "react-router-dom";
import { config } from "../../config.js";
import axios from "axios";

// page d'admin pour gérer les produits
class Admin extends React.Component {
  onClickDeleteProduct(id) {
    axios
      .delete(config.api_url + "/api/v1/product/delete/" + id, {
        headers: { "x-access-token": this.props.user.infos.token },
      })
      .then((response) => {
        this.props.loadProducts();
      });
  }

  renderProductList() {
    return this.props.product.products.map((product) => {
      return (
        <tr key={product.id}>
          <td className="tdImage">
            <img src={config.pict_url + product.picture} alt="" />
          </td>
          <td className="tdName">{product.name}</td>
          <td className="tdPrix">{product.price} €</td>
          <td className="tdDescription">{product.description}</td>
          <td className="tdAction">
            <Link to={"/admin/product/edit/" + product.id}>Modifier</Link>
            <button
              onClick={(e) => {
                this.onClickDeleteProduct(product.id);
              }}
            >
              Supprimer
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Admin</h2>
        <Link className="addProduct" to="/admin/product/add">
          <i className="fa fa-plus-circle"></i>
          Ajouter un produit
        </Link>
        <h3>Tableau des produits</h3>
        <table className="tableProduct">
          <thead>
            <td>Photo</td>
            <td>Nom</td>
            <td>Prix</td>
            <td>Description</td>
            <td>Action</td>
          </thead>
          <tbody>
            {<React.Fragment>{this.renderProductList()}</React.Fragment>}
          </tbody>
        </table>
      </div>
    );
  }
}

//connexion à redux
const mapStateToProps = (store) => {
  return {
    product: store.products,
    cart: store.basket,
    user: store.user,
  };
};
const mapDispatchToProps = {
  loadProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
