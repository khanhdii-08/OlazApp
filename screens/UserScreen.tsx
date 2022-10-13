import { View, Text, StyleSheet, Pressable } from "react-native";
import { useHelloQuery } from "../generated/graphql";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../contexts/AuthContext";
import { useLogoutMutation } from "../generated/graphql";
import JWTManager from "../utils/jwt";

export default function () {
  const navigation = useNavigation();

  const { isAuthenticated, logoutClient } = useAuthContext();
  const [logoutServer, _] = useLogoutMutation();

  const onPress = async () => {

    logoutClient();
    const result = await logoutServer({
      variables: {
        userId: JWTManager.getUserId()?.toString() as string,
      },
    });
    if (result.data?.logout.success) {
      navigation.navigate("Security");
      // window.location.href = "/Security"
    }
  };

  const { data, error, loading } = useHelloQuery({
    fetchPolicy: "no-cache",
  });
  if (loading)
    return (
      <View style={styles.container}>
        <Text>loading...</Text>
      </View>
    );
  if (error)
    return (
      <View style={styles.container}>
        <Text>Error: {JSON.stringify(error)}</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <Text>{data?.hello}</Text>

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
