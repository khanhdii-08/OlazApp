import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Pressable, Text, View } from "react-native";

import TabNavigator from "./MainTabNavigator";
import SearchScreen from "../screens/SearchScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList, RootStackScreenProps } from "../types";
import AddFriendScreen from "../screens/AddFriendScreen";
import AddGroupScreen from "../screens/AddGroupScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import SecurityScreen from "../screens/SecurityScreen";
import LoginScreen from "../screens/LoginScreen";
import { Ionicons } from "@expo/vector-icons";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Security"
        component={SecurityScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Root"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{
          headerShown: true,
          headerTitle: ChatRoomHeader,
          headerStyle: {
            backgroundColor: "#0091ff",
          },
          headerBackTitleVisible: false,
        }}
      />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group
        screenOptions={{
          presentation: "fullScreenModal",
        }}
      >
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={({ navigation }: RootStackScreenProps<"Search">) => ({
            headerShown: false,
            animation: "none",
          })}
        />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: "fullScreenModal",
        }}
      >
        <Stack.Screen
          name="AddGroupScreen"
          component={AddGroupScreen}
          options={({
            navigation,
          }: RootStackScreenProps<"AddGroupScreen">) => ({
            headerTitle: "Nhóm mới",
            headerStyle: {
              backgroundColor: "#EEEEEE",
            },
            headerLeft: () => (
              <Pressable onPress={() => navigation.goBack()}>
                <Text>Hủy</Text>
              </Pressable>
            ),
          })}
        />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: "card",
        }}
      >
        <Stack.Screen name="AddFriendScreen" component={AddFriendScreen} />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={({ navigation }: RootStackScreenProps<"LoginScreen">) => ({
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#0091ff",
            },
            headerLeft: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons name="chevron-back" size={26} color="white" />
                </Pressable>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Đăng nhập
                </Text>
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={({
            navigation,
          }: RootStackScreenProps<"RegisterScreen">) => ({
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#0091ff",
            },
            headerLeft: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons name="chevron-back" size={26} color="white" />
                </Pressable>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Tạo tài khoản
                </Text>
              </View>
            ),
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const ChatRoomHeader = (props: any) => {
  return <Text style={{}}>Duy</Text>;
};
