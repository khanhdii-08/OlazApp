import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import {
  Pressable,
  Text,
  View,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import TabNavigator from "./MainTabNavigator";
import SearchScreen from "../screens/SearchScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList, RootStackScreenProps } from "../types";
import AddFriendScreen from "../screens/AddFriendScreen";
import AddGroupScreen from "../screens/AddGroupScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import SecurityScreen from "../screens/SecurityScreen";
import LoginScreen from "../screens/LoginScreen";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import RegisterScreen from "../screens/RegisterScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />

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
          headerTintColor: "white",
          headerTitle: ChatRoomHeader,
          headerStyle: {
            backgroundColor: "#0091ff",
          },
          headerBackTitleVisible: false,
          title: "Username",
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

const ChatRoomHeader = (props) => {
  const { width } = useWindowDimensions();

  console.log(props);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: width - 60,
        padding: 10,
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ color: "white", fontSize: 17 }}>{props.children}</Text>
        <Text style={{ color: "white", fontSize: 11 }}>
          Truy cập 52 phút trước
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Feather name="phone" size={24} color="white" />
        <AntDesign
          name="videocamera"
          size={24}
          color="white"
          style={{ marginLeft: 16, marginRight: 16 }}
        />
        <Ionicons name="menu" size={28} color="white" />
      </View>
    </View>
  );
};
