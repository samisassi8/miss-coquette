// const { db } = require("../config-exemple")

module.exports = (_db) => {
  db = _db;
  return ProductModel;
};

class ProductModel {
  // Get all products
  static getAllProducts() {
    return db
      .query("SELECT * FROM products")
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  // Get one id with its id
  static getOneProduct(id) {
    return db
      .query("SELECT * FROM products WHERE id = ?", [id])
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  // save a product
  static saveOneProduct(req) {
    console.log("req.body:", req.body);
    return db
      .query(
        "INSERT INTO products (name, description, price, picture, quantity, creationTimestamp) VALUES (?,?,?,?,?, NOW())",
        [
          req.body.name,
          req.body.description,
          req.body.price,
          req.body.picture,
          req.body.quantity,
        ]
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  // Product's update
  static updateOneProduct(req, id) {
    return db
      .query(
        "UPDATE products SET name= ?, description=?, price=?, picture=?, quantity=? WHERE id = ?",
        [
          req.body.name,
          req.body.description,
          req.body.price,
          req.body.picture,
          req.body.quantity,
          id,
        ]
      )
      .then((response) => {
        console.log("updateOneProduct response:", response);
        return response;
      })
      .catch((err) => {
        console.log("updateOneProduct error:", err);
        return err;
      });
  }

  // Delete product
  static deleteOneProduct(id) {
    return db
      .query("DELETE FROM products WHERE id =?", [id])
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
}
