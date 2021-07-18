var totalQuestions = 0;

function handleDisplayQuestions() {
  var questionContainer = document.getElementById("create-question");
  var newQuestion = document.createElement("div");
  newQuestion.setAttribute("class", "question-container");
  newQuestion.setAttribute("id", `question-${totalQuestions}`);
  newQuestion.innerHTML = `<h2 class='question-number'>Q${totalQuestions}</h2><input class='question-box' name="questonTitle"/><select name='surveyQuestionType' id='surveyType'><option value='Survey Category'>Question Type</option><option value='Multiple-Choice'>Multiple Choice</option><option value='Radio-Buttons'>Radio Buttons</option> <option value='Text-Box'>Text Box</option> <option value='Star-Rating'>Star Rating</option></select>`;
  questionContainer.appendChild(newQuestion);

  totalQuestions++;
}

// let questionContainer = document.getElementById("create-question");
//     let newQuestion = `<div class='question-container' id=${i}> <h2 class='question-number'>Q${i}</h2><input class='question-box'/><select name='surveyType' id='cars'><option value='Survey Category'>Question Type</option><option value='Community or volunteer Feedback'>Multiple Choice</option><option value='Customer Feedback'>Radio Buttons</option> <option value='Concept Production'>Text Box</option> <option value='Employee Engagement'>Star Rating</option></select></div>`;
//     questionContainer.innerHTML = newQuestion;
//     questionContainer.append(newQuestion);
