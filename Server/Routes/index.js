"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../Models/user"));
const Util_1 = require("../Util");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const survey_1 = __importDefault(require("../Models/survey"));
let currentID = "";
let currentUser = "";
router.get("/", (req, res, next) => {
    res.render("../Views/Content/index.ejs", {
        title: "Home",
        displayName: Util_1.UserDisplayName(req),
        currentUser: currentUser
    });
});
router.get("/explorePage", (req, res, next) => {
    res.render("../Views/Explore/explore.ejs", {
        title: "Home",
        displayName: Util_1.UserDisplayName(req),
        currentUser: currentUser
    });
});
router.get("/mySurveys", (req, res, next) => {
    survey_1.default.find({ surveyAuthor: currentUser }, function (err, currentUserSurveys) {
        if (err) {
            return console.log(err);
        }
        else {
            console.log("CURRENT SURVEYS", currentUserSurveys);
            res.render("../Views/mySurveys/mySurveys.ejs", {
                title: "Home",
                survey: currentUserSurveys,
                displayName: Util_1.UserDisplayName(req),
                currentUser: currentUser
            });
        }
    });
});
router.get("/createSurvey", (req, res, next) => {
    res.render("../Views/Survey/createSurvey/createSurvey.ejs", {
        title: "Home",
        displayName: Util_1.UserDisplayName(req),
        error: false,
        message: "no error",
        currentUser: currentUser
    });
});
router.post("/survey/edit/:id", (req, res, next) => {
    let id = req.params.id;
    let surveyName = req.body.title;
    let surveyType = req.body.surveyType;
    let publicValue = req.body.publicValue;
    let questonTitle = req.body.questonTitle;
    let surveyQuestionType = req.body.surveyQuestionType;
    console.log("POST VALUES", questonTitle, surveyQuestionType, surveyName, surveyType, publicValue);
    const buildMap = (QuestionTitle, surveyQuestionType) => {
        const map = new Map();
        for (let i = 0; i < QuestionTitle.length; i++) {
            map.set(questonTitle[i], surveyQuestionType[i]);
        }
        ;
        return map;
    };
    let SurveyQuestions = [...buildMap(questonTitle, surveyQuestionType)];
    function renderNewQuestions() {
        return SurveyQuestions.map((question, index) => {
            return question;
        });
    }
    let updatedQuestion = new survey_1.default({
        "_id": id,
        "surveyName": surveyName,
        "surveyCategory": surveyType,
        "publicValue": publicValue,
        "surveyType": surveyQuestionType,
        "questions": renderNewQuestions()
    });
    survey_1.default.updateOne({ _id: id }, updatedQuestion, (err) => {
        console.log("UPDATED QUESTION");
        res.redirect("/mySurveys");
    });
});
router.get("/survey/edit/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    console.log("Editing Survey with id of:", id);
    let survey = yield survey_1.default.findById(id);
    let surveyQuestions = survey.questions;
    console.log("legnth", survey.questions.length);
    res.render("../Views/EditSurveyQuestions/editSurveyQuestion.ejs", {
        survey: survey,
        surveyQuestions: surveyQuestions,
        displayName: Util_1.UserDisplayName(req),
        currentUser: currentUser
    });
}));
router.post("/createSurvey", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("THIS IS THE POST");
    try {
        console.log(req.body);
        let surveyName = req.body.title;
        let surveyType = req.body.surveyType;
        let publicValue = req.body.publicValue;
        let format = "Some Formatt New";
        let startDate = new Date(req.body.startdate).getTime();
        let endDate = new Date(req.body.enddate).getTime();
        let timeLeft = endDate - startDate;
        const CurrentDate = new Date;
        if (timeLeft < 0) {
            res.render('../Views/Survey/createSurvey/createSurvey.ejs', { error: true, message: "start date can not be greater then end date", displayName: Util_1.UserDisplayName(req), currentUser: currentUser });
        }
        else if (req.body.startdate === "") {
            res.render('../Views/Survey/createSurvey/createSurvey.ejs', { error: true, message: "please fill out the start date", displayName: Util_1.UserDisplayName(req), currentUser: currentUser });
        }
        else if (req.body.enddate === "") {
            res.render('../Views/Survey/createSurvey/createSurvey.ejs', { error: true, message: "please fill out the  end date", displayName: Util_1.UserDisplayName(req), currentUser: currentUser });
        }
        else if (CurrentDate.getTime() <= startDate) {
            res.render('../Views/Survey/createSurvey/createSurvey.ejs', { error: true, message: "can not start a survey in the past", displayName: Util_1.UserDisplayName(req), currentUser: currentUser });
        }
        else if (CurrentDate.getTime() > endDate) {
            res.render('../Views/Survey/createSurvey/createSurvey.ejs', { error: true, message: "cannot have a survey end in the past", displayName: Util_1.UserDisplayName(req), currentUser: currentUser });
        }
        console.log("Survey Start and End Date", startDate, endDate);
        console.log("Time Left:", timeLeft);
        let newSurvey = yield survey_1.default.create({
            "surveyName": surveyName,
            "surveyCategory": surveyType,
            "publicValue": publicValue,
            "surveyType": format,
            "lifeSpan": req.body.enddate,
            "timeLeft": timeLeft
        });
        console.log("NEW SURVEY CREATED", newSurvey.id, "surveyAuthor", currentUser);
        currentID = newSurvey.id;
        console.log("CURRENT ID", currentID);
        res.render('../Views/Survey/surveyEditor/surveyEditor.ejs', { error: false, message: "cannot have a survey end in the past", displayName: Util_1.UserDisplayName(req), currentUser: currentUser });
    }
    catch (error) {
        console.log("ERROR", error);
        const createSurveyErrorMessage = error;
        res.render("../Views/Survey/createSurvey/createSurvey.ejs", { error: true, displayName: Util_1.UserDisplayName(req), message: "please make sure all info is filled out correctly", currentUser: currentUser });
    }
}));
router.get("/surveyEditor", (req, res, next) => {
    res.render("../Views/Survey/surveyEditor/surveyEditor.ejs", {
        title: "Home",
        displayName: Util_1.UserDisplayName(req),
        currentUser: currentUser
    });
});
router.post("/surveyEditor", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    console.log("post for edit");
    try {
        res.redirect('/surveyEditor');
        let QuestionTitle = req.body.questonTitle;
        let surveyQuestionType = req.body.surveyQuestionType;
        const buildMap = (QuestionTitle, surveyQuestionType) => {
            const map = new Map();
            for (let i = 0; i < QuestionTitle.length; i++) {
                map.set(QuestionTitle[i], surveyQuestionType[i]);
            }
            ;
            return map;
        };
        let SurveyQuestions = [...buildMap(QuestionTitle, surveyQuestionType)];
        ;
        SurveyQuestions.map((question, index) => __awaiter(void 0, void 0, void 0, function* () {
            yield survey_1.default.findOneAndUpdate({ _id: currentID }, { $push: { questions: question, surveyAuthor: currentUser } });
        }));
    }
    catch (error) {
    }
}));
router.get("/survey/delete/:id", (req, res, next) => {
    let id = req.params.id;
    survey_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/mySurveys');
    });
});
router.get("/login", (req, res, next) => {
    res.render("../Views/Authorization/login.ejs", {
        title: "Home",
        displayName: Util_1.UserDisplayName(req),
        error: false,
        currentUser: currentUser
    });
});
router.post('/login', (req, res, next) => {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            currentUser = user.username;
            console.log("USER ", user.username);
            return res.render("../Views/Authorization/login.ejs", { error: true, displayName: Util_1.UserDisplayName(req), message: "please make sure all info is filled out correclty", currentUser: currentUser });
        }
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return res.render("../Views/Authorization/login.ejs", { error: true, currentUser: currentUser });
            }
            currentUser = user.username;
            console.log("USER ", user.username);
            return res.redirect("/mySurveys");
        });
    })(req, res, next);
});
router.get("/register", (req, res, next) => {
    res.render("../Views/Authorization/register.ejs", {
        title: "Home",
        displayName: Util_1.UserDisplayName(req),
        currentUser: currentUser
    });
});
router.post('/register', (req, res, next) => {
    currentUser = req.body.username;
    let newUser = new user_1.default({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName
    });
    user_1.default.register(newUser, req.body.password, (err) => {
        if (err) {
            console.error('Error, Inserting New User');
            if (err.name == "UserExistsError") {
                console.error('Error: User Already Exists');
            }
            req.flash('registerMessage', 'Registration Error');
            return res.redirect("/register");
        }
        return passport_1.default.authenticate('local')(req, res, () => {
            return res.redirect("/mySurveys");
        });
    });
});
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect("/");
});
//# sourceMappingURL=index.js.map