import { Text, View, StyleSheet, Image, TextInput } from "react-native";

import ChatRoomItem from "../components/ChatRoomItem";

export default function TabTwoScreen() {
  return (
    <View style={styles.page}>
      {/* <View>
        <TextInput style={styles.search} placeholder="Search"></TextInput>
      </View> */}
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  // search: {
  //   margin: 10,
  //   borderRadius: 5,
  //   padding: 6,
  //   color: "gray",
  //   textAlign: "center",
  // },
});
