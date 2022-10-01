import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="red" barStyle="default" />
      <Text>RegisterScreen</Text>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
