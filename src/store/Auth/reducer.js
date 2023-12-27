import {
    AUTH_TOKEN,
    SET_AUTH_FLAG,
    USER_DETAILS
} from "./actions"


export const authToken = (state = "", action) => {
    switch (action.type) {
        case AUTH_TOKEN: 
            return action.payload;
        default:
            return state;
    }
}

export const isAuthenticated = (state = false, action) => {
    switch (action.type) {
        case SET_AUTH_FLAG:
            return action.payload;
        default:
            return state;
    }
}

export const userDetails = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAILS:
            return action.payload;
        default:
            return state;
    }
}
