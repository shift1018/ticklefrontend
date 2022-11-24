import axios from "axios";

const instance = axios.create({
  baseURL: "https://ticklebackend.herokuapp.com/",
});


export default instance;
