import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { useAppDispatch, useAppSelector } from "../store";
import { getMessages, messageSelector } from "../store/reducers/messageSlice";
import { conversationSelector } from "../store/reducers/conversationSlice";
import jwt from "../utils/jwt";

export default function ChatRoomScreen() {
  const navigation = useNavigation();

  const { conversation, conversationId } = useAppSelector(conversationSelector);

  navigation.setOptions({ title: conversation.name });

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
      <MessageInput conversationId={conversationId} />
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
