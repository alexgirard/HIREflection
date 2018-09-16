import React from "react";
import Select from 'react-select'
import Charts from "./Charts"
import Charts2 from "./Charts2";
import Charts3 from "./Charts3";

const options = [
  { value: 'groupCompare', label: 'Group Comparison' },
  { value: 'wordDistribution', label: 'Word Distribution' }
]

const groupOptions = [
  {value: 'ten', label: '10' },
  {value: 'twenty', label: '20'},
  {value: 'thirty', label: '30'},
  {value: 'fourty', label: '40'},
  {value: 'fifty', label: '50'},
  {value: 'sixty', label: '60'},
  {value: 'seventy', label: '70'},
  {value: 'eighty', label: '80'},
  {value: 'ninety', label: '90'},
  {value: 'hundred', label: '100'},
]

var type = undefined;
var opt = undefined;
var boolLow1 = undefined;
var boolLow2 = undefined;
var boolHigh1 = undefined;
var boolHigh2 = undefined;
var boolSearch = undefined;

class Results extends React.Component {
  state={
    selectedOption: null,
    selectedOption2: null,
    low1: null,
    low2: null,
    high1: null,
    high2: null,
    search: null,
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    if (selectedOption.value === 'groupCompare') type = true;
    else type = false;
    console.log(`Option selected:`, selectedOption);
  }
  handleChange2 = (selectedOption2) => {
    this.setState({ selectedOption2 });
    if (selectedOption2.value === 'one') opt = true;
    else opt = false;
    console.log(`Option selected:`, selectedOption2);
  }

  handleLow1 = (low1) => {
    this.setState({ low1 });
    if (low1.length > 0) boolLow1=true; else boolLow1 = false;
    console.log(`Low1:`, low1);
  }
  handleLow2 = (low2) => {
    this.setState({ low2 });
    if (low2.length > 0) boolLow2=true; else boolLow2 = false;
    console.log(`Low2:`, low2);
  }
  handleHigh1 = (High1) => {
    this.setState({ High1 });
    if (High1.length > 0) boolHigh1=true; else boolHigh1 = false;
    console.log(`High1:`, High1);
  }
  handleHigh2 = (High2) => {
    this.setState({ High2 });
    if (High2.length > 0) boolHigh2=true; else boolHigh2 = false;
    console.log(`High2:`, High2);
    console.log(`boolHigh2:`, boolHigh2);
  }

  handleSearchChange  = ( search ) => {
    this.setState({ search });
    if (this.search === 'firebase') boolSearch = true; else boolSearch = false;
  }

  render() {
    const { selectedOption } = this.state;
    const { selectedOption2 } = this.state;
    const { low1 } = this.setState;
    const { low2 } = this.setState;
    const { high1 } = this.setState;
    const { high2 } = this.setState;
    const { search } = this.setState;

    return (
      <div>
        <div className="break">
          <hr/>
        </div>
        <section id="results">
          <div className="container">
            <div className="container">
              <div className="col-sm-12">
                <Select
                  value={selectedOption}
                  placeholder="Data Organization"
                  onChange={this.handleChange}
                  options={options}
                />
                <br/>
              </div>

              { type &&
                <div>
                  <div>
                    <div className="col-sm-4">
                      <p align="right">Group 1:</p>
                    </div>
                    <div className="col-sm-3">
                      <Select
                        isMulti
                        name="low"
                        placeholder="Low Range"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={low1}
                        options={groupOptions}
                        onChange={this.handleLow1}
                      />
                    </div>
                    <div className="col-sm-3">
                      <Select
                        isMulti
                        name="high"
                        placeholder="High Range"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={high1}
                        options={groupOptions}
                        onChange={this.handleHigh1}
                      />
                      <br/>
                    </div>
                  </div>
                  <div>
                    <div className="col-sm-4">
                      <p align="right">Group 2:</p>
                    </div>
                    <div className="col-sm-3">
                      <Select
                        isMulti
                        name="low"
                        placeholder="Low Range"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={low2}
                        options={groupOptions}
                        onChange={this.handleLow2}
                      />
                    </div>
                    <div className="col-sm-3">
                      <Select
                        isMulti
                        name="high"
                        placeholder="High Range"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={high2}
                        options={groupOptions}
                        onChange={this.handleHigh2}
                      />
                    </div>
                    <br/>
                  </div>
                </div>
              }

              { (type===false) &&
                <div className="col-sm-12">
                  <div className="col-sm-3">
                  </div>
                  <div className="col-sm-3">
                    <input id="border" type="text" name="word" placeholder="Word"/>
                  </div>
                  <div className="col-sm-3">
                    <button className="buttonSubmit" onClick={this.handleSearchChange}>Submit</button>
                  </div>
                </div>
              }

              { (boolSearch===false) && (type===false) &&
                <div id="chartSingle" className="col-sm-12">
                  <Charts2 />
                </div>
              }


              { boolLow1 && boolLow2 && boolHigh1 && boolHigh2 &&
                <div id="chartDouble" className="col-sm-12">
                  <div className="col-sm-6">
                    <Charts3 />
                  </div>
                  <div className="col-sm-6">
                    <Charts />
                  </div>
                </div>
              }
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Results;

/*
<Select
  value={selectedOption2}
  placeholder={}
  onChange={this.handleChange2}
  options={groupOptions}
/>
*/
