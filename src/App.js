import React, { Component } from 'react';
import './App.css';
// import jquery from 'jquery';
import _ from 'lodash';


/* I was unable to get the jQuery .getJson call to work. I kept getting a 404 error and I am not sure what was causing.
  I decided for the sake of this challenge to simply require the data instead.
  When the component mounts, I set the data on the state to an array I created from the imported data.
  I used the lodash _.chunk method to break the data array into smaller chunks to render as the user scrolls.
  When the condition is met that the UI is scolled within 500 px of the body offset height, then it fires the renderRow function to render the next chunk of data.

  I was rendering the app well at 10000, but was having issues with the 1000000. 
  I think the solution to this is to send alternate HTTP requests getting chunks at a time instead of requesting the entire data collection in one call.
  *
  * 
  *
*/
const data = require('./data/data_10000.json');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      chunk: 0,
      rows: []
    };
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount(){
    window.addEventListener('scroll', this.onScroll, false);
    const { rows } = data;
    const dataChunked = _.chunk(rows, 100);
    this.setState({
      data: dataChunked,
      dataLength: dataChunked.length,
      rows: [this.renderRow(dataChunked[this.state.chunk])],
      chunk: this.state.chunk + 1,
      completedResults: false
    });
  }

  // Remove the scroll event listener when the component unmounts
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)) {
      // console.log("this state chunk", this.state.chunk); logging the chunk to see which chunk is loading
      if(this.state.chunk === this.state.dataLength) return false;
        this.setState({
          rows: [...this.state.rows, this.renderRow(this.state.data[this.state.chunk])],
          chunk: this.state.chunk + 1
        });
        console.log(this.state.chunk, this.state.dataLength);
    }
  }

  renderRow = (chunk) => {
    let nextRow = chunk.map(row => <tr key={row.id}><td>{row.id}</td><td>{row.duration}</td></tr>);
    return nextRow;
  }


  render() {
    // jquery.getJSON('./data/data_1000.json?callback=').done(function (data){
    //   data = JSON.stringify(data);
    //   console.log(data);
    // })
    return <div className="App">
        <header className="App-header">
          <h1 className="App-title">Request Performance</h1>
        </header>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Duration</td>
            </tr>
          </thead>
          <tbody>{this.state.rows}</tbody>
        </table>
      </div>;
  }
}

export default App;
