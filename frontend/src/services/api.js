import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',/*É a parte comum de todas as páginas da aplicação*/
})

export default api;