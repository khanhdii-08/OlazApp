import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../contexts/AuthContext";

const SplashScreen = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuthContext();
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Root");
    } else {
      navigation.navigate("Security");
    }
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
