import axios from "axios";

const instance = axios.create({
  baseURL: "https://ticklebackend.herokuapp.com/",
  // baseURL: "http://localhost:8800/",


});


export default instance;
