import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SurveySchema = new Schema
({
  surveyName: { type: String, required: true },
  surveyCategory: { type: String, required: true },
  publicValue: { type: String, required: true },
  surveyType: { type: String, required: true },


  questions: [String],
  respones: {type: String},
  active: Boolean,
  lifeSpan: {
      type: Date,
      default: Date.now(),
      expire: new Date(2021, 8, 20)
  },
  owner: String
},
{
    collection: "survey"
});

const Model = mongoose.model("Survey", SurveySchema);
export default Model; 