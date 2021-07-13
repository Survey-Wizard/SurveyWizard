var express = require("express");
var router = express.Router();

router.get("/surveys", function (req, res, next) {
  res.render("surveys", { title: "Surveys" });
});

module.exports = router;