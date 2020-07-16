import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import PlacesScreen from "../screens/PlacesScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailScreen";

import UserProfileScreen from "../screens/UserProfileScreen";

import Colors from "../constants/Colors";
import { Platform } from "react-native";

const PlacesNavigator = createStackNavigator(
  {
    Places: PlacesScreen,
    PlaceDetail: PlaceDetailsScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor:
        Platform.OS === "android" ? Colors.white : Colors.primary,
    },
  }
);

const UserNavigator = createStackNavigator({
  UserProfile: UserProfileScreen,
});

const MainNavigator = createDrawerNavigator({
  Places: PlacesNavigator,
  User: UserNavigator,
});

export default createAppContainer(MainNavigator);
