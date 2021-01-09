import React from 'react';
import '../../css/MainPane.css'
import { questions, statusOptions } from '../../common/Question'
import { Button, Table } from 'react-bootstrap';
import Timer from "../MainPane/Timer"

export default class QuizPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            showScore: false,
            currentQuestion: {
                answer: '',
                questionNum: 0
            }
        }
    }

    setCurrentQuestion = (nextQuestion) => {
        let { currentQuestion } = this.state;
        this.setState({ currentQuestion: { ...currentQuestion, questionNum: nextQuestion, answer: '' } });
        this.timerRef.startTimer();
    }

    setShowScore = (showScore) => {
        this.setState({ showScore: showScore });
    }

    setScore = (score) => {
        this.setState({ score });
    }

    setQuestionStatus = (status) => {
        questions[this.state.currentQuestion.questionNum].status = status;
    }

    nextQuestion = () => {
        let { currentQuestion, score } = this.state;
        if (currentQuestion.answer.length > 0) {
            let answers = questions[currentQuestion.questionNum].answerOptions;
            let correctAnswer = answers.find(ans => ans.isCorrect === true).answerText;
            if (currentQuestion.answer === correctAnswer) { this.setScore(score + 1); this.setQuestionStatus(statusOptions.right); }
            else {
                this.setQuestionStatus(statusOptions.wrong);
            }
            if (currentQuestion.questionNum < questions.length - 1)
                this.setCurrentQuestion(currentQuestion.questionNum + 1)
            else
                this.setShowScore(true);
        }
    }

    handleOptionChange = (e) => {
        let { currentQuestion } = this.state;
        this.setState({ currentQuestion: { ...currentQuestion, answer: e.target.value } })
    }

    skipQuestion = () => {
        this.timerRef.stopTimer();
        let { currentQuestion } = this.state;
        if (currentQuestion.questionNum < questions.length - 1) {
            this.setCurrentQuestion(currentQuestion.questionNum + 1);
        }
        else
            this.setShowScore(true);
    }

    getQuizSummary = () => {
        let rows = [];
        questions.forEach((question, i) => {
            rows.push(<tr key={'Question' + i}>
                <td>
                    {'Question ' + i+1}
                </td>
                <td>
                    {question.status}
                </td>
            </tr>)
        })
        return rows;
    }

    render() {
        let { currentQuestion, score, showScore } = this.state;
        return (
            <section >
                <React.Fragment>
                    < section className="questionPane">
                        {
                            showScore ?
                                <div className='score-section'>
                                    You scored {score} out of {questions.length}
                                </div>
                                :
                                <section>
                                    <div className='question-section'>
                                        <div className='question-count'>
                                            <span>Question {currentQuestion.questionNum + 1}</span>/{questions.length}
                                        </div>
                                        <div className='question-text'>{questions[currentQuestion.questionNum].questionText}</div>
                                    </div>
                                    <div className='answer-section'>
                                        {questions[currentQuestion.questionNum].answerOptions.map((answerOption) => (
                                            <div key={answerOption.answerText} onChange={this.handleOptionChange.bind(this)}>
                                                <input type="radio" value={answerOption.answerText} name={'answers' + currentQuestion} id={answerOption.answerText} />
                                                <span >{answerOption.answerText}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                        }
                    </section>
                    <section className="extras">
                        <section className="timerPane">
                            {!showScore ?
                                <Timer
                                    setRef={(ref) => this.timerRef = ref}
                                    skipQuestion={this.skipQuestion} /> :
                                <div></div>
                            }
                        </section>
                        <section className="summryPane">
                            <Table striped bordered>
                                <thead>
                                    <tr>
                                        <th>
                                            Question
                                        </th>
                                        <th>
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <thead>
                                </thead>
                                <tbody>
                                    {
                                        this.getQuizSummary()
                                    }
                                </tbody>
                            </Table>
                        </section>
                    </section>
                    {!showScore ?
                        <section className="controllerPane">
                            <Button variant="secondary" onClick={this.skipQuestion}>Skip</Button>{' '}
                            <Button variant="primary" onClick={this.nextQuestion}>
                                {(currentQuestion.questionNum < questions.length - 1) ?
                                    'Submit' : 'Submit and Finish'}
                            </Button>
                        </section>
                        :
                        <div></div>
                    }
                </React.Fragment>
            </section >
        );
    }
}
