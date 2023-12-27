import {
    DAILY_DELIVERIES
} from "./actions"


export const dailyDeliveries = (state = [], action) => {
    switch (action.type) {
        case DAILY_DELIVERIES: 
            return action.payload;
        default:
            return state;
    }
}
