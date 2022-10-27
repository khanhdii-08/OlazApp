import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import ChatRoomItem from "../components/ChatRoomItem";
import { useAppDispatch, useAppSelector } from "../store";
import { conversationSelector } from "../store/reducers/conversationSlice";
import { getMessages } from "../store/reducers/messageSlice";
import jwt from "../utils/jwt";
import { init, socket } from "../utils/socketClient";

export default function TabTwoScreen() {
  const dispatch = useAppDispatch();

  const { isLoading, conversations } = useAppSelector(conversationSelector);

  const user = { _id: jwt.getUserId() };

  useEffect(() => {
    if (!user._id) return;
    dispatch(getMessages(user._id));
  }, []);

  return (
    <View style={styles.page}>
      <StatusBar backgroundColor="#3399FF" />
      {isLoading ? (
        <ActivityIndicator style={{ paddingTop: 20 }} />
      ) : (
        <FlatList
          data={conversations}
          renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
