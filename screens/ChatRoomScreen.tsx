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

  // console.log(message);

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        onEndReached={() => {
          // goToNextPage();
        }}
        data={message.messages.data}
        renderItem={({ item }) => <Message message={item} />}
        // inverted
        // contentContainerStyle={{ paddingBottom: 15 }}
      />
      {/* <MessageInput /> */}
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
