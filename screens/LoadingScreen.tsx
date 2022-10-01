import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});