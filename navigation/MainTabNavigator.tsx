import { Text, View } from "react-native";
import { FontAwesome, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import useColorScheme from "../hooks/useColorScheme";
import TabChatScreen from "../screens/ChatScreen";
import TabOneScreen from "../screens/ContactScreen";
import TabUserScreen from "../screens/UserScreen";
import { RootTabParamList, RootTabScreenProps } from "../types";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
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
            <View style={{ flexDirection: "row" }}>
              <Pressable>
                <MaterialIcons
                  name="qr-code-scanner"
                  size={24}
                  color="white"
                  style={{ marginRight: 20 }}
                />
              </Pressable>
              <Pressable onPress={() => navigation.navigate("MenuPopup")}>
                <AntDesign
                  name="plus"
                  size={25}
                  color="white"
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            </View>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabContact"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<"TabContact">) => ({
          title: "Danh bạ",
          tabBarIcon: ({ color }) => (
            <AntDesign name="contacts" size={26} color={color} />
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
                name="adduser"
                size={24}
                color="white"
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabUser"
        component={TabUserScreen}
        options={({ navigation }: RootTabScreenProps<"TabUser">) => ({
          title: "Cá nhân",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={26} color={color} />
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
                name="setting"
                size={24}
                color="white"
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}
