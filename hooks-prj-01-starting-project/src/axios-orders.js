import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgirproject.firebaseio.com/'
});

export default instance;