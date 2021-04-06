const logoutController = {};

logoutController.logout = (req, res, next) => {
  req.session = null;
  res.status(200).json("Cookie session deleted, you're logged out!");
}

module.exports = logoutController;
