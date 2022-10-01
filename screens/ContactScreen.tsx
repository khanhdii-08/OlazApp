import { StyleSheet } from "react-native";
import FriendScreen from "./FriendScreen";
import GroupScreen from "./GroupScreen";
import OAScreen from "./OAScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function TabOneScreen() {
  return (
    <Tab.Navigator
      initialRouteName="TabChat"
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Tab.Screen name="Friend" component={FriendScreen} />
      <Tab.Screen name="Group" component={GroupScreen} />
      <Tab.Screen name="OA" component={OAScreen} />
    </Tab.Navigator>
  );
}

// import { View, Text } from "react-native";
// import React from "react";

// const ContactScreen = () => {
//   return (
//     <View>
//       <Text>ContactScreen</Text>
//     </View>
//   );
// };

// export default ContactScreen;