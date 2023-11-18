import AsyncStorage from '@react-native-async-storage/async-storage';
import { postRequest, deleteRequest } from '../../config/axiosConfig';

async function submitProof(data) {
    // {
    //     order_id: "",
    //     customer_id: "",
    //     driver_id: "",
    //     lat: "",
    //     lng: "",
    //     comment:"",
    //     image:'image'
    // }
    const formData = new FormData();
    for ( var key in data ) {
        formData.append(key, data[key]);
    }
    try {
        const response = await postRequest(`order/delivered`, formData, {
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