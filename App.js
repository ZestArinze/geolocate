import React from "react";

import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import placesReducer from "./store/places-reducer";
import PlacesNavigator from "./navigation/PlacesNavigator";
import { init } from "./utils/db";

// init sqlite database
init()
  .then(() => {
    console.log("sqlite db initialized");
  })
  .catch((err) => {
    console.log("Error initializing sqlite db: " + err);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
