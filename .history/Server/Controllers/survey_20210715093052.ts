import express, { Request, Response, NextFunction } from 'express';

// Contact Model Reference 
import Survey from '../Models/survey';
import Question from '../Models/question';

// import util function
import { UserDisplayName } from '../Util';

// Display Functions

//(R)ead in CRUD
export function DisplayQuestionListPage(req: Request, res: Response, next: NextFunction): void
{
    
    Question.find(function(err, questionList)
    {
        if(err)
        {
            return console.error(err);
        }

        res.render('index', { title: 'Survey', page: 'contactlist', question: questionList })
    });
} 

export function DisplayUpdatePage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    console.log(id);

    // pass the id to the db
    
    Question.findById(id, {}, {}, (err, questionToUpdate) => 
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        // show the update view
        res.render('index', {title: 'Update', page: 'update', contact: questionToUpdate});
    });
}

    // Process update page
export function ProcessUpdatePage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new Contact
    // uses name element in form
    let updatedQuestion = new Question
    ({
      "_id": id,
      "question": req.body.name,
      "optionT": req.body.number,
      "optionF": req.body.email
    });
  
    // find the contact via db.contact.update({"_id":id}) and then update
    Contact.updateOne({_id: id}, updatedContact, {}, (err) =>{
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      res.redirect('/contactlist');
    });
}

export function ProcessDeletePage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

  // db.contact.remove({"_id: id"})
  Contact.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/contactlist');
  });
}

export function DisplayAddPage(req: Request, res: Response, next: NextFunction): void
{
    // show the add view
    res.render('index', { title: 'Add', page: 'update', clothing: '', displayName: UserDisplayName(req)  });
}

export function ProcessAddPage(req: Request, res: Response, next: NextFunction): void
{
  // instantiate a new Clothing

  /*let newQuestion;
  for(let i=1; i<6; i++)
  {
    newQuestion[i] = new Question
  ({
    "name": req.,
    "brand": req.body.brand,
    "category": req.body.category,
    "colour": req.body.colour,
    "size": req.body.size,
    "price": req.body.price
  });
  }

  let newSurvey = new Survey
  ({"question":[newQuestion]})*/

  // db.clothing.insert({clothing data is here...})
  Clothing.create(newContact, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/clothing-list');
  });
}