import axios from "axios";

const api = axios.create({
  baseURL: "https://api.dictionaryapi.dev/api/v2/entries/",
});

export default api;