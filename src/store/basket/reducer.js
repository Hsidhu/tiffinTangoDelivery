import {BASKET_ADD_SUCCESS} from "./actions"

export const basket = (state = [], action) => {

    switch (action.type) {
        case BASKET_ADD_SUCCESS: {
            const productIndex = state.findIndex(p => p.id === action.product.id);

            if (productIndex >= 0) {
                state[productIndex].amount += 1;
            } else {
                state.push({
                ...action.product,
                amount: 1,
                });
            }

            return [...state];
            }
        default:
            return state;
    }
}


export const testReducer = (state = "TEst on orders", action) => {
    switch (action.type) {
        case BASKET_ADD_SUCCESS: 
            return state;
        default:
            return state;
    }
}
