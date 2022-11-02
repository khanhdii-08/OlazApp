import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { useAppDispatch, useAppSelector } from "../store";
import { getMessages, messageSelector } from "../store/reducers/messageSlice";
import { conversationSelector } from "../store/reducers/conversationSlice";
import MessageDivider from "../components/Message/MessageDivider";

export interface Message {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}

export default function ChatRoomScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const scrollViewRef: any = useRef();

  const { conversation, conversationId } = useAppSelector(conversationSelector);
  const { messages, isLoading } = useAppSelector(messageSelector);

  const [apiParams, setApiParams] = useState({
    page: 0,
    size: 20,
  });

  useEffect(() => {
    navigation.setOptions({ title: conversation.name });
  }, [false]);

  const goToNextPage = async () => {
    const currentPage = apiParams.page;
    const totalPages = messages.totalPages;

    console.log(currentPage, totalPages);

    if (currentPage < totalPages - 1) {
      const nextPage = currentPage + 1;
      const newParam = { ...apiParams, page: nextPage };

      await dispatch(getMessages({ conversationId, paramsApi: newParam }));

      setApiParams(newParam);
    }
  };

  return (
    <View style={styles.page}>
      {!messages.data ? (
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
          onEndReached={() => {
            goToNextPage();
          }}
          inverted
          data={[...messages.data].reverse()}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <Message index={index} message={item} />
          )}
          initialNumToRender={20}
          ListFooterComponent={() =>
            isLoading ? <MessageDivider isLoading={true} /> : null
          }
          ref={scrollViewRef}
          // onContentSizeChange={() =>
          //   scrollViewRef.current.scrollToOffset({ animated: true, offset: 0 })
          // }
        />
      )}
      <MessageInput
        conversationId={conversationId}
        scrollViewRef={scrollViewRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "rgba(226,233,241,255)",
    // backgroundColor: "#e1e4ea",
    paddingBottom: 10,
  },
});
