import axios from "axios";

const instance = axios.create({
  baseURL: 'https://todo-app-b3600-default-rtdb.firebaseio.com'
});

export default instance;
