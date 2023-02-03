// 
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
   


// An array object with the questions for the quiz stored in it.
const quizData = [
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
//let currentQuestion = 0;
var timer;
var timeLeft = 75;

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











