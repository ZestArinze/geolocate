import * as FileSystem from "expo-file-system";
export const ADD_PLACE = "ADD_PLACE";

export const addPlace = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    dispatch({ type: ADD_PLACE, placeData: { title: title, image: newPath } });
  };
};
