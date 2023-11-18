import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const config = {
    //HOST_URL: 'https://laravel-react-boilerplate.herokuapp.com/api',
    HOST_URL: 'https://5e5f-99-234-248-49.ngrok-free.app/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

const axiosClient = axios.create();

axiosClient.defaults.baseURL = config.HOST_URL;

axiosClient.defaults.headers = config.headers;

axiosClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('userToken');
        console.log("Retrieved token:", token); // Add this line to check the token

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


export function getCustomRequest(URL) {
    return axios.get(`/${URL}`).then(response => response);
}

export function getRequest(URL) {
    return axiosClient.get(`/${URL}`).then(response => response);
}

export function postRequest(URL, payload, config ={}) {
    return axiosClient.post(`/${URL}`, payload, config).then(response => response);
}

export function patchRequest(URL, payload) {
    return axiosClient.patch(`/${URL}`, payload).then(response => response);
}

export function deleteRequest(URL) {
    return axiosClient.delete(`/${URL}`).then(response => response);
}
