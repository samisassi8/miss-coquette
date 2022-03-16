const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("promise-mysql");
const cors = require("cors");
app.use(cors());
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    createParentPath: true,
  })
);

//url parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//middleware: une fonction qu'on va par la suite utiliser dans nos routes api pour controller si l'utilisateur peut executer le code de la route ou non (ici ce sera le fichier withAuth pour vérifier l'authentification de l'utilisateur)

//middleware testing
const myModule = require("./testModule");
myModule();
//on check si il l'api est en ligne ou non et on décide quelle bdd on récupère
if (!process.env.HOST_DB) {
  var config = require("./config-api");
}

// All routes
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

// connexion DB
const host = process.env.HOST_DB || config.db.host;
const database = process.env.DATABASE_DB || config.db.database;
const user = process.env.USER_DB || config.db.user;
const password = process.env.PASSWORD_DB || config.db.password;
const port = process.env.PORT || config.db.port;

console.log(host, database, user, password, port);

mysql
  .createConnection({
    host: host,
    database: database,
    user: user,
    password: password,
    port: port,
  })
  .then((db) => {
    console.log("connecté bdd");
    setInterval(async function () {
      let res = await db.query("SELECT 1");
    }, 10000);

    app.get("/", (req, res, next) => {
      res.json({ status: 200, results: "welcome to api" });
    });
    // All routes
    productRoutes(app, db);
    userRoutes(app, db);
    authRoutes(app, db);
    orderRoutes(app, db);
  });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("listening port " + PORT + " all is ok");
});
