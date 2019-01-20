import React, { Component } from "react";
import "./CustomSettings.css";

import { Drawer } from "@material-ui/core";

class CustomSettings extends Component {
  state = {
    speed: this.props.speed,
    rows: this.props.rows,
    cols: this.props.cols
  };
  changeHandler = event => {
    this.setState({ [`${event.target.name}`]: +event.target.value });
  };

  onCloseHandler = () => {
    this.props.change(this.state);
    this.props.onClose();
  };
  render() {
    return (
      <div>
        <Drawer
          anchor="top"
          open={this.props.open}
          onClose={this.onCloseHandler}
        >
        <h2 style={{color:'#000',fontWeight:'500'}}>Custom Settings</h2>
          <div className="wrapper">

            <div className="input-field">
              <label >Speed (current: {this.state.speed})</label>
              <input 
              // value={this.state.speed}
              name="speed"
              type="number"
              onChange={this.changeHandler}
              // placeholder="Speed"
                />
            </div>

            <div className="input-field">
              <label >Columns (current: {this.state.cols})</label>
              <input 
              // value={this.state.speed}
              name="cols"
              type="number"
              onChange={this.changeHandler}
              // placeholder="Speed"
                />
            </div>

            <div className="input-field">
              <label >Columns (current: {this.state.rows})</label>
              <input 
              // value={this.state.speed}
              name="rows"
              type="number"
              onChange={this.changeHandler}
              // placeholder="Speed"
                />
            </div>

          </div>
        </Drawer>
      </div>
    );
  }
}
export default CustomSettings;
