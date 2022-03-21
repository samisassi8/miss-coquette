import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import RequireDataAuth from "./helpers/require-data-auth";
import Header from "./containers/header";
import Home from "./containers/home";
import Product from "./containers/product";
import Detail from "./containers/detail";
import Basket from "./containers/basket";
import Profil from "./containers/profil";
import Success from "./containers/success";
import Admin from "./containers/admin/admin";
import AddProduct from "./containers/admin/product/addProduct";
import EditProduct from "./containers/admin/product/editProduct";
import Register from "./containers/user/register";
import Login from "./containers/user/login";
import Logout from "./containers/user/logout";
import Footer from "./containers/footer";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <header className="App-header"> */}
      <main>
        <Routes>
          <Route exact path="/" element={<RequireDataAuth child={Home} />} />
          <Route
            exact
            path="/register"
            element={<RequireDataAuth child={Register} />}
          />
          <Route
            exact
            path="/login"
            element={<RequireDataAuth child={Login} />}
          />
          <Route
            exact
            path="/logout"
            element={<RequireDataAuth child={Logout} />}
          />
          <Route
            exact
            path="/product"
            element={<RequireDataAuth child={Product} />}
          />
          <Route
            exact
            path="/profil"
            element={<RequireDataAuth child={Profil} withAuth={true} />}
          />
          <Route
            exact
            path="/product/detail/:id"
            element={<RequireDataAuth child={Detail} />}
          />
          <Route
            exact
            path="/basket"
            element={<RequireDataAuth child={Basket} />}
          />
          <Route
            exact
            path="/success/:orderId"
            element={<RequireDataAuth child={Success} withAuth={true} />}
          />
          <Route
            exact
            path="/admin"
            element={
              <RequireDataAuth child={Admin} withAuth={true} isAdmin={true} />
            }
          />
          <Route
            exact
            path="/admin/product/add"
            element={
              <RequireDataAuth
                child={AddProduct}
                withAuth={true}
                isAdmin={true}
              />
            }
          />
          <Route
            exact
            path="/admin/product/edit/:id"
            element={
              <RequireDataAuth
                child={EditProduct}
                withAuth={true}
                isAdmin={true}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
