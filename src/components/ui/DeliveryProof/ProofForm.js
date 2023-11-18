import { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors } from '../../../constants/styles';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../Button';
import { deliveryProofHandler } from "../../../store/Deliveries/actions"

const ProofForm = ({}) => {
    const [comment, setComment] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();

    function changeCommentHandler(enteredText) {
        setComment(enteredText);
    }

    function takeImageHandler(imageUri) {
        setSelectedImage(imageUri);
    }

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    }, []);

    const triggerFormSubmit = async (comment, image) => {
        try {
            const response = await deliveryProofHandler({
                id: 1,
                order_id: 1,
                driver_id: 1,
                lat: "",
                lng: "",
                comment:comment,
                image: image
            });
        } catch (error) {
            console.log(error)
            Alert.alert(
                'Authentication failed',
                'Something went wrong.'
            );
        }
    }

    function savePlaceHandler() {
        console.log(comment);
        console.log(selectedImage);
        console.log(pickedLocation);

        triggerFormSubmit('comment', {
            uri: selectedImage.uri,
            type:"image/jpeg",
            name: 'upload.jpg'
        });

    }
      
    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Comment</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={changeCommentHandler}
                    value={comment}
                />
            </View>
            <ImagePicker onTakeImage={takeImageHandler} />
            <LocationPicker onPickLocation={pickLocationHandler} />
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    );
}

export default ProofForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500,
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
    },
});