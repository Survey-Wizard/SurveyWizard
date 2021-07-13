var express = require("express");
var router = express.Router();

router.get("/servuces", function (req, res, next) {
  res.render("services", { title: "Services - Clayton Rapiejko" });
});

module.exports = router;