import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { messages } from "../service/messageService";

export default function ChatRoomScreen() {
  const route = useRoute();

  const navigation = useNavigation();
  navigation.setOptions({ title: route.params?.name });

  const [message, setMessage] = useState([]);

  useEffect(() => {
    messages(route.params?.conversationId).then((res) => setMessage(res));
  }, [message]);

  // useEffect(() => {
  //   messages(route.params?.conversationId).then((res) => setMessage(res));
  // }, [message]);

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={message.data}
        renderItem={({ item }) => <Message message={item} />}
      />
      <MessageInput conversationId={route.params?.conversationId} />
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
