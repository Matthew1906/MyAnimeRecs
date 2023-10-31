import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
});

export default axiosClient;