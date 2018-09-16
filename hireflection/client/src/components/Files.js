import React from "react";

class Files extends React.Component {
  render() {
    for(i=0; i<this.props.selectedFile.length; i++){
      return (
        <div className="col-sm-12">
          <div align="right" className="col-sm-6">
            <ul>
              {this.props.selectedFile.length !== null &&
                this.props.selectedFile[i]}
            </ul>
          </div>
          <div align="left" className="col-sm-6">
            <ul>

            </ul>
          </div>
        </div>
      );
  }
}

export default Files;

/*
{ selectedFile && names.map(function(name){
    return <li>Rank: &nbsp;
      <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
    </li>;
})}
*/
