const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsers, (req, res) =>
	res.status(200).json(res.locals.users)
);

router.post("/newUser", userController.addUser, (req, res) =>
	res.status(200).json({ success: true })
);

router.delete("/deleteUser/:id", userController.deleteUser, (req, res) =>
	res.status(200).json({ success: true })
);

router.put("/updateUser/:id", userController.updateUser, (req, res) => 
  res.status(200).json({ success: true })
);

module.exports = router;
