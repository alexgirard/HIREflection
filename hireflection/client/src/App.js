import React from 'react';

import Title from "./components/Title";
import Results from "./components/Results";
import Footer from "./components/Footer";

class App extends Component {
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
