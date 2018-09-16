import React from "react";
import Select from 'react-select'
import axios from 'axios';

/*
import Files from "./Files";
*/

const ranking = [
  { value: 'one', label: '1' },
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

var isFiles;
var names = ['Alex', 'Angelo'];
var i = 0;
var files;
var length;

class Title extends React.Component {



  state = {
    rank: null,
    selectedFile: null,
    files2: [],
  }
  handleChange = (rank) => {
    this.setState({ rank });
    console.log(`Option selected:`, rank);
  }
  handleFileSelector = (event) => {
    this.setState({
      selectedFile: event.target.files
    })
    files=event.target.files;
    if (event.target.files.length > 0) isFiles = true;
    console.log(event.target.files);
    console.log(files);
    length = event.target.files.length;
    console.log(length);
    console.log(files.name);
  }

  handleFileUpload = () => {
    const fd = new FormData();
    fd.append('pdf', this.state.selectedFile, this.state.selectedFile.name);
    console.log(`hi`, this.state.selectedFile);
    /*axios.post(/*url, fd);*/
  }
  handleRankChange(event) {
    this.setState({value: event.target.value});
  }

  handleChange = (rank) => {
    this.setState({ rank });
    console.log(`rank:`, rank);
  }

  render() {
    const { rank } = this.state;
    const { selectedFile } = this.state;
    return (
      <section id="hero">
        <h1>
          <bolded>hire</bolded>flection
        </h1>
        <h4 className="">DESCRIPTION. THIS IS A DESCRIPTION OF OUR PRODUCT.</h4>
        <br/>
        <input type="file" onChange={this.handleFileSelector} placeholder="Upload Resume" />
        <br/>

        <div className="col-sm-12">
          <div className="col-sm-4">
          </div>
          <div className="col-sm-4">
            <Select
              isMulti
              name="rank"
              placeholder="Ranking"
              className="basic-multi-select"
              classNamePrefix="select"
              value={rank}
              options={ranking}
              onChange={this.handleRank}
            />
          </div>
          <div className="col-sm-4">
          </div>
        </div>

      </section>
    );
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({
        response: {
          express: res.express,
        }
      }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

}

export default Title;

/*<Files selectedFile= {this.state.selectedFile} />*/
