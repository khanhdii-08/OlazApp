import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import JWTManager from "../utils/jwt";
import { disconnect } from "../utils/socketClient";
import { useAppDispatch } from "../store";
import { resetAuthSlice } from "../store/reducers/authSlice";
import { useAuthContext } from "../contexts/AuthContext";
import { resetConversationSlice } from "../store/reducers/conversationSlice";
import { resetMessageSlice } from "../store/reducers/messageSlice";

export default function () {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { logoutClient } = useAuthContext();

  const logout = (dispatch: any) => {
    if (dispatch) {
      dispatch(resetAuthSlice(null));
      dispatch(resetConversationSlice(null));
      dispatch(resetMessageSlice(null));
    }
    disconnect();
  };

  const onPress = async () => {
    logoutClient();
    await logout(dispatch);
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
