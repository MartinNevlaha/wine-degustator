import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.0.121:8080/", // potom zmenit
});


export default instance;
