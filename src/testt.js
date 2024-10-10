// // Initialize the counter
// let counter = 0;

// // Set an interval to run every 1 second (1000 milliseconds)
// const intervalId = setInterval(() => {
//   counter++; // Increment the counter
//   console.log("Hi"); // Say "Hi" every second

//   // Check if the counter has reached 5
//   if (counter === 5) {
//     console.log("Time out");
//     clearInterval(intervalId); // Stop the interval
//   }
// }, 1000); // 1000 milliseconds = 1 second

import mr from 'readline'

const rl = mr.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [
  "What is 2 + 2? ",
  "What is the capital of France? ",
  "What is the color of the sky on a clear day? "
];

let currentQuestion = 0;
let timeout;

const askQuestion = () => {
  if (currentQuestion < questions.length) {
    console.log(questions[currentQuestion]);

    // Set a timeout for 2 seconds
    timeout = setTimeout(() => {
      console.log("Time's up!");
      currentQuestion++;
      askQuestion(); // Move to the next question
    }, 6000);

    // Capture user input
    rl.question("Your answer: ", (answer) => {
      clearTimeout(timeout); // Clear the timeout if answered in time
      console.log(`You answered: ${answer}`);
      currentQuestion++;
      askQuestion(); // Move to the next question
    });
  } else {
    console.log("All questions answered!");
    rl.close();
  }
};

// Start the interval to say "Hi" every second
const intervalId = setInterval(() => {
  console.log("Hi");
}, 1000);

// Start asking questions
askQuestion();

// End the program after 5 seconds
setTimeout(() => {
  clearInterval(intervalId);
  console.log("Time out");
  rl.close();
}, 5000);
