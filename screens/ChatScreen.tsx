import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  StatusBar,
} from "react-native";

import ChatRoomItem from "../components/ChatRoomItem";
import { conversations } from "../service/conversationService";

export default function TabTwoScreen() {
  const [listConversation, setListConversation] = useState([]);

  useEffect(() => {
    conversations().then((res) => setListConversation(res));
  }, []);

  return (
    <View style={styles.page}>
      <StatusBar backgroundColor="#3399FF" />
      <FlatList
        data={listConversation}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        showsVerticalScrollIndicator={false}

        // ListHeaderComponent={() => (
        //   <FlatList
        //     data={ChatRoomData}
        //     renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        //     showsVerticalScrollIndicator={false}
        //     horizontal
        //   />
        // )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
