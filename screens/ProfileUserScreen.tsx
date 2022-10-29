import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RootRouteProps, RootStackScreenProps } from "../types";
import { useRoute } from "@react-navigation/native";

const ProfileUserScreen = () => {
  const route = useRoute<RootRouteProps<"ProfileUser">>();

  //   console.log("router", route.params.userId);

  return (
    <View>
      <Text>{route.params.userId}</Text>
    </View>
  );
};

export default ProfileUserScreen;

const styles = StyleSheet.create({});
