import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

const MapScreen = (props) => {
  const [selectedLocation, setSelectedLocation] = useState();

  const mapRegion = {
    latitude: 6.5,
    longitude: 3.34,
    latitudeDelta: 0.1,
    longitudeDelta: 0.05,
  };

  const selectLocationHandler = (e) => {
    setSelectedLocation({
      lat: e.nativeEvent.coordinate.latitude,
      lng: e.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("Invalid", "Please pick a location first", [{ text: "OK" }]);
      return;
    }

    // props.navigation.goBack();
    props.navigation.navigate("NewPlace", {
      pickedLocation: selectedLocation,
    });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  let markerCoordinates;
  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView
      region={mapRegion}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title='Picked Location' coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveLocation = navData.navigation.getParam("saveLocation");
  return {
    headerRight: (
      <TouchableOpacity style={styles.headerButton} onPress={saveLocation}>
        <Text style={styles.headerButtonText}>SAVE</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 16,
  },
  headerButtonText: {
    color: Platform.OS === "android" ? Colors.white : Colors.primary,
  },
});

export default MapScreen;
