"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessAddPage = exports.DisplayAddPage = exports.ProcessDeletePage = exports.ProcessUpdatePage = exports.DisplayUpdatePage = exports.DisplayQuestionListPage = void 0;
const survey_1 = __importDefault(require("../Models/survey"));
function DisplayQuestionListPage(req, res, next) {
    survey_1.default.find(function (err, questionList) {
        if (err) {
            return console.error(err);
        }
        res.render('index', { title: 'Survey', page: 'contactlist', question: questionList });
    });
}
exports.DisplayQuestionListPage = DisplayQuestionListPage;
function DisplayUpdatePage(req, res, next) {
    let id = req.params.id;
    console.log(id);
    survey_1.default.findById(id, {}, {}, (err, questionToUpdate) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Update', page: 'update', contact: questionToUpdate });
    });
}
exports.DisplayUpdatePage = DisplayUpdatePage;
function ProcessUpdatePage(req, res, next) {
    let id = req.params.id;
    let updatedQuestion = new survey_1.default({
        "_id": id,
        "question": req.body.name,
        "optionT": req.body.number,
        "optionF": req.body.email
    });
    survey_1.default.updateOne({ _id: id }, updatedQuestion, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contactlist');
    });
}
exports.ProcessUpdatePage = ProcessUpdatePage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    survey_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contactlist');
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
function DisplayAddPage(req, res, next) {
    res.render('index', { title: 'Add', page: 'update', clothing: '' });
}
exports.DisplayAddPage = DisplayAddPage;
function ProcessAddPage(req, res, next) {
    let newQuestion;
    for (let i = 1; i < 6; i++) {
        let newQuestion = new survey_1.default({
            "name": req.body.name,
            "brand": req.body.brand,
            "category": req.body.category,
            "colour": req.body.colour,
            "size": req.body.size,
            "price": req.body.price
        });
    }
    let newSurvey = new survey_1.default({ "question": [newQuestion] });
    survey_1.default.create(newQuestion, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/clothing-list');
    });
}
exports.ProcessAddPage = ProcessAddPage;
//# sourceMappingURL=survey.js.map