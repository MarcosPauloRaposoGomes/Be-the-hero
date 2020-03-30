import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.104:3333'//Quando for usar o axios usa o ip disponibilizado pelo expo
});

export default api;