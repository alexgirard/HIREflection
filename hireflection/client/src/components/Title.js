import React from "react";
import Select from 'react-select'
import axios from 'axios';

const ranking = [
  {value: 'one', label: '1' },
  { value: 'two', label: '2' },
  { value: 'three', label: '3' },
  { value: 'four', label: '4' },
  { value: 'five', label: '5' },
  { value: 'six', label: '6' },
  { value: 'seven', label: '7' },
  { value: 'eight', label: '8' },
  { value: 'nine', label: '9' },
  { value: 'ten', label: '10' },
]

class Title extends React.Component {
  state={
    rank: null,
    selectedFile: null,
  }
  handleChange = (rank) => {
    this.setState({ rank });
    console.log(`Option selected:`, rank);
  }
  handleFileSelector = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
    console.log(event.target.files);
  }
  handleFileUpload = () => {
    const fd = new FormData();
    fd.append('pdf', this.state.selectedFile, this.state.selectedFile.name);
    /*axios.post(/*url, fd);*/
  }

  render() {
    const { rank } = this.state;
    return (
      <section id="hero">
        <h1>
          <bolded>hire</bolded>flection
        </h1>
        <h4 className="">DESCRIPTION. THIS IS A DESCRIPTION OF OUR PRODUCT.</h4>
        <br/>
        <input type="file" onChange={this.handleFileSelector} placeholder="Upload Resume" multiple />
      </section>
    );
  }
}

export default Title;

/*<button>Upload Resume</button>*/
