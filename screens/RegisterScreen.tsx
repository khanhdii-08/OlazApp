import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { useNavigation } from "@react-navigation/native";
import { registry } from "../service/authService";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility("HIỆN", "ẨN");
  const [disabled, setDisabled] = useState(true);

  const onSubmit = async () => {
    try {
      const result = await registry(name, username, password);
      Alert.alert("Bạn đã đăng ký thành công xin mời bạn đăng nhập");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log(error);
    }
  };

  const checkInput = (name: string, username: string, password: string) => {
    if (name && username && password) setDisabled(false);
    else setDisabled(true);
  };

  useEffect(() => {
    checkInput(name, username, password);
  }, [name, username, password]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar animated={true} barStyle="default" backgroundColor="#3399FF" />
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.text}>Tên Zalo</Text>
        <View style={styles.parent}>
          <TextInput
            style={styles.textInput}
            value={name}
            placeholder="Gồm 2-40 ký tự"
            placeholderTextColor="#717070"
            autoFocus={true}
            onChangeText={setName}
          />
          {name && (
            <TouchableOpacity
              style={styles.closeButtonParent}
              onPress={() => setName("")}
            >
              <Image
                style={styles.closeButton}
                source={require("../assets/images/close.png")}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.text}>Tên Đăng Nhập</Text>
        <View style={styles.parent}>
          <TextInput
            style={styles.textInput}
            value={username}
            placeholder="Gồm 2-40 ký tự"
            placeholderTextColor="#717070"
            onChangeText={(value) => setUsername(value)}
          />
          {username && (
            <TouchableOpacity
              style={styles.closeButtonParent}
              onPress={() => setUsername("")}
            >
              <Image
                style={styles.closeButton}
                source={require("../assets/images/close.png")}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.text}>Mật Khẩu</Text>
        <View style={styles.parent}>
          <TextInput
            style={styles.textInput}
            value={password}
            placeholder="Gồm 2-40 ký tự"
            placeholderTextColor="#717070"
            secureTextEntry={passwordVisibility}
            onChangeText={(value) => setPassword(value)}
          />

          {password && (
            <TouchableOpacity
              style={styles.closeButtonParent}
              onPress={() => setPassword("")}
            >
              <Image
                style={styles.closeButton}
                source={require("../assets/images/close.png")}
              />
            </TouchableOpacity>
          )}
          <Pressable
            style={[styles.closeButtonParent]}
            onPress={handlePasswordVisibility}
          >
            <Text style={styles.showPass}>{rightIcon}</Text>
          </Pressable>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={onSubmit}
            disabled={disabled}
            style={[styles.btn, { opacity: disabled ? 0.3 : 1 }]}
          >
            <Text style={{ color: "white" }}>Đăng Ký</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 12,
    fontSize: 16,
  },
  parent: {
    margin: 10,
    borderColor: "gray",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    height: 40,
    width: "85%",
  },
  closeButton: {
    height: 12,
    width: 12,
  },
  closeButtonParent: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  btn: {
    width: 250,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 30,
    backgroundColor: "#0091ff",
    marginTop: 20,
  },
  showPass: {
    fontSize: 15,
    opacity: 0.7,
  },
});
