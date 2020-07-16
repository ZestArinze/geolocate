import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  HeaderButton,
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

const UserProfileScreen = (props) => {
  return (
    <View>
      <Text>User Profile Screen</Text>
    </View>
  );
};

UserProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "My Profile",
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
  };
};

const styles = StyleSheet.create({});

export default UserProfileScreen;
