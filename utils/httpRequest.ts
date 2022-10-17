import axios from 'axios';
import jwt from './jwt';


export const httpRequest = axios.create({
    baseURL: "http://192.168.137.39:4000/",
});

export const configAxios = () => {
    httpRequest.defaults.headers.common['Authorization'] = `Bearer ${jwt.getToken()}`;
};

export default httpRequest;

