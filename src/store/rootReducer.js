import { combineReducers } from 'redux';

import { loadingState } from './Common/reducer';
import {
    basket
} from './basket/reducer';

import {
    isAuthenticated,
    authToken,
    userDetails
} from './Auth/reducer';

import { dailyDeliveries } from './Deliveries/reducer';

export default combineReducers({
    isAuthenticated, authToken, userDetails,
    loadingState,
    basket,
    dailyDeliveries
});