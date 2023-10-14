import {
    AUTH_TOKEN,
    SET_AUTH_FLAG
} from "./actions"


export const authToken = (state = "", action) => {
    switch (action.type) {
        case AUTH_TOKEN: 
            return action.payload;
        default:
            return state;
    }
}

export const isAuthenticated = (state = true, action) => {
    switch (action.type) {
        case SET_AUTH_FLAG: 
            return action.payload;
        default:
            return state;
    }
}
