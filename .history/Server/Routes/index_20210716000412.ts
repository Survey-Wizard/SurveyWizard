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

/*GET createSurvey page*/
router.get("/createSurvey", (req, res, next) => {
  res.render("../Views/Survey/createSurvey/createSurvey.ejs", {
    title: "Home",
  });
});

/*GET surveyEditor page*/
router.get("/surveyEditor", (req, res, next) => {
  res.render("../Views/Survey/surveyEditor/surveyEditor.ejs", {
    title: "Home",
  });
});



//module.exports = router;
