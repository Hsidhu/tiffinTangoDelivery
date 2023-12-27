import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRequest, postRequest, deleteRequest } from '../../config/axiosConfig';

export const DAILY_DELIVERIES = "DAILY_DELIVERIES"
export const DAILY_DELIVERY = "DAILY_DELIVERY"

export const getTodaysDeliveries = () => (dispatch) => {
    const response = postRequest('driver/dailyDeliveries/1',{
        'delivery_window_id': 1
    }).then(response => {
        dispatch({
            type: DAILY_DELIVERIES,
            payload: response.data
        })
    }).catch(error => {
        console.log("error while getting deliveries")
    });
}

async function submitProof(data) {

    const formData = new FormData();
    for ( var key in data ) {
        formData.append(key, data[key]);
    }
    try {
        const response = await postRequest(`driver/dailyDelivery/delivered`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data ?? '';
    } catch (error) {
        throw error; // Re-throw to allow the caller to handle it
    }
}

export function deliveryProofHandler(data) {
    return submitProof(data);
}