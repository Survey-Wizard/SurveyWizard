import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SurveySchema = new Schema
({
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
},
{
    collection: "survey"
});

const Model = mongoose.model("Survey", SurveySchema);
export default Model;