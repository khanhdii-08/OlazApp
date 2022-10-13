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

import ChatRoomData from "../assets/dummy-data/ChatRooms";
import { useGetListConversationQuery } from "../generated/graphql";

const chatRoom1 = ChatRoomData[0];
const chatRoom2 = ChatRoomData[1];

export default function TabTwoScreen() {

  const { loading, error, data } = useGetListConversationQuery({
    fetchPolicy: "no-cache"
  })

  

  return (
    <View style={styles.page}>
      <StatusBar backgroundColor="#3399FF" />
      <FlatList
        data={data?.getListConversation}
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
