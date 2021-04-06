const db = require("../models/query");

const userController = {};


// CREATE TABLE users (
//   id INT GENERATED ALWAYS AS IDENTITY,
//   firstname VARCHAR,
//   lastname VARCHAR,
//   username VARCHAR,
//   password VARCHAR,
//   zipcode INT,
//   user_hash_id INT
// );


// GET all users
userController.getUsers = (req, res, next) => {
	const queryString = `SELECT * FROM users`;
	db.query(queryString)
		.then((users) => {
			console.log(users);
			res.locals.users = users.rows;
			return next();
		})
		// if there's an error, call global error handler
		.catch((err) => next(err));
};

// POST new user
userController.addUser = (req, res, next) => {
	const {
    firstname,
		lastname,
		username,
		password,
		zipcode,
		user_hash_id
	} = req.body;
  console.log(firstname, lastname, username, password, zipcode);
	const queryString = `INSERT INTO users(firstname,
		lastname,
		username,
		password,
		zipcode,
		user_hash_id)
    VALUES('${firstname}', '${lastname}', '${username}', '${password}', ${zipcode}, '${user_hash_id}')`;
	db.query(queryString)
		.then(() => {
			return next();
		})
		// if there's an error, call global error handler
		.catch((err) => {
			next(err);
		});
};

// DELETE user
userController.deleteUser = (req, res, next) => {
	const id = parseInt(req.params.id);
	const query = `DELETE FROM users WHERE id=${id}`;
	db.query(query)
		.then(() => {
			return next();
		})
		// if there's an error, call global error handler
		.catch((err) => next(err));
};
//   "user_hash_id": "$2a$05$gP3fIv0Q8qgj4F7PglMzdOf047YQmODzskxqCysf764PM60n4.Nfi"
// UPDATE user_hash_id
userController.updateUser = (req, res, next) => {
	const id = parseInt(req.params.id);
  const { user_hash_id } = req.body;
	const query = `UPDATE users SET user_hash_id=${user_hash_id} WHERE id=${id}`;
	db.query(query)
		.then(() => {
			return next();
		})
		// if there's an error, call global error handler
		.catch((err) => next(err));
};


module.exports = userController;
