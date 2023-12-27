
import {
    LOADING
} from "./actions"

export const loadingState = (state = false, action) => {
    switch (action.type) {
        case LOADING:
            return action.payload;
        default:
            return state;
    }
}
