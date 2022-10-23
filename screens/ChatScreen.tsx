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
import {
  conversationSelector,
  getList,
} from "../store/reducers/conversationSlice";
import { getMessages } from "../store/reducers/messageSlice";
import jwt from "../utils/jwt";

export default function TabTwoScreen() {
  const dispatch = useAppDispatch();

  const conversations = useAppSelector(conversationSelector);

  const user = { _id: jwt.getUserId() };

  useEffect(() => {
    if (!user._id) return;
    dispatch(getList({ name: "", type: 0 }));
  }, [dispatch]);

  useEffect(() => {
    if (!user._id) return;
    dispatch(getMessages(user._id));
  }, [dispatch]);

  return (
    <View style={styles.page}>
      <StatusBar backgroundColor="#3399FF" />
      {conversations.isLoading ? (
        <ActivityIndicator style={{ paddingTop: 20 }} />
      ) : (
        <FlatList
          data={conversations.conversations}
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
