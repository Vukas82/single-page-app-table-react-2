import React, { Component } from 'react';
import  data from './data'
import './App.css';
import Table from './Table';

const dataValue = data;



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: dataValue
    }

  }
   dataValue = data;
  
  render() {
    return (
      <div className="App">
      <Table data={this.dataValue}
      ></Table>
      </div>
    );
  }
  
}

export default App;
