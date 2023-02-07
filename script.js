// Declaring variables in global scope.
let currentQuestionIndex = 0;
let timeLeft = 75;

// Allowing access to HTML element ids.
const startButton = document.querySelector('#start-button');
const questionContainer = document.querySelector('#question-Container');
const timerDisplay = document.querySelector('#timeRem');
const highScores = document.querySelector('#scoreVwr');
const closingMessage = document.querySelector('#startFnt');
const scores = JSON.parse(localStorage.getItem('scores')) || [];
const questionFeedback = document.querySelector('#feedback');

// Object to store questions in an array format.
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
      {text: "if (condition) { // code to be executed }", correct: false},
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
    question: "Which of the following is not a way to select an element from the DOM using JavaScript?",
    answers: [
      {text: "document.getElementById('elementId')", correct: false},
      {text: "document.getElementBySelector('elementClass')", correct: true},
      {text: "document.querySelector('elementId')", correct: false},
      {text: "document.querySelectorAll('elementClass')", correct: false}
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

/* The following code can be used to add additional questions to aid studying.
  {
    question: "",
    answers: [
      {text:"", correct: },
      {text:"", correct: },
      {text:"", correct: },
      {text:"", correct: }
    ]
*/
];

// Adding an event listener to the start button.
startButton.addEventListener('click', startGame);

// A function that hides the start button and initiates the 'showQuestions' and 'startTimer' functions.
function startGame () {
  startButton.style.display = 'none';
  showQuestion();
  startTimer();
}

let timerInterval;
// Function that starts and reveals timer.
function startTimer() {
  timerInterval = setInterval(function(){
    timeLeft--;
    timerDisplay.innerText = 'Time left: ' + timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      alert("Time's up!");
      endGame();
    }
  }, 1000);
}

// Displays a multiple-choice question from the questions array. 
// Uses the DOM API to create and manipulate HTML elements, 
// for the question text and button elements for the answer choices.
// Retrieves the current question from the questions array using 
// the index currentQuestionIndex. Sets the innerHTML to a string 
// that represents the HTML for the question and answer buttons.
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

// Function t0 cycle through question index and run 
// the show question function.
function selectAnswer(event) {
  if (currentQuestionIndex === questions.length -1) {
    setTimeout(function() {
      $("#feedback").fadeOut("slow");
      }, 2000);
    endGame();
  } else {
    let selectedAnswer = event.target;
    let isCorrect = selectedAnswer.correct;
    if (!isCorrect) {
      timeLeft -= 10;
      questionFeedback.innerHTML = `<hr /><p>Incorrect!</p>`
    } else {
      questionFeedback.innerHTML = `<hr /><p>Correct!</p>`
    }
    currentQuestionIndex++;
    showQuestion();
  }
}

// Runs once the game is over. Sets score to final time and 
// hides timer display. Shows text using inner HTMl and pops up a form to
// record initials. 
function endGame(){
  clearInterval(timerInterval);
  let finalScore = timeLeft;
  timerDisplay.style.display = 'none';
  questionContainer.innerHTML = `<p>Game Over!</p><br><p>Your final score is: ${finalScore}</p>
<form>
  <br>
  <input type="text" id="initials" placeholder="Enter your Initials">
  <br>
  <button type="submit" id="submit-score">Submit</button>
</form>
<br>
<button id ="refresh-button">Refresh Page</button`;

// Adds a refresh button to begin again.
const refreshButtonEl = document.querySelector('#refresh-button');
refreshButtonEl.addEventListener('click', function(){
  location.reload();
});


  const submitScoreButton = document.querySelector('#submit-score');
  submitScoreButton.addEventListener('click', saveScore);
  function saveScore(event) {
    event.preventDefault();
    var response = "Thank you for playing. Please refresh the page if you wish to test your knowledge again!";
    closingMessage.textContent = response;
    const initials = document.getElementById("initials").value;
    const score = {
      score: finalScore,
      initials: initials
    };

    // Retrieves values stored in local storage
    // parses into object. Pushes score value to userScores array
    // sets user scores array back into local storage as a string, with the key 'scores'.
    // Sets the finalScore value into local storage with the key 'mostRecentScore'.
    // Returns the userScores array.
    const userScores = JSON.parse(localStorage.getItem('scores')) || [];
    userScores.push(score);
    localStorage.setItem('scores', JSON.stringify(userScores));
    localStorage.setItem('mostRecentScore', finalScore);
    return userScores;
  };
}

// Creates a function for toggling the display of 
// the score board.
$('#scoreVwr').on('click', function() {
  $('#score-board').toggle();
});

// Creates an inner HTML element that is updated
// to reflect the values saved to local storage.
function displayScores() {
  let scoreList = document.createElement('ol');
  scores.forEach(score => {
    let scoreItem = document.createElement('li');
    scoreItem.innerText = `${score.initials}: ${score.score}`;
    scoreList.appendChild(scoreItem);
  });
  document.getElementById('score-board').appendChild(scoreList);
}
// Calls the displayScores function.
displayScores();