import React from 'react';
import '../../css/MainPane.css'
import StartPage from './StartPage'
import QuizPage from './QuizPage'
export default class MainPane extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            start: false
        }
    }

    startTest = () => {
        this.setState({ start: true });
    }

    render() {
        let { start } = this.state;
        return (
            <React.Fragment>
                {
                    !start ? <StartPage startTest={this.startTest} /> : <QuizPage />
                }
            </React.Fragment>
        );
    }
}