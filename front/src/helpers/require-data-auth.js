import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadProducts } from "../actions/product/productAction";
import axios from "axios";
import { config } from "../config";
import { Navigate, useParams } from "react-router-dom";
import { connectUser } from "../actions/user/userAction";

const RequireDataAuth = (props) => {
  const params = useParams();

  const Child = props.child;

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (props.product.products.length === 0) {
      props.loadProducts();
    }
    // Si tu dois etre admin et que tu ne l'es pas.
    if (props.user.infos.role !== "admin" && props.isAdmin) {
      document.location.href = "/";
    }
    if (props.user.isLogged) {
      const token = localStorage.getItem("mc-token");
      //j'ai pas de token mais j'en ai besoin
      if (token === null && props.withAuth) {
        setRedirect(true);
        //j'ai un token et j'en ai besoin
      } else if (token && props.withAuth) {
        axios
          .get(config.api_url + "/api/v1/user/checkToken", {
            headers: { "x-access-token": token },
          })
          .then((res) => {
            if (res.data.status !== 200) {
              setRedirect(true);
            }
          })
          .catch((err) => err);
      }
    }
  }, [props]);

  if (redirect) {
    return <Navigate to="/login" />;
  }
  return <Child {...props} params={params} />;
};

const mapStateToProps = (store) => {
  return {
    product: store.products,
    user: store.user,
  };
};

const mapDispatchToProps = {
  loadProducts,
  connectUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequireDataAuth);
