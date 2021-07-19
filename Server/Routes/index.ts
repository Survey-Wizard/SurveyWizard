// // modules required for routing
// import express from "express";
// const router = express.Router();
// export default router;

// import Survey from "../Models/survey";

// let currentID = "";

// /* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("../Views/Content/index.ejs", {
//     title: "Home",
//   });
// });

// /*GET explore page*/
// router.get("/explorePage", (req, res, next) => {
//   res.render("../Views/Explore/explore.ejs", {
//     title: "Home",
//   });
// });

// /*GET mySurveys page*/
// router.get("/mySurveys", (req, res, next) => {
//   Survey.find((err, surveys) => {
//     console.log("surveys", surveys[0].id)
//     if(err) {
//       return console.log(err);
//     }
//     else {
//       res.render("../Views/mySurveys/mySurveys.ejs", {
//         title: "Home",
//         survey: surveys
//       });
//     }
//   })
 
// });

// /*GET createSurvey page*/
// router.get("/createSurvey", (req, res, next) => {
//   res.render("../Views/Survey/createSurvey/createSurvey.ejs", {
//     title: "Home",
//   });
// });

// router.get("/survey/edit/:id", async(req, res, next) => {
//   let id = req.params.id;
//   console.log("Editing Survey with id of:", id)
//   let survey = await Survey.findById(id);
//   let surveyQuestions = survey.questions;
//   console.log("legnth",survey.questions.length)
//     res.render("../Views/EditSurveyQuestions/editSurveyQuestion.ejs", {
//       survey: survey,
//       surveyQuestions: surveyQuestions
//   });


// });

// router.post("/survey/edit/:id", (req, res, next) => {
//  let id = req.params.id;
//  let surveyName = req.body.title;
//   let surveyType = req.body.surveyType;
//   let publicValue = req.body.publicValue;
//  let questonTitle = req.body.questonTitle;
//   let surveyQuestionType = req.body.surveyQuestionType;

//  console.log("POST VALUES", questonTitle, surveyQuestionType, surveyName, surveyType, publicValue)

//  const buildMap = (QuestionTitle: any, surveyQuestionType: any) => {
//   const map = new Map();
//   for(let i = 0; i < QuestionTitle.length; i++){
//     map.set(questonTitle[i], surveyQuestionType[i]);
//  };
//  return map;
// }
// let SurveyQuestions = [...buildMap(questonTitle, surveyQuestionType)];
//   function renderNewQuestions() {
//    return SurveyQuestions.map((question, index) => {
//       return question;
//       })
//   }
// let updatedQuestion = new Survey ({
//   "_id": id,
//   "surveyName": surveyName,
//   "surveyCategory": surveyType,
//   "publicValue": publicValue,
//   "surveyType": surveyQuestionType,
//   "questions": renderNewQuestions()
// })
// Survey.updateOne({_id: id}, updatedQuestion, (err) => {
//   console.log("UPDATED QUESTION")
//   res.redirect("/mySurveys")
// })

// });




// router.post("/createSurvey", async(req, res, next) => {
//   console.log("THIS IS THE POST");
//   try  {
//   console.log(req.body);
//   let surveyName = req.body.title;
//   let surveyType = req.body.surveyType;
//   let publicValue = req.body.publicValue
//   let format = "Some surveyType";

//     let newSurvey = await Survey.create({
//       "surveyName": surveyName,
//       "surveyCategory": surveyType,
//       "publicValue": publicValue,
//       "surveyType": format
//     })
//     console.log("NEW SURVEY CREATED", newSurvey.id)
//     currentID = newSurvey.id;
//     console.log("CURRENT ID", currentID)
//     res.redirect('/surveyEditor');
//   }
//   catch (error) {
//     console.log("ERROR", error)
//   }
// })

// /*GET surveyEditor page*/
// router.get("/surveyEditor", (req, res, next) => {
//   res.render("../Views/Survey/surveyEditor/surveyEditor.ejs", {
//     title: "Home",
//   });
// });

// router.post("/surveyEditor", async(req, res, next) => {
// console.log(req.body);
// console.log("post for edit")

// try {
//   res.redirect('/surveyEditor')

//   let QuestionTitle = req.body.questonTitle;
//   let surveyQuestionType = req.body.surveyQuestionType;
  
//   const buildMap = (QuestionTitle: any, surveyQuestionType: any) => {
//     const map = new Map();
//     for(let i = 0; i < QuestionTitle.length; i++){
//       map.set(QuestionTitle[i], surveyQuestionType[i]);
//    };
//    return map;
//   }

//   let SurveyQuestions = [...buildMap(QuestionTitle, surveyQuestionType)];;

//   SurveyQuestions.map( async(question, index) => {
    
//      Survey.findOneAndUpdate({_id: currentID}, {$push: { questions: question}});
//   })
  

// }
// catch(error) {

// }
// })

