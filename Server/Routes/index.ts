import passport from 'passport';

//create an instance from the user model 
import User from '../Models/user'

// IMPORT UTIL FUNCTION     !!!
import { UserDisplayName, AuthGuard } from '../Util';

// modules required for routing
import express from "express";
const router = express.Router();
export default router;

import Survey from "../Models/survey";

let currentID = "";
let currentUser = "";

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("../Views/Content/index.ejs", {
    title: "Home",
    displayName: UserDisplayName(req)
  });
});

/*GET explore page*/
router.get("/explorePage", (req, res, next) => {
  res.render("../Views/Explore/explore.ejs", {
    title: "Home",
    displayName: UserDisplayName(req)
  });
});

/*GET mySurveys page*/
router.get("/mySurveys", (req, res, next) => {
  // Survey.find((err, surveys) => {
  //   if(err) {
  //     return console.log(err);
  //   }
  //   else {
  //     res.render("../Views/mySurveys/mySurveys.ejs", {
  //       title: "Home",
  //       survey: surveys,
  //       displayName: UserDisplayName(req),
  //       currentUser: currentUser
  //     });
  //   }
  // })

  Survey.find({surveyAuthor: currentUser}, function (err: any, currentUserSurveys: any) {
    if(err) {
      return console.log(err);
    }
    else {
      console.log("CURRENT SURVEYS", currentUserSurveys)
      res.render("../Views/mySurveys/mySurveys.ejs", {
        title: "Home",
        survey: currentUserSurveys,
        displayName: UserDisplayName(req),
       currentUser: currentUser
      })
    }
  })
 
});

/*GET createSurvey page*/
router.get("/createSurvey", (req, res, next) => {
  res.render("../Views/Survey/createSurvey/createSurvey.ejs", {
    title: "Home",
    displayName: UserDisplayName(req)
  });
});
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

router.get("/survey/edit/:id", async(req, res, next) => {
  let id = req.params.id;
  console.log("Editing Survey with id of:", id)
  let survey = await Survey.findById(id);
  let surveyQuestions = survey.questions;
  console.log("legnth", survey.questions.length)
    res.render("../Views/EditSurveyQuestions/editSurveyQuestion.ejs", {
      survey: survey,
      surveyQuestions: surveyQuestions,
      displayName: UserDisplayName(req)
  });


});
router.post("/createSurvey", async(req, res, next) => {
  console.log("THIS IS THE POST");
  try  {
  console.log(req.body);
  let surveyName = req.body.title;
  let surveyType = req.body.surveyType;
  let publicValue = req.body.publicValue;
  let format = "Some Formatt New";

    let newSurvey = await Survey.create({
      "surveyName": surveyName,
      "surveyCategory": surveyType,
      "publicValue": publicValue,
      "surveyType": format, 
    })
    console.log("NEW SURVEY CREATED", newSurvey.id, "surveyAuthor", currentUser);
    currentID = newSurvey.id;
    console.log("CURRENT ID", currentID)
    res.redirect('/surveyEditor');
  }
  catch (error) {
    console.log("ERROR", error)
  }
})

/*GET surveyEditor page*/
router.get("/surveyEditor", (req, res, next) => {
  res.render("../Views/Survey/surveyEditor/surveyEditor.ejs", {
    title: "Home",
    displayName: UserDisplayName(req)
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
    
    await Survey.findOneAndUpdate({_id: currentID}, {$push: { questions: question, surveyAuthor: currentUser}});
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

//AUTHENTICATION SECTION

/*GET login page*/
router.get("/login", (req, res, next) => {
  res.render("../Views/Authorization/login.ejs", {
    title: "Home",
    displayName: UserDisplayName(req)
  });
});

//POST - process login page when user clicks login btn
router.post('/login', (req, res, next) => {
 
  passport.authenticate('local', (err, user, info) => 
{
    //are there server errors?
    if(err)
    {
        console.error(err);
        return next(err);
    }

    //are there login errors?
    if(!user)
    {
        req.flash('loginMessage', 'Authentication Error');
        currentUser = user.username;
        console.log("USER ",user.username)
        return res.redirect("/mySurveys");
    }

    req.login(user, (err) =>
    {
        //are there database errors>
        if(err)
        {
            console.error(err);
            return next(err);
        }
        currentUser = user.username;
        console.log("USER ",user.username)
        return res.redirect("/mySurveys");

    });

})(req, res, next);
});

/*GET Register page*/
router.get("/register", (req, res, next) => {
  res.render("../Views/Authorization/register.ejs", {
    title: "Home",
    displayName: UserDisplayName(req)
  });
});

// POST - process register page when suer clicks register btn
router.post('/register',(req, res, next) =>
{
//instantiate a new user object
currentUser = req.body.username;
let newUser = new User
({
    username: req.body.username,
    emailAddress: req.body.emailAddress,
    displayName: req.body.FirstName + " " + req.body.LastName
});

User.register(newUser, req.body.password, (err) => 
{
    if(err)
    {
        console.error('Error: Inserting New User');
        if(err.name == "UserExistsError")
        {
            console.error('Error: User Already Exists');
        }
        req.flash('registerMessage', 'Registration Error');

        return res.redirect("/mySurveys");   
    }
    //after successful registration - login the user 
    return passport.authenticate('local')(req, res, () => {
        return res.redirect("/mySurveys");
    });
});
});

// GET - process logout page with /logout
router.get('/logout', (req, res, next) => 
{
  req.logout();

    res.redirect("/login");
}
);

//module.exports = router;