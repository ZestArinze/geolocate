import React, { useState } from "react";
import { View, StyleSheet, Text, Button, Image, Alert } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ImageTaker = (props) => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status != "granted") {
      Alert.alert(
        "Permission Denied",
        "You need to grant this app permission to use camera",
        [{ text: "OK" }]
      );

      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [18, 10],
      quality: 0.5,
    });

    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text style={styles.statusText}>No image selected yet</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title='Take Image'
        onPress={takeImageHandler}
        color={Colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignContent: "center",
  },
  imagePreview: {
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
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageTaker;
