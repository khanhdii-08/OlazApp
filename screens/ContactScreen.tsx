import { StyleSheet } from "react-native";
import FriendScreen from "./FriendScreen";
import GroupScreen from "./GroupScreen";
import OAScreen from "./OAScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function TabOneScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Friend"
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: "white",
        },
        swipeEnabled: false,
      }}
    >
      <Tab.Screen name="Friend" component={FriendScreen} />
      <Tab.Screen name="Group" component={GroupScreen} />
      <Tab.Screen name="OA" component={OAScreen} />
    </Tab.Navigator>
  );
}
