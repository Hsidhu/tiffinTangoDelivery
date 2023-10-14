import { combineReducers } from 'redux';

import {
    basket,
    testReducer
} from './basket/reducer';

import {
    isAuthenticated,
    authToken
} from './Auth/reducer';

export default combineReducers({
    isAuthenticated,
    authToken,
    basket,
    testReducer
});