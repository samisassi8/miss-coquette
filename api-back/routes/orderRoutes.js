const withAuth = require("../withAuth");

module.exports = function (app, connection) {
  const orderModel = require("../models/OrderModel")(db);
  const productModel = require("../models/ProductModel")(db);

  //Save an order
  app.post("/api/v1/order/save", withAuth, async (req, res, next) => {
    let totalAmount = 0;

    let orderInfos = await orderModel.saveOneOrder(
      req.body.user_id,
      totalAmount
    );
    let id = orderInfos.insertId;
    console.log("req.body:", req.body);
    console.log("req.body.basket:", req.body.basket);
    req.body.basket.map(async (b, index) => {
      console.log("b:", b);
      let product = await productModel.getOneProduct(b.id);
      b.safePrice = parseFloat(product[0].price);
      let detail = await orderModel.saveOneOrderDetail(id, b);
      totalAmount += parseInt(b.quantityInCart) * parseFloat(b.safePrice);
      let udpate = await orderModel.updateTotalAmount(id, totalAmount);
    });
    res.json({ status: 200, orderId: id });
  });

  // app.post("/api/v1/order/payment", withAuth, async (req, res, next) => {
  //   let order = await orderModel.getOneOrder(req.body.orderId);
  //   // const paymentIntent = await stripe.paymentIntents.create({
  //   //   amount: order[0].totalAmount * 100,
  //   //   currency: "eur",
  //   //   metadata: { integration_check: "accept_a_payment" },
  //   //   receipt_email: req.body.email,
  //   // });

  //   res.json({ client_secret: paymentIntent["client_secret"] });
  // });

  // order payment validation
  app.put("/api/v1/order/validate", withAuth, async (req, res, next) => {
    console.log(req.body);
    let validate = await orderModel.updateStatus(
      req.body.orderId,
      req.body.status
    );
    res.json({ status: 200, msg: "paiement validé" });
  });
};
