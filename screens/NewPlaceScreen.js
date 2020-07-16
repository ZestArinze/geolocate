import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from "react-native";

import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";

import * as placesActions from "../store/places-action";
import ImageTaker from "../components/ImageTaker";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();

  const dispatch = useDispatch();

  const titleChangehandler = (text) => {
    setTitleValue(text);
  };

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, selectedImage));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangehandler}
          value={titleValue}
        />
        <ImageTaker onImageTaken={imageTakenHandler} />
        <LocationPicker navigation={props.navigation} />
        <Button
          title='Save'
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = () => {
  return {
    headerTitle: "Add New Place",
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 16,
  },
  textInput: {
    borderBottomColor: Colors.accent,
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
