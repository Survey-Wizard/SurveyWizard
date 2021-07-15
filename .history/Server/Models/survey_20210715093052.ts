import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SurveySchema = new Schema
({
    question1: String,
    T1: String,
    F1: String,
    question2: String,
    T2: String,
    F2: String,
    
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