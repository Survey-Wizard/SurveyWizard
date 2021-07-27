import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SurveySchema = new Schema
({
  surveyName: { type: String, required: true },
  surveyCategory: { type: String, required: true },
  publicValue: { type: String, required: true },
  surveyType: { type: String, required: true },
  surveyAuthor: {type: String},
  timeLeft: {},

  questions: {},
  respones: {type: String},
  active: Boolean,
  lifeSpan: {
      type: Date,
      default: Date.now(),
  },
},
{
    collection: "survey"
});

const Model = mongoose.model("Survey", SurveySchema);
export default Model; 