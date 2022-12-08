import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8800/",
  baseURL: "https://ticklebackend.herokuapp.com/",
});


export default instance;