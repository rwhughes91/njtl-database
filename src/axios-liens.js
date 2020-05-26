import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://new-jersey-database-server.herokuapp.com/',
});
export default instance;
