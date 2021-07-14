// modules required for routing
let express = require("express");
let router = express.Router();

// define the game model

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("../views/Content/index.ejs", {
    title: "Home",
  });
});

router.get("/explorePage", (req, res, next) => {
  res.render("../views/Explore/explore.ejs", {
    title: "Home",
  });
});

router.get("/mySurveys", (req, res, next) => {
  res.render("../views/mySurveys/mySurveys.ejs", {
    title: "Home",
  });
});
module.exports = router;
