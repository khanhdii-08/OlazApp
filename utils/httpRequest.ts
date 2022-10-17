import axios from 'axios';
import jwt from './jwt';


export const httpRequest = axios.create({
    baseURL: "http://172.16.60.146:4000/",
});

export const configAxios = () => {
    httpRequest.defaults.headers.common['Authorization'] = `Bearer ${jwt.getToken()}`;
};

export default httpRequest;

