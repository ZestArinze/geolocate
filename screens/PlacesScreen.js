import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import PlaceItem from "../components/PlaceItem";

const PlacesScreen = (props) => {
  const places = useSelector((state) => state.places.places);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={null}
          title={itemData.item.title}
          address={null}
          onSelect={() => {
            props.navigation.navigate("PlaceDetail", {
              placeId: itemData.item.id,
              placeTitle: itemData.item.title,
            });
          }}
        />
      )}
    />
  );
};

PlacesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Geolocate Places",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Add Places'
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default PlacesScreen;
