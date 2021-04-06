const db = require("../models/query");

const wardrobeController = {};

// GET wardrobe items from clothing_item table
wardrobeController.getItems = (req, res, next) => {
	const queryString = `SELECT * FROM clothing_item`;
	db.query(queryString)
		.then((wardrobe) => {
			res.locals.allItems = wardrobe.rows;
			return next();
		})
		// if there's an error, call global error handler
		.catch((err) => next(err));
};

// GET one wardrobe from clothing_item table
// endpoint example: '/wardrobe/getItems/tops'
wardrobeController.getItemByType = (req, res, next) => {
	const { type } = req.params;
	const queryString = `SELECT * FROM clothing_item WHERE type='${type}'`;
	db.query(queryString)
		.then((wardrobe) => {
			res.locals.items = wardrobe.rows;
			return next();
		})
		// if there's an error, call global error handler
		.catch((err) => next(err));
};

// POST an item to clothing_item table
wardrobeController.addItem = (req, res, next) => {
	const { url, type, user_id } = req.body;
	const queryString = `INSERT INTO clothing_item(url, type, user_id)
  VALUES('${url}', '${type}', ${user_id})`;
	db.query(queryString)
		.then(() => {
			return next();
		})
		// if there's an error, call global error handler
		.catch((err) => next(err));
};

// FOR DELETE an item from clothing_item table
// endpoint example: '/wardrobe/deleteItem/1'
wardrobeController.deleteItem = (req, res, next) => {
	const id = parseInt(req.params.id);
	const query = `DELETE FROM clothing_item WHERE id=${id}`;
	db.query(query)
		.then(() => {
			return next();
		})
		// if there's an error, call global error handler
		.catch((err) => next(err));
};

module.exports = wardrobeController;
