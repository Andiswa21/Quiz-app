import readlineSync from 'readline-sync';

console.log("welcome to F.R.I.E.N.D.S. quiz");
console.log("\n");

const username = readlineSync.question("Your Name? ");
console.log("\n");
console.log("Welcome to THE QUIZ, " + username + "!");

let score = 0;
let timeLimit = 1; // Time limit per question in seconds

function quiz(question, answer, callback) {
  let answered = false;
  const timeout = setTimeout(() => {
    if (!answered) {
      console.log("Time's up! Moving to the next question.");
      console.log("-------------------");
      callback();  // Move to next question
    }
  }, timeLimit * 1000);

  const userAnswer = readlineSync.question(question);
  answered = true;
  clearTimeout(timeout);

  if (userAnswer.toLowerCase() === answer.toLowerCase()) {
    console.log("Correct!");
    score++;
  } else {
    console.log("Wrong!");
    if (score > 0) score--;  // Prevent negative score
  }
  console.log("Your score is", score);
  console.log("-------------------");

  callback(); // Move to next question after answering
}

// Questions
const questions = [
  { question: "How many Iron Man suits did Tony Stark create in the cinematic universe? ", answer: "85" },
  { question: "Name of Thor's original hammer? ", answer: "Mjolnir" },
  { question: "Where was Mjolnir forged? ", answer: "Nidavellir" },
  { question: "Father of the God of Thunder? ", answer: "Odin" },
  { question: "Who is the god of mischief? ", answer: "Loki" },
  { question: "Did you like the quiz? ", answer: "yes" }
];

// Function to ask each question with a timer
function askQuestion(index) {
  if (index < questions.length ) {
    const currentQ = questions[index];
    quiz(currentQ.question, currentQ.answer, () => askQuestion(index + 1));
  } else {
    console.log("Quiz is finished!");
    console.log("YOUR FINAL SCORE IS: " + score + "/6");
  }
}

// Start the quiz
askQuestion(0);
