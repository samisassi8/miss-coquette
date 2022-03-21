const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = "grosminet";
const withAuth = require("../withAuth");

module.exports = (app, db) => {
  const userModel = require("../models/UserModel")(db);

  // member registration
  app.post("/api/v1/user/save", async (req, res, next) => {
    let check = await userModel.getUserByEmail(req.body.email);
    if (check.indexOf(0) !== -1) {
      if (check[0].email === req.body.email) {
        res.json({ status: 401, msg: "Email déjà utilisé!" });
      }
    }
    let user = await userModel.saveOneUser(req);
    if (user.code) {
      res.json({ status: 500, msg: "il y a eu un problème !", result: user });
    } else {
      res.json({ status: 200, msg: "l'utilisateur a bien été enregistré" });
    }
  });

  // member's connexion
  app.post("/api/v1/user/login", async (req, res, next) => {
    // console.log(req.body);
    let user = await userModel.getUserByEmail(req.body.email);
    // console.log("user:", user);
    if (user.length === 0) {
      res.json({ status: 404, msg: "Pas d'utilisateur avec ce mail" });
    }
    bcrypt.compare(req.body.password, user[0].password).then((same) => {
      if (same) {
        const payload = { email: req.body.email, id: user[0].id };
        const token = jwt.sign(payload, secret);
        console.log("token", token);
        res.json({ status: 200, token: token, user: user[0] });
      } else {
        res.json({
          status: 401,
          error: "Votre mot de passe est incorrect",
        });
      }
    });
  });

  //user's update
  app.put("/api/v1/user/update/:id", withAuth, async (req, res, next) => {
    let userId = req.params.id;
    let user = await userModel.updateUser(req, userId);
    if (user.code) {
      res.json({ status: 500, msg: "gros problème", err: user });
    }
    res.json({ status: 200, result: user });
  });

  //recuperation d'un user en fonction de son id
  app.get("/api/v1/user/one/:id", async (req, res, next) => {
    let id = req.params.id;
    let user = await userModel.getOneUser(id);
    if (user.code) {
      res.json({
        status: 500,
        msg: "il y a un probleme pour recuperer le user",
        result: user,
      });
    } else {
      res.json({ status: 200, result: user });
    }
  });
};
