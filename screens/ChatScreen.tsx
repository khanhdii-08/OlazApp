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

export default async function TabTwoScreen() {
  const getListConversation = async () => {
    try {
      const result = await conversations();
      // console.log("result", result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  };

  getListConversation();

  return (
    <View style={styles.page}>
      <StatusBar backgroundColor="#3399FF" />
      {/* <FlatList
        data={result}
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
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
