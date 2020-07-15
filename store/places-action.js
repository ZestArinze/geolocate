import * as FileSystem from "expo-file-system";
export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";
import { insertPlace, fetchPlaces } from "../utils/db";

export const addPlace = (title, image) => {
  return async (dispatch) => {
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
        "Dummy 123 Main Street",
        4.5,
        12.9
      );
      console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        placeData: { id: dbResult.insertId, title: title, image: newPath },
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
