import { useState, useEffect } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';

import { Colors } from '../../../constants/styles';
import OutlinedButton from '../OutlinedButton';


const ImagePicker = ({onTakeImage}) => {
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
  
    async function verifyPermissions() {
        const permissionResponse = await requestPermission();
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
  
            return permissionResponse.granted;
        }
  
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
            'Insufficient Permissions!',
            'You need to grant camera permissions to use this app.'
            );
            return false;
        }
  
        return true;    
    }
  
    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
    
        if (!hasPermission) {
          return;
        }
    
        const images = await launchCameraAsync({
          allowsEditing: false,
          aspect: [16, 9],
          quality: 0.5,
        });
        setPickedImage( images.assets[0].uri);
        onTakeImage(images.assets[0]);
    }

    let imagePreview = <Text>No image taken yet.</Text>;

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
    }
  
    return (
        <View>
          <View style={styles.imagePreview}>{imagePreview}</View>
          <OutlinedButton icon="camera" onPress={takeImageHandler}>
            Take Image
          </OutlinedButton>
        </View>
    );
  }
  
export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
      width: '100%',
      height: 200,
      marginVertical: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primary100,
      borderRadius: 4,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
});
