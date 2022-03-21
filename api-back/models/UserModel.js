const bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports = (_db) => {
  db = _db;
  return UserModel;
};

class UserModel {
  // Save a member
  static saveOneUser(req) {
    return bcrypt.hash(req.body.password, saltRounds).then((hash) => {
      // console.log("hash", hash);
      return db
        .query(
          'INSERT INTO users (firstName, lastName, email, password, role, address, zip, city, phone, creationTimestamp, connexionTimestamp) VALUES (?, ?, ?, ?, "user", ?, ?, ?, ?, now(), now())',
          [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            hash,
            req.body.address,
            req.body.zip,
            req.body.city,
            req.body.phone,
          ]
        )
        .then((response) => {
          // console.log(response);
          return response;
        })
        .catch((err) => {
          return err;
        });
    });
  }

  // Get a member with its email
  static getUserByEmail(email) {
    return db
      .query("SELECT * FROM users WHERE email = ?", [email])
      .then((response) => {
        // console.log("getUserByEmail", response);
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  // Get a user with its id
  static getOneUser(id) {
    return db.query("SELECT * FROM users WHERE id= ?", [id]).then((user) => {
      if (user.length === 0) {
        return {
          status: 401,
          error: "email incorrect",
        };
      } else {
        return user;
      }
    });
  }

  //user's update
  static updateUser(req, userId) {
    return db
      .query(
        "UPDATE users SET firstName=?,lastName=?, address=?,zip=?,city=?,phone= ? WHERE id=?",
        [
          req.body.firstName,
          req.body.lastName,
          req.body.address,
          req.body.zip,
          req.body.city,
          req.body.phone,
          userId,
        ]
      )
      .then((response) => {
        // console.log("update user", response);
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
}
