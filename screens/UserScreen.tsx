import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../contexts/AuthContext";
import JWTManager from "../utils/jwt";
import { logout } from "../service/authService";

export default function () {
  const navigation = useNavigation();

  const { isAuthenticated, logoutClient } = useAuthContext();

  // console.log("duy : ", JWTManager.getUserId()?.toString() as string);

  const onPress = async () => {
    logoutClient();
    // await logout();
    navigation.navigate("Security");
  };

  return (
    <View style={styles.container}>
      <Text>{JWTManager.getUserId()?.toString()}</Text>

      <Pressable onPress={onPress}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
