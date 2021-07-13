var express = require("express");
var router = express.Router();

router.get("/Surveys", function (req, res, next) {
  res.render("Surveys", { title: "Surveys - Clayton Rapiejko" });
});

module.exports = router;