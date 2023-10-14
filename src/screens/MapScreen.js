import { useState, useLayoutEffect, useEffect, useCallback } from 'react';
import { StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import IconButton from '../components/ui/IconButton';

// Allow user to pick place from map
function MapScreen({ navigation }) {
    const [selectedLocation, setSelectedLocation] = useState();

    useEffect(() => {
        console.log('MapScreen mounted')
        return () => {
            console.log('MapScreen unmounted')
        };
    }, []);

    const region = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        
        setSelectedLocation({ lat: lat, lng: lng });
    }
    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
          Alert.alert(
            'No location picked!',
            'You have to pick a location (by tapping on the map) first!'
          );
          return;
        }

        // navigate back to tabs screen
        navigation.navigate('TabNavigation', { screen:"DeliveryProofScreen", params:{
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng,
        }});

    }, [navigation, selectedLocation]);
    
    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="save"
              size={24}
              color={tintColor}
              onPress={savePickedLocationHandler}
            />
          ),
        });
    }, [navigation, savePickedLocationHandler]);

    return (
        <MapView
          style={styles.map}
          initialRegion={region}
          onPress={selectLocationHandler}
        >
          {selectedLocation && (
            <Marker
              title="Picked Location"
              coordinate={{
                latitude: selectedLocation.lat,
                longitude: selectedLocation.lng,
              }}
            />
          )}
        </MapView>
    );
}

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});