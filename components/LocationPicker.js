import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const { onLocationPicked } = props;

  const mapPickedLocation = props.navigation.getParam("pickedLocation");
  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status != "granted") {
      Alert.alert(
        "Permission Denied",
        "You need to grant this app permission to use location services",
        [{ text: "OK" }]
      );

      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    try {
      setIsFetchingLocation(true);

      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });

      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });

      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Oops! Failure",
        "Failed to pick location. Try again or pick location on the map",
        [{ text: "OK" }]
      );
    }

    setIsFetchingLocation(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetchingLocation ? (
          <ActivityIndicator size='small' color={Colors.primary} />
        ) : (
          <Text style={styles.statusText}>No location picked yet</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title='Get Current Location'
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title='Pick On Map'
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    alignContent: "center",
    marginVertical: 4,
  },
  mapPreview: {
    width: "100%",
    height: 180,
    marginBottom: 10,

    borderEndColor: Colors.lightGray,
    borderWidth: 1,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  statusText: {
    textAlign: "center",
  },
});

export default LocationPicker;
