import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import FriendItem from "../components/FriendItem/FriendItem";
import { useGetFriendsQuery } from "../generated/graphql";

export default function FriendScreen() {
  const { loading, error, data } = useGetFriendsQuery({
    fetchPolicy: "no-cache",
  });

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator />
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
      <FlatList
        data={data?.getFriends}
        renderItem={({ item }) => <FriendItem friendItem={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
