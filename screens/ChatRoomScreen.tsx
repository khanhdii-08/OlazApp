import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { useAppSelector } from "../store";
import { messageSelector } from "../store/reducers/messageSlice";
import { conversationSelector } from "../store/reducers/conversationSlice";

export default function ChatRoomScreen() {
  const navigation = useNavigation();

  const conversation = useAppSelector(conversationSelector);

  navigation.setOptions({ title: conversation.conversation.name });

  const message = useAppSelector(messageSelector);

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={message.messages.data}
        renderItem={({ item }) => <Message message={item} />}
        refreshing={message.isLoading}
        inverted
        // ref={ref => this.flatList = ref}
      />
      <MessageInput conversationId={conversation.conversationId} />
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
