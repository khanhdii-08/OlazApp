import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="red" barStyle="default" />
      <Text style={styles.textContent}>
        Vui lòng nhập tài khoản và mật khẩu để đăng nhập
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textContent: {
    margin: 10,
    opacity: 0.8,
  },
});
