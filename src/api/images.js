import axios from "axios";

const api = axios.create({
  baseURL:
    "https://api.unsplash.com/search/photos/?orientation=squarish&client_id=ozWZFYKkVlPjzUHQUugM3WatBaLdSeOout_Xo6Ckpa0&query=",
});

export default api;
