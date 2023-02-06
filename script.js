/*
const startButton = document.querySelector('#startBtn');
const questionEl = document.querySelector('#questions');
const choicesEl = document.querySelector('choices');
const quizEl = document.querySelector('quizSpace');
const remainingTime = document.querySelector('#timeRem');
const result = document.querySelector('#result');


startButton.addEventListener("click", function() {
    //console.log("this is detecting my click");
  });

  // Adds the quiz functionality

  function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionEl.textContent = currentQuizData.question;
    choicesEl.innerHTML = '';
    currentQuizData.choices.forEach(choice => {
      const choiceEl = document.createElement('li');
      choiceEl.textContent = choice;
      choiceEl.addEventListener('click', selectAnswer);
      choicesEl.appendChild(choiceEl);
    });
  }
  
  function selectAnswer(event) {
    const selectedChoice = event.target;
    const correctAnswer = quizData[currentQuestion].correctAnswer;
    if (selectedChoice.textContent === correctAnswer) {
      result.textContent = "Correct!";
    //else {
        //result.textContent = "Incorrect!";
    };
  }
   

let currentQuestionIndex = 0
// An array object with the questions for the quiz stored in it.
let questions = [
    { //Question 1
        question: "How do you create a hyperlink in HTML?",
        //choices: ["<a>link</a>", "<link>a</link>" "<hyperlink>a</hyperlink>", <"a href=''></a>"],
        correctAnswer: "a href=''></a>"
    },
    { //Question 2
        question: "What does the CSS box model include?",
        choices: ["Content", "Padding", "Border", "All of the above"],
        correctAnswer: "All of the above"
    },
    
    { //Question 3
        question: "What is the syntax for an if-else statement in JavaScript?",
        choices: ["if (condition) {do something}", "if condition {do something}", "if (condition) {do something} else {do something}", "if condition do something"],
        correctAnswer: "if (condition) {do something}"
    },
    { //Question 4
        question: "What is the difference between null and undefined in JavaScript",
        choices: ["Null is explicitly set by the programmer, undefined means a value has not been assigned", "There is no difference, they can be used interchangeably", "Null means a value has not been assigned, undefined is explicitly set by the programmer", "Undefined is for variables, null is for objects"],
        correctAnswer: "Null is explicitly set by the programmer, undefined means a value has not been assigned"
    },
    { //Question 5
        question: "What is the purpose of a framework in web development?",
        choices: ["To make development easier and more organized", "To provide pre-written code for common tasks", "To make the code faster", "All of the above"],
        correctAnswer: "All of the above"
    },
    { //Question 6
        question: "What is the Document Object Model (DOM)?",
        choices: ["A way of representing and interacting with HTML and XML documents as objects in a programming language", "A database of all website elements and their properties", "A set of methods for manipulating and styling elements in a web page", "A file format for storing web page data"],
        correctAnswer: "A way of representing and interacting with HTML and XML documents as objects in a programming language"
    },
];
    /*
    { //Question 7
        question: "What is the purpose of the quearySelector() method in the DOM?",
        choices: [],
        correctAnswer: 
    },
    {  //Question 8
        question: "How do you dynamically change the text of an element in the DOM using JavaScript?",
        choices: [],
        correctAnswer: 
    },
    { //Question 9
        question: "How do you convert a JSON string to a JavaScript object?",
        choices: [],
        correctAnswer: 
    },
    { //Question 10
        question: "How do you attach an event listener to a DOM element in JavaScript?",
        choices: ["By using the onclick property", "By using the addEventListener() method", "By using the bind() method", "By using the attachEvent() method"],
        correctAnswer: "By using the addEventListener() method"
    },

    //Space to add more questions if desired.
    ];
*/

/*
//let currentQuestion = 0;
var timer;
var timeLeft = 75; //this can be modified later

startButton.addEventListener("click", start); //this event listener is working

function start() {
    timer = setInterval(updateTimer, 1000);
    updateTimer();
}

function updateTimer() {
    timeLeft = timeLeft - 1;
    if(timeLeft >= 0)
      $('#timeRem').html(timeLeft);
    else {
      gameOver();
    }
  }

function gameOver() {
    clearInterval(timer);
}

*/

let currentQuestionIndex = 0;
let timeLeft = 75;
let timerInterval;

const startButton = document.querySelector('#start-button');
const questionContainer = document.querySelector('#question-Container');
const timerDisplay = document.querySelector('#timeRem');
const highScores = document.querySelector('#scoreVwr');
const closingMessage = document.querySelector('#startFnt');

