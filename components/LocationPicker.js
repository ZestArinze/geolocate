import React, { useState } from "react";
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

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

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
        lat: location.coords.lat,
        long: location.coords.longitude,
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

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetchingLocation ? (
          <ActivityIndicator size='small' color={Colors.primary} />
        ) : (
          <Text style={styles.statusText}>No location picked yet</Text>
        )}
      </View>
      <Button
        title='Get User Location'
        color={Colors.primary}
        onPress={getLocationHandler}
      />
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
    justifyContent: "center",
    alignContent: "center",
    borderEndColor: Colors.lightGray,
    borderWidth: 1,
    overflow: "hidden",
  },
  statusText: {
    textAlign: "center",
  },
});

export default LocationPicker;
