import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_KEY = 'AIzaSyBEqSY4vEjuJnO8zbX5Pb8PO3ln9czPQxk';
export const AUTH_TOKEN = 'AUTH_TOKEN'
export const SET_AUTH_FLAG = 'SET_AUTH_FLAG'


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
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  
    const response = await axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });

    console.log(response.data)
  
    return response.data.idToken ?? '';
}
  
export function createUser(email, password) {
    return authenticate('signUp', email, password);
}
  
export function login(email, password) {
    return authenticate('signInWithPassword', email, password);
}


export const setAuthenticate = (token) => (dispatch) =>{

    AsyncStorage.setItem('token', token);
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
    
    dispatch({
        type: AUTH_TOKEN,
        payload: token
    })

    dispatch({
        type: SET_AUTH_FLAG,
        payload: false
    })
    AsyncStorage.removeItem('token');
}



