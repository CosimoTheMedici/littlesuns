import axios from 'axios'
import  config  from '../config/config.json';


export const axiosPublic = axios.create({
    baseURL:config.ApiServiceBaseUrl
})

export const axiosPrivate = axios.create({
    baseURL:config.ApiServiceBaseUrl,
    headers:{'Content-Type':'application/json'},
    withCredentials:true
});
export const axiosInstance = axios.create({
    baseURL:config.ApiServiceBaseUrl,
    headers:{'Content-Type':'application/json'},
    withCredentials:true
});