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
    var response = "Thank you for playing. Please refresh the page if you wish to test your knowledge again!";
    closingMessage.textContent = response;

    const initials = document.getElementById("initials").value;
    const score = {
      score: finalScore,
      initials: initials
    };

    const userScores = JSON.parse(localStorage.getItem('scores')) || [];
    userScores.push(score);
    localStorage.setItem('scores', JSON.stringify(userScores));

    localStorage.setItem('mostRecentScore', finalScore);
  };
}


