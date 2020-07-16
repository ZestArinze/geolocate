import * as FileSystem from "expo-file-system";
export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";
import { insertPlace, fetchPlaces } from "../utils/db";
import env from "../secret/env";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${env.googleMapApiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to reverse geocode! Something went wrong.");
    }

    const responseData = await response.json();
    if (!responseData.results) {
      throw new Error("Failed to reverse geocode! Something went wrong.");
    }

    const address = responseData.results[0].formatted_address;

    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address,
          coords: {
            lat: location.lat,
            lng: location.lng,
          },
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      console.log(dbResult);
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
