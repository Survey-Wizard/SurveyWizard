"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const SurveySchema = new Schema({
    surveyName: { type: String, required: true },
    surveyCategory: { type: String, required: true },
    publicValue: { type: String, required: true },
    surveyType: { type: String, required: true },
    surveyAuthor: { type: String },
    timeLeft: {},
    questions: {},
    responses: {},
    active: Boolean,
    lifeSpan: {
        type: Date,
        default: Date.now(),
    },
}, {
    collection: "survey"
});
const Model = mongoose_1.default.model("Survey", SurveySchema);
exports.default = Model;
//# sourceMappingURL=survey.js.map