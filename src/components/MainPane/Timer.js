import React from 'react';
import {timerSeconds} from "../../common/CommonStrings";

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: {}, seconds: timerSeconds };
        this.timer=0;
    }

    componentDidMount = () => {
        this.props.setRef(this);
        this.startTimer();
    }

    omponentWillUnmount = () => {
        this.props.setRef(undefined);
    }

    secondsToTime = (secs) => {
        let seconds = Math.ceil(secs);
        let obj = {
            "s": seconds
        };
        return obj;
    }

    startTimer = () => {
        this.timer=0;
        let timeLeftVar = this.secondsToTime(timerSeconds);
        this.setState({ time: timeLeftVar, seconds: timerSeconds });
        this.timer = setInterval(this.countDown, 1000);
        console.log(this.timer);
    }

    countDown = () => {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });
        if (seconds === 0) { 
            this.props.skipQuestion();
          }
    }

    stopTimer=()=>{
        clearInterval(this.timer);
    }

    render() {
        return (
            <div>
               {this.state.time.s} Seconds left
            </div>
        );
    }
}

