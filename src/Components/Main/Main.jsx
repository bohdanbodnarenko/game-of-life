import React from "react";

import Grid from "../Grid/Grid";
import Toolbar from "../Toolbar/Toolbar";
import CustomSettings from "../CustomSettings/CustomSettings";

class Main extends React.Component {
  initialState = {
    speed: 100,
    rows: 40,
    cols: 50
  };
  state = {
    speed: this.initialState.speed,
    rows: this.initialState.rows,
    cols: this.initialState.cols,
    isPlaying: true,
    isModalOpen: false,
    generation: 0,
    gridFull: Array(this.initialState.rows)
      .fill()
      .map(() => Array(this.initialState.cols).fill(false))
  };

  selectBox = (row, col) => {
    let { gridFull } = this.state;
    gridFull[row][col] = !gridFull[row][col];
    this.setState({
      gridFull
    });
  };

  randomize = () => {
    let { gridFull } = this.state;
    for (let i = 0; i < this.state.rows; i++) {
      for (let j = 0; j < this.state.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridFull[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull
    });
  };

  playHandle = speed => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, speed);
    this.setState({ speed, isPlaying: true });
  };

  pauseHandle = () => {
    clearInterval(this.intervalId);
    this.setState({ ...this.state, isPlaying: false });
  };

  slow = () => {
    this.playHandle(1000);
  };

  fast = () => {
    this.playHandle(100);
  };

  clear = () => {
    let grid = Array(this.state.rows)
      .fill()
      .map(() => Array(this.state.cols).fill(false));
    this.setState({
      gridFull: grid,
      generation: 0
    });
  };

  play = () => {
    let stateGrid = this.state.gridFull;
    let { gridFull } = this.state;
    for (let i = 0; i < this.state.rows; i++) {
      for (let j = 0; j < this.state.cols; j++) {
        let count = 0;
        if (i > 0) if (stateGrid[i - 1][j]) count++;
        if (i > 0 && j > 0) if (stateGrid[i - 1][j - 1]) count++;
        if (i > 0 && j < this.state.cols - 1)
          if (stateGrid[i - 1][j + 1]) count++;
        if (j < this.state.cols - 1) if (stateGrid[i][j + 1]) count++;
        if (j > 0) if (stateGrid[i][j - 1]) count++;
        if (i < this.state.rows - 1) if (stateGrid[i + 1][j]) count++;
        if (i < this.state.rows - 1 && j > 0)
          if (stateGrid[i + 1][j - 1]) count++;
        if (i < this.state.rows - 1 && j < this.state.cols - 1)
          if (stateGrid[i + 1][j + 1]) count++;
        if (stateGrid[i][j] && (count < 2 || count > 3)) gridFull[i][j] = false;
        if (!stateGrid[i][j] && count === 3) gridFull[i][j] = true;
      }
    }
    this.setState({
      gridFull: gridFull,
      generation: this.state.generation + 1
    });
  };

  toggleModal = () => {
    if (!this.state.isModalOpen) {
      this.pauseHandle();
    }
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  componentDidMount() {
    this.randomize();
    this.playHandle();
    this.setState({ speed: this.initialState.speed });
  }

  changeStateHandler = newState => {
    this.setState({ ...this.state, ...newState });
    this.playHandle(newState.speed);
  };

  render() {
    return (
      <div>
        <CustomSettings
          speed={this.state.speed}
          rows={this.state.rows}
          cols={this.state.cols}
          change={this.changeStateHandler}
          open={this.state.isModalOpen}
          onClose={this.toggleModal}
        />
        ><h1 style={{ fontWeight: "bold" }}>The Game of Life</h1>
        <Toolbar
          isPlaying={this.state.isPlaying}
          playButton={() => {
            this.playHandle(this.state.speed);
          }}
          pauseButton={this.pauseHandle}
          speed={this.state.speed}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          randomize={this.randomize}
          toggleModal={this.toggleModal}
        />
        <Grid
          gridFull={this.state.gridFull}
          rows={this.state.rows}
          cols={this.state.cols}
          selectBox={this.selectBox}
        />
        <h2>Generations: {this.state.generation}</h2>
        <div>
          <h2>Speed: {this.state.speed} ms</h2>
          <h2>Colums: {this.state.cols} </h2>
          <h2>Rows: {this.state.rows} </h2>
        </div>
      </div>
    );
  }
}

export default Main;
