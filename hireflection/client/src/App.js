import React from 'react';
import scrollToComponent from 'react-scroll-to-component';

import Title from "./components/Title";
import Results from "./components/Results";
import Footer from "./components/Footer";

class App extends React.Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));

    scrollToComponent(this.Blue, { offset: 0, align: 'middle', duration: 1000, ease:'inCirc'});
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render(){
    return(
      <div>
        <Title />
        <button onClick={() => scrollToComponent(this.Blue, {  align: 'middle', duration: 1500, ease:'inCirc'})}>\/</button>
        <Results />
        <div className='blue' ref={(section) => { this.Blue = section; }}></div>
        <Footer />
        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default App;

/*
import React from 'react';

import Title from "./components/Title";
import Results from "./components/Results";
import Footer from "./components/Footer";


class App extends React.Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render(){
    return(
      <div>
        <Title />
        <Results />
        <Footer />
        <p>{this.state.response}</p>
      </div>
    );
  }
};

export default App;
*/
