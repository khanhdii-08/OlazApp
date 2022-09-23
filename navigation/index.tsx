/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import TabNavigator from "./MainTabNavigator";
import useColorScheme from "../hooks/useColorScheme";
import SearchScreen from "../screens/SearchScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList, RootStackScreenProps } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import ChatRoomScreen from "../screens/ChatRoomScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{ headerShown: true }}
      /> */}
      <Stack.Screen
        name="Root"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group
        screenOptions={() => ({
          presentation: "fullScreenModal",
        })}
      >
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={({ navigation }: RootStackScreenProps<"Search">) => ({
            headerShown: false,
            animation: "none",
            title: "",
            headerStyle: {
              backgroundColor: "red",
            },
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
