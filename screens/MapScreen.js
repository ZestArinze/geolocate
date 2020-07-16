import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";

const MapScreen = (props) => {
  const mapRegion = {
    latitude: 6.5,
    longitude: 3.34,
    latitudeDelta: 0.1,
    longitudeDelta: 0.05,
  };
  return <MapView region={mapRegion} style={styles.map} />;
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapScreen;
