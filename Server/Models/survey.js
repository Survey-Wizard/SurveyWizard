"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const SurveySchema = new Schema({
    SurveyName: { type: String, required: true },
    SurveyCategory: { type: String, required: true },
    PublicValue: { type: String, required: true },
    SurveyType: { type: String, required: true },
    questions: [
        {
            SurveyQuestion: { type: String, required: true },
        },
        {
            questionTitle: { type: String, required: true },
        },
        {
            questionTitle: { type: String, required: true },
        },
        {
            questionTitle: { type: String, required: true },
        },
        {
            questionTitle: { type: String, required: true },
        },
    ],
    active: Boolean,
    lifeSpan: {
        type: Date,
        default: Date.now(),
        expire: new Date(2021, 8, 20)
    },
    owner: String
}, {
    collection: "survey"
});
const Model = mongoose_1.default.model("Survey", SurveySchema);
exports.default = Model;
//# sourceMappingURL=survey.js.map