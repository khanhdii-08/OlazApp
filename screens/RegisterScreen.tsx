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
} from "react-native";
import React, { useState, useEffect } from "react";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";

const RegisterScreen = () => {
  const [textName, setName] = useState("");
  const [textUserName, setUserName] = useState("");
  const [textPass, setPass] = useState("");
  const [textRePass, setRePass] = useState("");
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility("HIỆN", "ẨN");

  const [disabled, setDisabled] = useState(true);

  const checkInput = (
    textName: string,
    textUserName: string,
    textPass: string
  ) => {
    if (textName && textUserName && textPass) setDisabled(false);
    else setDisabled(true);
  };

  useEffect(() => {
    checkInput(textName, textUserName, textPass);
  }, [textName, textUserName, textPass]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} barStyle="default" />
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.text}>Tên Zalo</Text>
        <View style={styles.parent}>
          <TextInput
            style={styles.textInput}
            value={textName}
            placeholder="Gồm 2-40 ký tự"
            placeholderTextColor="#717070"
            autoFocus={true}
            onChangeText={setName}
          />
          {textName && (
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
            value={textUserName}
            placeholder="Gồm 2-40 ký tự"
            placeholderTextColor="#717070"
            onChangeText={(value) => setUserName(value)}
          />
          {textUserName && (
            <TouchableOpacity
              style={styles.closeButtonParent}
              onPress={() => setUserName("")}
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
            value={textPass}
            placeholder="Gồm 2-40 ký tự"
            placeholderTextColor="#717070"
            secureTextEntry={passwordVisibility}
            onChangeText={(value) => setPass(value)}
          />

          {textPass && (
            <TouchableOpacity
              style={styles.closeButtonParent}
              onPress={() => setPass("")}
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
            disabled={disabled}
            style={[styles.btn, { opacity: disabled ? 0.3 : 1 }]}
          >
            <Text style={{ color: "white" }}>Đăng Ký</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
