const { RootRef } = require("@material-ui/core");
const db = require("../models/query");
const SALT_WORK_FACTOR = 5;
const bcrypt = require('bcryptjs');
const BCRYPT_TEST_ID = 'Senor Goobly';

const loginController = {};

// CHECK if user exists
loginController.checkUser = (req, res, next) => {
  const { username, password } = req.params;
  let id;
  const queryString = `SELECT * FROM users WHERE username='${username}' and password='${password}'`;

  db.query(queryString)
    .then(async (user) => {
      console.log(user);
      res.locals.user = user.rows;

      if (res.locals.user.length === 0) {
        next("INVALID") // user not found, need to do more things here
      }

      for (let i = 0; i < res.locals.user.length; i++) {
        id = res.locals.user[i].id;
        req.session.user = await bcrypt.hash(`${id}`, SALT_WORK_FACTOR);
      }
    })
    .then(() => {
      const queryString2 = `UPDATE users SET user_hash_id='${req.session.user}' WHERE id=${id}`;
      db.query(queryString2)
      .then((user) => {
        res.status(200).redirect('/');
      })
      .catch((err) => next(err));
    })
    // if there's an error, call global error handler
    .catch((err) => next(err));
};

loginController.logout = (req, res, next) => {
  req.session = null;
  res.status(200).json("Cookie session deleted, you're logged out!");
}

module.exports = loginController;
