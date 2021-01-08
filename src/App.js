
import React, { Component } from 'react';
import NaviaFooter from "./components/NaviaFooter";
import NaviaHeader from "./components/NaviaHeader";
import MainPane from "./components/MainPane/MainPane";
import './css/HFcss.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NaviaHeader />

        <MainPane />
        <NaviaFooter />
      </div>
    );
  }
}

export default App;
