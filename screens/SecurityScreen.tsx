import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput,
  StatusBar,
  Image,
} from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

const SecurityScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar animated={true} barStyle="dark-content" />
      <View style={styles.containerTop}>
        <Image
          style={styles.logo}
          source={require("../assets/images/slide_5.png")}
        />
      </View>
      <View style={styles.containerBot}>
        <TouchableOpacity
          style={[styles.btnLogin, styles.btn]}
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
        >
          <Text style={[styles.btnText]}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnRegister]}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          <Text>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerTop: {
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerBot: {
    height: "27%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 150,
  },
  btn: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 30,
  },
  btnText: {
    color: "white",
  },
  btnLogin: {
    backgroundColor: "#0091ff",
  },
  btnRegister: {
    backgroundColor: "#EEEEEE",
  },
});

export default SecurityScreen;