// router.get("/mySurvey/delete/:id", (req, res, next) => {
//   let id = req.params.id;
//   console.log(req.params)
//   Survey.remove({_id: id}, (err) => {
//     if(err) {
//       console.log(err)
//     }
//     else {
//       console.log("Survey Removed", id);
//       res.redirect("/mySurveys");    
//     }
//   })
// })




import express from "express";
const router = express.Router();
export default router;

import Survey from "../Models/survey";

let currentID = "";

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("../Views/Content/index.ejs", {
    title: "Home",
  });
});

/*GET explore page*/
router.get("/explorePage", (req, res, next) => {
  res.render("../Views/Explore/explore.ejs", {
    title: "Home",
  });
});

/*GET mySurveys page*/
router.get("/mySurveys", (req, res, next) => {
  Survey.find((err, surveys) => {
    if(err) {
      return console.log(err);
    }
    else {
      res.render("../Views/mySurveys/mySurveys.ejs", {
        title: "Home",
        survey: surveys
      });
    }
  })
 
});

/*GET createSurvey page*/
router.get("/createSurvey", (req, res, next) => {
  res.render("../Views/Survey/createSurvey/createSurvey.ejs", {
    title: "Home",
  });
});

router.get("/survey/edit/:id", async(req, res, next) => {
  let id = req.params.id;
  console.log("Editing Survey with id of:", id)
  let survey = await Survey.findById(id);
    console.log("survey", survey)
    let surveyQuestions = survey.questions;
    console.log(surveyQuestions)
    res.render("../Views/EditSurveyQuestions/editSurveyQuestion.ejs", {
      survey: survey,
       surveyQuestions: surveyQuestions
  });


});
router.post("/createSurvey", async(req, res, next) => {
  console.log("THIS IS THE POST");
  try  {
  console.log(req.body);
  let surveyName = req.body.title;
  let surveyType = req.body.surveyType;
  let publicValue = req.body.publicValue
  let format = "Some surveyType";

    let newSurvey = await Survey.create({
      "surveyName": surveyName,
      "surveyCategory": surveyType,
      "publicValue": publicValue,
      "surveyType": format
    })
    console.log("NEW SURVEY CREATED", newSurvey.id)
    currentID = newSurvey.id;
    console.log("CURRENT ID", currentID)
    res.redirect('/surveyEditor');
  }
  catch (error) {
    console.log("ERROR", error)
  }
})
router.post("/survey/edit/:id", (req, res, next) => {	
  let id = req.params.id;	
  let surveyName = req.body.title;	
   let surveyType = req.body.surveyType;	
   let publicValue = req.body.publicValue;	
  let questonTitle = req.body.questonTitle;	
   let surveyQuestionType = req.body.surveyQuestionType;	
  console.log("POST VALUES", questonTitle, surveyQuestionType, surveyName, surveyType, publicValue)	
  const buildMap = (QuestionTitle: any, surveyQuestionType: any) => {	
   const map = new Map();	
   for(let i = 0; i < QuestionTitle.length; i++){	
     map.set(questonTitle[i], surveyQuestionType[i]);	
  };	
  return map;	
 }	
 let SurveyQuestions = [...buildMap(questonTitle, surveyQuestionType)];	
   function renderNewQuestions() {	
    return SurveyQuestions.map((question, index) => {	
       return question;	
       })	
   }	
 let updatedQuestion = new Survey ({	
   "_id": id,	
   "surveyName": surveyName,	
   "surveyCategory": surveyType,	
   "publicValue": publicValue,	
   "surveyType": surveyQuestionType,	
   "questions": renderNewQuestions()	
 })	
 Survey.updateOne({_id: id}, updatedQuestion, (err) => {	
   console.log("UPDATED QUESTION")	
   res.redirect("/mySurveys")	
 })	
 });
/*GET surveyEditor page*/
router.get("/surveyEditor", (req, res, next) => {
  res.render("../Views/Survey/surveyEditor/surveyEditor.ejs", {
    title: "Home",
  });
});

router.post("/surveyEditor", async(req, res, next) => {
console.log(req.body);
console.log("post for edit")

try {
  res.redirect('/surveyEditor')
  let QuestionTitle = req.body.questonTitle;
  let surveyQuestionType = req.body.surveyQuestionType;
  
  const buildMap = (QuestionTitle: any, surveyQuestionType: any) => {
    const map = new Map();
    for(let i = 0; i < QuestionTitle.length; i++){
      map.set(QuestionTitle[i], surveyQuestionType[i]);
   };
   return map;
  }

  let SurveyQuestions = [...buildMap(QuestionTitle, surveyQuestionType)];;

  SurveyQuestions.map( async(question, index) => {
    
    await Survey.findOneAndUpdate({_id: currentID}, {$push: { questions: question}});
  })
  

}
catch(error) {

}
})


// Process (D)elete page
router.get("/survey/delete/:id", (req, res, next) =>
{
  
  let id = req.params.id;

  // db.survey.remove({"_id: id"})
  Survey.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/mySurveys');
  });
}

);







module.exports = router;
