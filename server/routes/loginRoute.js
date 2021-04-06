const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.get("/:username/:password", loginController.checkUser);

router.get("/logout", loginController.logout);

module.exports = router;
