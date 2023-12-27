import { useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

import ProofForm from '../../components/containers/DeliveryProof/ProofForm';

const DeliveryProofScreen = () => {

    useEffect(() => {
        console.log('DeliveryProofScreen mounted')
        return () => {
            console.log('DeliveryProofScreen unmounted')
        };
    }, []);

    return(
        <ScrollView
            style={{
                backgroundColor: "white",
                flex: 1,
            }}
            vertical
        >
            <ProofForm />
        </ScrollView>
    )
}

export default DeliveryProofScreen;
