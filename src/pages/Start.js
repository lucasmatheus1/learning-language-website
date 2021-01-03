import { TextField, Button } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

import api from "../api/config";
import imageApi from "../api/images";
import words from "../data/data";

import Structure from "./Structure";

const muiTheme = createMuiTheme({});

const useStyles = makeStyles((theme) => ({
  start: {
    width: 500,
    marginRight: 20,
  },
  h2: {
    color: "#A6B0FF",
  },
  a: {
    fontFamily: "Courier, monospace",
    fontSize: 20,
    marginBottom: 40,
    marginTop: 40,
    marginRight: 20,
    textDecoration: "none",
    color: "white",
  },
  box: {
    marginTop: 25,
  },
  audio: {
    width: 20,
  },
}));

function getRndInteger(min, max) {
  console.log(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function Start() {
  const classes = useStyles();
  const [inputData, setInputData] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [phrases, setPhrases] = useState([]);
  const [phonetics, setPhonetics] = useState([]);
  const [images, setImages] = useState([]);
  const [numbersWordRandom, setNumbersWordRandom] = useState([]);
  // const [listJSXs, setListJSXs] = useState([]);

  const getDatas = async (word) => {
    const response = await api.get("/en/" + word);
    const twoResponse = await imageApi.get(`${word}`);

    setPhrases(response.data[0].meanings);
    setPhonetics(response.data[0].phonetics);
    setImages(twoResponse.data.results);

    console.log(twoResponse);

    // return (
    //   <div>
    //     <Structure phrases={phrases} phonetics={phonetics} images={images} />
    //   </div>
    // );
  };

  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setInputNumber(e.target.value);
  };

  const raffle = (qtd) => {
    let list = [];
    for (let index = 0; index < qtd; index++) {
      console.log("index", index);
      list.push(words[getRndInteger(1, 2998)]);
    }

    return list;
  };

  // const searchRaffles = () => {
  //   var listJSX = [];
  //   numbersWordRandom.map(async function (item) {

  //     listJSX.push(await getDatas(item));
  //   });

  //   setListJSXs(listJSX);

  // };

  return (
    <div className="Start">
      <header className="Start-header">
        <TextField
          id="outlined-basic"
          label="Type quantity of random numbers"
          placeholder="1"
          type="text"
          onChange={(event) => {
            handleChangeNumber(event);
          }}
          className={classes.start}
        />
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

        <Button
          onClick={() => {
            setNumbersWordRandom(raffle(inputNumber));
          }}
        >
          Sortear
        </Button>

        {/* <Button
          onClick={() => {
            searchRaffles();
          }}
        >
          pesquisar sorteados
        </Button> */}
        <div className={classes.box}>
          {numbersWordRandom.map(function (item) {
            return (
              <a
                href={`https://translate.google.com/?sl=en&tl=pt&text=${item}&op=translate`}
                target="_blank"
                className={classes.a}
              >
                {item}
              </a>
            );
          })}
        </div>

        <Structure phrases={phrases} phonetics={phonetics} images={images} />
      </header>
    </div>
  );
}

export default Start;
