// modules required for routing
import express from "express";
const router = express.Router();
export default router;

// define the game model

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("../Views/Content/index.ejs", {
    title: "Home",
  });
});

/*GET explore page*/
router.get("/explorePage", (req, res, next) => {
  res.render("../Views/Explore/explore.ejs", {
    title: "Home",
  });
});

/*GET mySurveys page*/
router.get("/mySurveys", (req, res, next) => {
  res.render("../Views/mySurveys/mySurveys.ejs", {
    title: "Home",
  });
});



//module.exports = router;
