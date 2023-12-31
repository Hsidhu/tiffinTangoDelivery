import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRequest, postRequest, deleteRequest } from '../../config/axiosConfig';

const API_KEY = 'AIzaSyBEqSY4vEjuJnO8zbX5Pb8PO3ln9czPQxk';

export const AUTH_TOKEN = 'AUTH_TOKEN'
export const SET_AUTH_FLAG = 'SET_AUTH_FLAG'
export const USER_DETAILS = 'USER_DETAILS'

async function loginHandler({ email, password }) {
    let token = (Math.random() + 1).toString(36).substring(7);

    AsyncStorage.setItem('token', token);
    dispatch({
        type: AUTH_TOKEN,
        payload: token
    })

    dispatch({
        type: SET_AUTH_FLAG,
        payload: true
    })

    return
}

async function authenticate(mode, email, password) {

    //const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    //https://5e5f-99-234-248-49.ngrok-free.app/api/login
    //https://5e5f-99-234-248-49.ngrok-free.app/sanctum/csrf-cookie

    const url = `login`;
    try {
        const response = await postRequest(url, {
            email: email,
            password: password,
            returnSecureToken: true,
            user_type:'driver'
        });

        console.log(response.data)
    
        return response.data.access_token ?? '';
    } catch (error) {
        throw error; // Re-throw to allow the caller to handle it
    }
}
  
export function createUser(email, password) {
    return authenticate('signUp', email, password);
}
  
export function login(email, password) {
    return authenticate('signInWithPassword', email, password);
}

export const setAuthenticate = (token) => (dispatch) =>{

    AsyncStorage.setItem('userToken', token);
    dispatch({
        type: AUTH_TOKEN,
        payload: token
    })
    dispatch({
        type: SET_AUTH_FLAG,
        payload: true
    })
}

export const logout = () => (dispatch) => {
    const response = deleteRequest('logout').then(response => {
        AsyncStorage.removeItem('userToken');
    }).catch(error => {
        console.log("error while logout")
    });

    dispatch({
        type: AUTH_TOKEN,
        payload: ""
    })

    dispatch({
        type: SET_AUTH_FLAG,
        payload: false
    })
}


export const getUserDetails = () => (dispatch) => {

    const response = getRequest('auth/user').then(response => {
        dispatch({
            type: USER_DETAILS,
            payload: response.data
        })
    }).catch(error => {
        console.log("error while logout")
    });
}
