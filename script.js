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

const startButton = document.querySelector('#start-button');
const questionContainer = document.querySelector('#question-Container');
const timerDisplay = document.querySelector('#timeRem');

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
  //let questionContainer = document.getElementById('question-container');
  questionContainer.innerHTML = `
    <p>${currentQuestion.question}</p>
    <div id="answer-buttons"></div>
  `;
  currentQuestion.answers.forEach(answer => {
    let button = document.createElement('button');
    button.innerText = answer.text;
    button.addEventListener('click', selectAnswer);
    document.getElementById('answer-buttons').appendChild(button);
  });
}


function selectAnswer() {
if (currentQuestionIndex === questions.length -1) {
  endGame();
} else {
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

}

