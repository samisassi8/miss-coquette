import React from "react";
import { connect } from "react-redux";
import { loadProducts } from "../actions/product/productAction";
import ArticleProduct from "../components/article-product";
import { Link } from 'react-router-dom'
import logo from "../assets/logo/miss-coquette_logo.jpg";

// page d'affichage de tous les produit
class Product extends React.Component {
  render() {
    return (
      <div>
            <Link to="/" className="product__logo">
                <img src={logo} alt="company logo" />
              </Link>
        {this.props.product.products.length > 0 && (
          <ul className="productsList">
            {this.props.product.products.map((product, index) => {
              return <ArticleProduct key={index} productToLoad={product} />;
            })}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    product: store.products,
  };
};

const mapDispatchToProps = {
  loadProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
