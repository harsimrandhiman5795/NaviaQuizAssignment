import React from 'react';
import '../../css/MainPane.css'
import { startString } from '../../common/CommonStrings'
import { Button } from 'react-bootstrap';
export default class StartPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    startTest=()=>{
        this.props.startTest();       
    }

    render() {

        return (
            <section className="startPage">
                {startString}
                <br />
                <Button variant="primary" onClick={this.startTest}>Start</Button>
            </section>
        );
    }
}