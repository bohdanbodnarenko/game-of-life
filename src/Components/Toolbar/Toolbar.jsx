import React from "react";

import "./Toolbar.css";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const Toolbar = props => {
  
  const btnStyle = {
    color: "#fff",
    backgroundColor: "transparent",
    borderColor: "#fff",
    fontWeight: "bold",
    margin: "0 .5em",
    fontSize: ".9em"
  };

  const btnActiveStyle = {
    ...btnStyle,
    color: "#000",
    backgroundColor: "#fff"
  };

  const btnSettings = {
    size: "large",
    variant: "outlined"
  };

  return (
    <div className="center">
      <Button
        {...btnSettings}
        style={props.isPlaying ? btnActiveStyle : btnStyle}
        onClick={props.playButton}
      >
        Play
      </Button>
      <Button
        {...btnSettings}
        style={props.isPlaying ? btnStyle : btnActiveStyle}
        onClick={props.pauseButton}
      >
        Pause
      </Button>
      <Button style={btnStyle} {...btnSettings} onClick={props.clear}>
        Clear
      </Button>
      <Button
        style={props.speed > 500 ? btnActiveStyle : btnStyle}
        {...btnSettings}
        onClick={props.slow}
      >
        Slow
      </Button>
      <Button
        style={props.speed < 1000 ? btnActiveStyle : btnStyle}
        {...btnSettings}
        onClick={props.fast}
      >
        Fast
      </Button>
      <Button style={btnStyle} {...btnSettings} onClick={props.randomize}>
        Fill
      </Button>
      <IconButton>
        <MenuIcon style={{ color: "#fff" }} onClick={props.toggleModal} />
      </IconButton>
    </div>
  );
};

export default Toolbar;
