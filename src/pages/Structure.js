import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useState } from "react";
import AudioPlayer from "material-ui-audio-player";

const muiTheme = createMuiTheme({});

const useStyles = makeStyles((theme) => ({
  start: {
    width: 500,
  },
  h2: {
    color: "#A6B0FF",
  },
  p: {
    fontFamily: "Courier, monospace",
    fontSize: 20,
    marginBottom: 40,
    marginTop: 40,
  },
  audio: {
    width: 20,
  },
}));

function Structure(props) {
  const classes = useStyles();

  return (
    <div>
      <header>
        <h2 className={classes.h2}>Phonetics</h2>
        {props.phonetics.map(function (item) {
          return (
            <div>
              <p className={classes.p}>{item.text}</p>
              <ThemeProvider theme={muiTheme}>
                <AudioPlayer src={item.audio} />
              </ThemeProvider>
            </div>
          );
        })}
        <h2 className={classes.h2}>Phrases</h2>
        {props.phrases.map(function (item) {
          return (
            <div>
              <p className={classes.p}>{item.definitions[0].example}</p>
            </div>
          );
        })}
        <h2 className={classes.h2}>Images</h2>
        {props.images.map(function (item) {
          return (
            <div>
              <img src={item.urls.small} alt={item.alt_description}></img>
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default Structure;
