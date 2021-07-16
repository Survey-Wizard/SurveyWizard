"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
router.get("/", (req, res, next) => {
  res.render("../Views/Content/index.ejs", {
    title: "Home",
  });
});
router.get("/explorePage", (req, res, next) => {
  res.render("../Views/Explore/explore.ejs", {
    title: "Home",
  });
});
router.get("/mySurveys", (req, res, next) => {
  res.render("../Views/mySurveys/mySurveys.ejs", {
    title: "Home",
  });
});
router.get("/createSurvey", (req, res, next) => {
  res.render("../Views/Survey/createSurvey/createSurvey.ejs", {
    title: "Home",
  });
});
router.get("/surveyEditor", (req, res, next) => {
  res.render("../Views/Survey/surveyEditor/surveyEditor.ejs", {
    title: "Home",
  });
});

router.post("/createSurvey", async (req, res, next) => {
  console.log("HELLO");
  try {
    console.log(req.body);
    let { surveyName, surveyCatagory, publicValue, format } = req.body;
    console.log("SURVEY INFO", surveyCatagory, surveyName, publicValue, format);

    let newSurveyQuestion = await SurveyQuestion.create({
      surveyName: surveyName,
      surveyCatagory: surveyCatagory,
      publicValue: publicValue,
      surveyType: format,
      questions: [],
      active: true,
      owner: surveyName,
    });
    console.log("new surveyQUestion added:", newSurveyQuestion);
    res.redirect("/surveyEditor");
  } catch (error) {
    console.log(error);
  }
});
