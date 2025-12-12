import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apivitalandina.puceecoexplora.com/api' 
});

export default api;