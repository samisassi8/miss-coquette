module.exports = (_db) => {
  db = _db;
  return OrderModel;
};

class OrderModel {
  // Order validation
  static saveOneOrder(user_id, totalAmount) {
    return db
      .query(
        'INSERT INTO orders (user_id, totalAmount, creationTimestamp, status) VALUES (?,?,now(), "not payed")',
        [user_id, totalAmount]
      )
      .then((result) => {
        // console.log("result", result);
        return result;
      })
      .catch((err) => {
        // console.log("err", err);
        return err;
      });
  }

  // orderdetail’s save
  static saveOneOrderDetail(order_id, product) {
    let total =
      parseInt(product.quantityInCart) * parseFloat(product.safePrice);
    return db
      .query(
        "INSERT INTO orderDetails (order_id, product_id, quantity, total) VALUES (?, ?, ?, ?)",
        [order_id, product.id, product.quantityInCart, total]
      )
      .then((result) => {
        // console.log("result", result);
        return result;
      })
      .catch((err) => {
        // console.log("error", err);
        return err;
      });
  }

  // Total amount modification
  static updateTotalAmount(order_id, totalAmount) {
    return db
      .query("UPDATE orders SET totalAmount = ? WHERE id = ?", [
        totalAmount,
        order_id,
      ])
      .then((result) => {
        // console.log("result", result);
        return result;
      })
      .catch((err) => {
        // console.log("error", err);
        return err;
      });
  }

  // Get a command with its id
  static getOneOrder(id) {
    return db
      .query("SELECT * FROM orders WHERE id = ?", [id])
      .then((result) => {
        // console.log("result", result);
        return result;
      })
      .catch((err) => {
        // console.log("error", err);
        return err;
      });
  }
}
