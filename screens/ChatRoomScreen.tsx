import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { useAppDispatch, useAppSelector } from "../store";
import { getMessages, messageSelector } from "../store/reducers/messageSlice";
import { conversationSelector } from "../store/reducers/conversationSlice";

export default function ChatRoomScreen() {
  const navigation = useNavigation();

  let listViewRef: any;

  const { conversation, conversationId } = useAppSelector(conversationSelector);

  navigation.setOptions({ title: conversation.name });

  const { messages, isLoading } = useAppSelector(messageSelector);

  // useEffect(() => {
  //   listViewRef.scrollToIndex({
  //     animated: true,
  //     index: 1,
  //     viewOffset: 0,
  //     viewPosition: 0.5,
  //   });
  // }, []);

  return (
    <SafeAreaView style={styles.page}>
      {isLoading ? (
        <ActivityIndicator
          style={{
            paddingTop: 20,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      ) : (
        <FlatList
          inverted
          data={[...messages.data].reverse()}
          // keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Message message={item} />}
          // ref={(ref) => {
          //   listViewRef = ref;
          // }}
        />
      )}
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
