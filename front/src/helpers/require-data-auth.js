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
    if (props.user.infos.role !== "admin" && props.isAdmin) {
      console.log("user");
      document.location.href = "/";
    }
    if (props.user.isLogged === false) {
      const token = localStorage.getItem("mc-token");
      if (token === null && props.withAuth) {
        setRedirect(true);
      } else {
        axios
          .get(config.api_url + "/api/v1/user/checkToken", {
            headers: { "x-access-token": token },
          })
          .then((res) => {
            if (res.data.status === 200) {
              let user = res.data.user[0];
              user.token = token;
              props.connectUser(user);
            } else {
              if (props.auth) {
                setRedirect(true);
              }
            }
          });
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
