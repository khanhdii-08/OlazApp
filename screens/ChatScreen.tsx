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
import { useGetListConversationQuery } from "../generated/graphql";

export default function TabTwoScreen() {
  const { loading, error, data } = useGetListConversationQuery({
    fetchPolicy: "no-cache",
  });

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
