const fs = require("fs"); // fs est natif a node pour la manipulation des files
const withAuth = require("../withAuth"); //middleware
module.exports = (app, db) => {
  const productModel = require("../models/ProductModel")(db);
  //Route to obtain all the products
  app.get("/api/v1/product/all", async (req, res, next) => {
    let products = await productModel.getAllProducts();
    // console.log("products:", products);
    if (products.code) {
      res.json({
        status: 500,
        msg: "Il y a un problème avec la récupération des produits",
        result: products,
      });
    }
    res.json({ status: 200, result: products });
  });

  //Route for one product with its id
  app.get("/api/v1/product/one/:id", async (req, res, next) => {
    let id = req.params.id;
    let product = await productModel.getOneProduct(id);
    if (product.code) {
      res.json({
        status: 500,
        msg: "Il y a un problème pour récupérer le produit",
        result: product,
      });
    } else {
      res.json({ status: 200, result: product });
    }
  });

  // Route to save a product
  app.post("/api/v1/product/save", withAuth, async (req, res, next) => {
    // console.log("req.body:", req.body);
    let product = await productModel.saveOneProduct(req);
    if (product.code) {
      // console.log("error product", product);
    } else {
      res.json({
        status: 200,
        msg: "le produit est bien enregistré",
        result: product,
      });
    }
  });

  //route to save product's picture (with the middleware withAuth)
  app.post("/api/v1/product/pict", withAuth, async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.json({ status: 400, msg: "la picture n'a pas pu être récupérée" });
    }
    req.files.image.mv("public/images/" + req.files.image.name, function (err) {
      // console.log("ça passe", "/public/images/" + req.files.image.name);
      if (err) {
        res.json({ status: 500, msg: "La photo n'a pas pu être enregistrée" });
      }
    });
    res.json({ status: 200, msg: "ok", url: req.files.image.name });
  });

  // route to modify one product with its id (with whitAuth)
  app.put("/api/v1/product/update/:id", withAuth, async (req, res, next) => {
    let id = req.params.id;
    // console.log("update req.body:", req.body);
    let product = await productModel.updateOneProduct(req, id);
    if (product.code) {
      res.json({
        status: 500,
        msg: "il y a problème, modification impossible",
        result: product,
      });
    } else {
      res.json({ status: 200, result: product });
    }
  });

  // route to delete one product with its id (withAuth)
  app.delete("/api/v1/product/delete/:id", withAuth, async (req, res, next) => {
    let id = req.params.id;
    // console.log("req.params.id:", req.params.id);
    let product = await productModel.getOneProduct(id);
    // console.log("product:", product[0]);

    let deleteProduct = await productModel.deleteOneProduct(id);
    if (deleteProduct.code) {
      // console.log("deleteProduct:", deleteProduct);
      res.json({
        status: 500,
        msg: "il y a eu un problème !",
        result: product,
      });
    }

    // suppression des photos
    if (product[0]?.picture !== "no-pict.jpg") {
      fs.unlink("public/images/" + product[0].picture, function (err) {
        if (err) {
          res.json({ status: 500, msg: "Gros problème" });
        }
        // console.log("ça supprime");
      });
      res.json({ status: 200, result: deleteProduct });
    }
  });
};
