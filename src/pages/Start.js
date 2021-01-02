import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import api from "../api/config";

const useStyles = makeStyles((theme) => ({
  start: {
    width: 800,
  },
}));

function Start() {
  const classes = useStyles();
  const [inputData, setInputData] = useState("");
  const [phrases, setPhrases] = useState("");

  const getDatas = async (word) => {
    const response = await api.get("/en/" + word);
    setPhrases(response.data[0].meanings);
  };

  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  return (
    <div className="Start">
      <header className="Start-header">
        <TextField
          id="outlined-basic"
          label="Type the word in English"
          type="text"
          onChange={(event) => {
            handleChange(event);
          }}
          className={classes.start}
        />

        <Button
          onClick={() => {
            getDatas(inputData);
          }}
        >
          Pesquisar
        </Button>

        <h2>{inputData}</h2>

        {phrases.map(function (item) {
          return (
            <div>
              <p>{item.definitions[0].example}</p>
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default Start;
