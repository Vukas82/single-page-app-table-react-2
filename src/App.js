import React, { Component } from 'react';
import  data from './data'
import './App.css';
import Table from './Table';

const dataValue = data;



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: dataValue,
      modalIsOpen: false,
    }

  }
   dataValue = data;
  render() {
    return (
      <div className="App">
      <Table data={this.dataValue}
             modalStatus = {this.state.modalIsOpen}
      ></Table>
      </div>
    );
  }
  
}

export default App;
