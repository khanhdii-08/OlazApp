/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "react-navigation";
import { Text, View } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import SearchScreen from "../screens/SearchScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabChatScreen from "../screens/HomeScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabUserScreen from "../screens/UserScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

import ChatRoomScreen from "../screens/ChatRoomScreen";
import styles from "../components/ChatRoomItem/styles";

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

// const AppNavigator = createStackNavigator({
//   Chat: { screen: ChatRoomScreen },
//   Search: { screen: SearchScreen },
// });

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
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group>
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={SearchScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabChat"
      screenOptions={{
        tabBarActiveTintColor: "#0091ff",
        tabBarStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <BottomTab.Screen
        name="TabChat"
        component={TabChatScreen}
        options={({ navigation }: RootTabScreenProps<"TabChat">) => ({
          title: "Tin nhắn",
          tabBarIcon: ({ color }) => (
            <AntDesign name="message1" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#0091ff",
          },
          headerTitle: "",
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.navigate("Search");
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <AntDesign
                  name="search1"
                  size={23}
                  color="white"
                  style={{ marginLeft: 15 }}
                />
                <Text
                  style={{
                    color: "white",
                    paddingLeft: 22,
                    fontSize: 16,
                    opacity: 0.6,
                  }}
                >
                  Tìm kiếm
                </Text>
              </View>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable>
              <AntDesign
                name="plus"
                size={25}
                color="white"
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabContact"
        component={TabOneScreen}
        options={{
          title: "Danh bạ",
          tabBarIcon: ({ color }) => (
            <AntDesign name="contacts" size={26} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabUser"
        component={TabUserScreen}
        options={{
          title: "Cá nhân",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={26} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
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
