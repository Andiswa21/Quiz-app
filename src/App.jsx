import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./Question";
import qBank from "./QuestionBank";
import Score from "./Score";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionBank: qBank,
            currentQuestion: 0,
            selectedOption: "",
            score: 0,
            quizEnd: false,
            questionTime: 10, // 10 seconds for each question
            totalQuizTime: 60, // 60 seconds for the entire quiz
        };
        this.questionTimer = null;
        this.totalQuizTimer = null;
    }

    componentDidMount() {
        this.startTimers();
    }

    componentWillUnmount() {
        this.clearTimers();
    }

    startTimers = () => {
        // Start countdown for the total quiz
        this.totalQuizTimer = setInterval(() => {
            if (this.state.totalQuizTime > 0) {
                this.setState((prevState) => ({
                    totalQuizTime: prevState.totalQuizTime - 1,
                }));
            } else {
                this.endQuiz();
            }
        }, 1000);

        // Start countdown for the current question
        this.questionTimer = setInterval(() => {
            if (this.state.questionTime > 0) {
                this.setState((prevState) => ({
                    questionTime: prevState.questionTime - 1,
                }));
            } else {
                this.handleNextQuestion();
            }
        }, 1000);
    };

    clearTimers = () => {
        clearInterval(this.questionTimer);
        clearInterval(this.totalQuizTimer);
    };

    handleOptionChange = (e) => {
        this.setState({ selectedOption: e.target.value });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.checkAnswer();
        this.handleNextQuestion();
    };

    checkAnswer = () => {
        const { questionBank, currentQuestion, selectedOption } = this.state;
        if (selectedOption === questionBank[currentQuestion].answer) {
            this.setState((prevState) => ({ score: prevState.score + 1 }));
        }
    };

    handleNextQuestion = () => {
        const { questionBank, currentQuestion } = this.state;

        if (currentQuestion + 1 < questionBank.length) {
            this.setState({
                currentQuestion: currentQuestion + 1,
                selectedOption: "",
                questionTime: 10, // Reset question timer
            });
        } else {
            this.endQuiz();
        }
    };

    endQuiz = () => {
        this.clearTimers();
        this.setState({ quizEnd: true });
    };

    restartQuiz = () => {
        this.setState({
            currentQuestion: 0,
            selectedOption: "",
            score: 0,
            quizEnd: false,
            questionTime: 10,
            totalQuizTime: 60,
        });
        this.startTimers(); // Restart timers
    };

    render() {
        const { questionBank, currentQuestion, selectedOption, score, quizEnd, questionTime, totalQuizTime } =
            this.state;
        return (
            <div className="App d-flex justify-content-center align-items-center vh-100 mx-4 ">
                <div className="card text-center p-4 " style={{ width: "400px", backgroundColor: "white"}}>
                    <h1 className="app-title">QUIZ APP</h1>
                    <div className="timers mb-3">
                        <h5>Time Left (Quiz): {totalQuizTime} sec</h5>
                        <h5>Time Left (Question): {questionTime} sec</h5>
                    </div>
                    {!quizEnd ? (
                        <Question
                            question={questionBank[currentQuestion]}
                            selectedOption={selectedOption}
                            onOptionChange={this.handleOptionChange}
                            onSubmit={this.handleFormSubmit}
                        />
                    ) : (
                        <div>
                            <Score score={score} />
                            <button className="btn btn-secondary mt-3" onClick={this.restartQuiz}>
                                Restart Quiz
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default App;
