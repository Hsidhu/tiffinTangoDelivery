import { useState, useEffect } from 'react';
import { Text, Alert, View, StyleSheet, Image } from 'react-native';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';

import {
    useNavigation,
    useRoute,
    useIsFocused,
  } from '@react-navigation/native';

import { Colors } from '../../../constants/styles';

import OutlinedButton from '../OutlinedButton';
import {getMapPreview, getAddress} from '../../../utils/LocationView';

const LocationPicker = ({ onPickLocation }) => {
    const [pickedLocation, setPickedLocation] = useState();
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    const isFocused = useIsFocused();

    const navigation = useNavigation();
    const route = useRoute();

    // get location from map preview with nav params
    useEffect(() => {
        if (isFocused && route.params) {
          const mapPickedLocation = {
            lat: route.params.pickedLat,
            lng: route.params.pickedLng,
          };
          setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);

    // convert picked location to readable

    useEffect(() => {
        async function handleLocation() {
          if (pickedLocation) {
            const address = await getAddress(
              pickedLocation.lat,
              pickedLocation.lng
            );
            onPickLocation({ ...pickedLocation, address: address });
          }
        }
        handleLocation();
    }, [pickedLocation, onPickLocation]);


    async function verifyPermissions() {
        if (
            locationPermissionInformation.status === PermissionStatus.UNDETERMINED
        ) {
            const permissionResponse = await requestPermission();
    
            return permissionResponse.granted;
        }
  
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
            'Insufficient Permissions!',
            'You need to grant location permissions to use this app.'
            );
            return false;
        }
    
        return true;
    }
  
    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
    
        if (!hasPermission) {
          return;
        }
    
        const location = await getCurrentPositionAsync();
        console.log(location);
        setPickedLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
    }
  
    function pickOnMapHandler() {
        navigation.navigate('MapScreen');
    }

    let locationPreview = <Text>No location picked yet.</Text>;
    
    if (pickedLocation) {
        console.log(getMapPreview(pickedLocation.lat, pickedLocation.lng));
        locationPreview = (
          <Image
            style={styles.image}
            source={{
              uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
            }}
          />
        );
    }
  
    return (
      <View>
        <View style={styles.mapPreview}>{locationPreview}</View>
            <View style={styles.actions}>
                <OutlinedButton icon="location" onPress={getLocationHandler}>
                    Locate User
                </OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>
                    Pick on Map
                </OutlinedButton>
        </View>
      </View>
    );
}
  
export default LocationPicker;
  

const styles = StyleSheet.create({
    mapPreview: {
      width: '100%',
      height: 200,
      marginVertical: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primary100,
      borderRadius: 4,
      overflow: 'hidden'
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      // borderRadius: 4
    },
  });
