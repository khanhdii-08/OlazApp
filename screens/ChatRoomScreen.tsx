import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";

export default function ChatRoomScreen() {
  const route = useRoute();

  // console.log("name", route.params?.conversationId);

  const navigation = useNavigation();

  // const { data, error, loading } = useGetMessagesQuery({
  //   fetchPolicy: "no-cache",
  //   variables: {
  //     getMessagesConversationId2: route.params?.conversationId,
  //   },
  // });

  // const {
  //   data: dataUser,
  //   error: errorUser,
  //   loading: loadingUser,
  // } = useGetUserQuery({
  //   fetchPolicy: "no-cache",
  //   variables: {
  //     userId: route.params?.id,
  //   },
  // });

  // console.log(dataUser?.getUser);

  // navigation.setOptions({ title: route.params?.name });

  return (
    <SafeAreaView style={styles.page}>
      {/* <FlatList
        data={data?.getMessages}
        renderItem={({ item }) => <Message message={item} />}
      />
      <MessageInput /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "rgba(226,233,241,255)",
    // backgroundColor: "#e1e4ea",
  },
});
