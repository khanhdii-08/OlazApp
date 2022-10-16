import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import FriendItem from "../components/FriendItem/FriendItem";

export default function FriendScreen() {
  return (
    <View style={styles.container}>
      {/* <FlatList
        data={data?.getFriends}
        renderItem={({ item }) => <FriendItem friendItem={item} />}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
