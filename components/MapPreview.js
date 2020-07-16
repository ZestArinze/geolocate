import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import env from "../secret/env";

const MapPreview = (props) => {
  let mapPrevieUrl;

  if (props.location) {
    mapPrevieUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=13&size=380x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${env.googleMapApiKey}`;
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {mapPrevieUrl ? (
        <Image style={styles.mapImage} source={{ uri: mapPrevieUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignContent: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