let questions = [ 
  {
    question: "How do you declare a variable in JavaScript?",
    answers: [
      {text: "var variableName", correct: true},
      {text: "variable variableName", correct: false},
      {text: "const variableName", correct: false},
      {text: "let variableName", correct: false}
    ]
  },
  {
    question: "What is the syntax for an if-else statement in JavaScript?",
    answers: [
      {text: "if(condition) { // code to be executed }", correct: false},
      {text: "if condition { // code to be executed }", correct: false},
      {text: "if (condition) { // code to be executed } else { // code to be executed }", correct: true},
      {text: "if: condition { // code to be executed }", correct: false}
    ]
  },
  {
    question: "What is the difference between let and var in JavaScript?",
    answers: [
      {text: "var is function scoped, let is block scoped", correct: false},
      {text: "let is block scoped, var is function scoped", correct: true},
      {text: "var and let are the same, they are both function scoped", correct: false},
      {text: "var and let are the same, they are both block scoped", correct: false}
    ]
  },
  {
    question: "How do you select an element from the DOM using JavaScript?",
    answers: [
      {text: "document.getElementById('elementId')", correct: true},
      {text: "document.getElementByClass('elementClass')", correct: false},
      {text: "document.querySelector('elementId')", correct: true},
      {text: "document.querySelectorAll('elementClass')", correct: true}
    ]
  },
  {
    question: "What is the difference between null and undefined in JavaScript?",
    answers: [
      {text:"Null is explicitly set by the programmer, undefined means a value has not been assigned", correct: true},
      {text:"There is no difference, they can be used interchangeably", correct: false},
      {text:"Null means a value has not been assigned, undefined is explicitly set by the programmer", correct: false},
      {text:"Undefined is for variables, null is for objects", correct: false}
    ]
  },
];

startButton.addEventListener('click', startGame);

function startGame () {
  startButton.style.display = 'none';
  showQuestion();
  startTimer();
}

function showQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  questionContainer.innerHTML = `
    <p>${currentQuestion.question}</p>
    <div id="answer-buttons"></div>
  `;
  currentQuestion.answers.forEach(answer => {
    let button = document.createElement('button');
    button.innerText = answer.text;
    button.addEventListener('click', selectAnswer);
    button.correct = answer.correct;
    let answerButtons = document.getElementById('answer-buttons');
    button.classList.add("answer-button");
    answerButtons.appendChild(button);
    answerButtons.appendChild(document.createElement('br'));
  });
}


//questions.length = 5
function selectAnswer() {
  if (currentQuestionIndex === questions.length -1) {
    endGame();
  } else {
    let selectedAnswer = event.target;
    let isCorrect = selectedAnswer.correct;
    if (!isCorrect) {
      timeLeft -= 10;
    }
    currentQuestionIndex++;
    showQuestion();
  }
}

function startTimer() {
  let timerInterval = setInterval(function(){
    timeLeft--;
    timerDisplay.innerText = 'Time left: ' + timeLeft + ' seconds';
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function endGame(){
  clearInterval(timerInterval);
  let finalScore = timeLeft;
  timerDisplay.style.display = 'none';
  questionContainer.innerHTML = `<p>Game Over</p><p>Your final score is: ${finalScore}</p>
  <form>
    <input type="text" id="initials" placeholder="Enter your Initials">
    <button type="submit" id="submit-score">Submit</button>
  </form>`;
  const submitScoreButton = document.querySelector('#submit-score');
  submitScoreButton.addEventListener('click', saveScore);
  function saveScore(event) {
    event.preventDefault();

    var initials = document.getElementById("initials").value;
    var userScore = initials + finalScore; 

    var response = "Thank you for playing. Please refresh the page if you wish to test your knowledge again!";
    closingMessage.textContent = response;

    localStorage.setItem('initials', userScore); 

  }
  //return finalScore;
}

/*
function showQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  //let questionContainer = document.getElementById('question-container');
  questionContainer.innerHTML = `
    <p>${currentQuestion.question}</p>
    <div id="answer-buttons"></div>
  `;
  currentQuestion.answers.forEach(answer => {
    let button = document.createElement('button');
    button.innerText = answer.text;
    button.addEventListener('click', selectAnswer);
    button.correct = answer.correct;
    document.getElementById('answer-buttons').appendChild(button);
  });
} */




/*
function saveScore(event) {
  event.preventDefault();
  let initials = document.querySelector('#initials').value;
  let scoreObject = {
    [initials]: finalScore
  };
  let currentScores = JSON.parse(localStorage.getItem('highScores')) || [];
  currentScores.push(scoreObject);
  localStorage.setItem('highScores', JSON.stringify(currentScores));
}
*/


/*
  const form = document.createElement('form');
  const formInput = document.createElement('input');
  const submitButton = document.createElement('button');
  
  formInput.setAttribute('type', 'text');
  formInput.setAttribute('placeholder', 'Enter Initials');
  submitButton.innerText = 'Submit';
  submitButton.setAttribute('type', 'submit');
  
  form.appendChild(formInput);
  form.appendChild(submitButton);
  closingForm.appendChild(form);
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const initials = formInput.value;
    const highScore = {
      initials,
      score: finalScore
    };
    let scores = JSON.parse(localStorage.getItem('saveScore')) || [];
    scores.push(highScore);
    localStorage.setItem('saveScore', JSON.stringify(scores));
    showHighScores();
  });
  */




// Retrieves the "saveScore" value from local storage 
//and converts it to an array if it exists, or creates 
//an empty array if it doesn't. Then, pushes an object 
//with initials and score properties to the "saveScore" array, 
//sorts it by the score in descending order, and retains only the top 5 elements. 
//Finally, updates the "highScore" key in local storage 
//with the updated "saveScore" array as a string.

/*

let highScore;
if (localStorage.getItem('highScore')) {
  highScore = JSON.parse(localStorage.getItem('highScore'));
} else {
  highScore = [];
}
highScore.push({initials: 'AAA', score: finalScore});
highScore.sort((a, b) => b.score - a.score);
highScore = highScore.slice(0, 5);
localStorage.setItem('highScore', JSON.stringify(highScore));
};
*/


