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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const survey_1 = __importDefault(require("../Models/survey"));
let currentID = "";
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
    survey_1.default.find((err, surveys) => {
        if (err) {
            return console.log(err);
        }
        else {
            res.render("../Views/mySurveys/mySurveys.ejs", {
                title: "Home",
                survey: surveys
            });
        }
    });
});
router.get("/createSurvey", (req, res, next) => {
    res.render("../Views/Survey/createSurvey/createSurvey.ejs", {
        title: "Home",
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
        surveyQuestions: surveyQuestions
    });
}));
router.post("/createSurvey", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("THIS IS THE POST");
    try {
        console.log(req.body);
        let surveyName = req.body.title;
        let surveyType = req.body.surveyType;
        let publicValue = req.body.publicValue;
        let format = "Some surveyType";
        let newSurvey = yield survey_1.default.create({
            "surveyName": surveyName,
            "surveyCategory": surveyType,
            "publicValue": publicValue,
            "surveyType": format
        });
        console.log("NEW SURVEY CREATED", newSurvey.id);
        currentID = newSurvey.id;
        console.log("CURRENT ID", currentID);
        res.redirect('/surveyEditor');
    }
    catch (error) {
        console.log("ERROR", error);
    }
}));
router.get("/surveyEditor", (req, res, next) => {
    res.render("../Views/Survey/surveyEditor/surveyEditor.ejs", {
        title: "Home",
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
            yield survey_1.default.findOneAndUpdate({ _id: currentID }, { $push: { questions: question } });
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
            return res.redirect("/mySurveys");
        }
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.redirect("/mySurveys");
        });
    })(req, res, next);
});
router.get("/register", (req, res, next) => {
    res.render("../Views/Authorization/register.ejs", {
        title: "Home",
    });
});
router.post('/register', (req, res, next) => {
    let newUser = new user_1.default({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName
    });
    user_1.default.register(newUser, req.body.password, (err) => {
        if (err) {
            console.error('Error: Inserting New User');
            if (err.name == "UserExistsError") {
                console.error('Error: User Already Exists');
            }
            req.flash('registerMessage', 'Registration Error');
            return res.redirect("/mySurveys");
        }
        return passport_1.default.authenticate('local')(req, res, () => {
            return res.redirect("/mySurveys");
        });
    });
});
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect("../Views/Authorization/login.ejs");
});
//# sourceMappingURL=index.js.map