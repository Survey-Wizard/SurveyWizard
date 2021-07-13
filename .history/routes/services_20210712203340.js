var express = require("express");
var router = express.Router();

router.get("/Survey", function (req, res, next) {
  res.render("Survey", { title: "Survey - Clayton Rapiejko" });
});

module.exports = router;