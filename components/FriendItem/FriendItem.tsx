import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  conversationSelector,
  setCurrentConversation,
} from "../../store/reducers/conversationSlice";
import { getConversationByUserId } from "../../utils/functionGlobal";
import { getMessages } from "../../store/reducers/messageSlice";
import { useNavigation } from "@react-navigation/native";
import { ParamsApi } from "../ChatRoomItem/ChatRoomItem";

const FriendItem = ({ friendItem }: { friendItem: any }) => {
  // console.log("data", friendItem);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { conversations } = useAppSelector(conversationSelector);

  const paramsApi: ParamsApi = {
    page: 0,
    size: 20,
  };

  const onPressMessage = () => {
    const conversation = getConversationByUserId(friendItem._id, conversations);
    if (conversation) {
      const conversationId: string = conversation._id;
      dispatch(setCurrentConversation(conversation));
      dispatch(getMessages({ conversationId, paramsApi }));
      navigation.navigate("ChatRoom");
    }
  };

  return (
    <Pressable style={styles.container} onPress={onPressMessage}>
      <View style={styles.containerLeft}>
        <Avatar
          rounded
          title={friendItem.name[0]}
          overlayContainerStyle={{
            backgroundColor: friendItem.avatarColor,
          }}
          source={
            friendItem.avatar.length
              ? {
                  uri: friendItem.avatar,
                }
              : {}
          }
          size={45}
        />
        <Text style={styles.text}>{friendItem.name}</Text>
      </View>

      <View style={styles.containerRight}>
        <Feather name="phone" size={24} color="black" />
        <AntDesign
          name="videocamera"
          size={24}
          color="black"
          style={{ marginLeft: 24, marginRight: 34 }}
        />
      </View>
    </Pressable>
  );
};

export default FriendItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  text: { fontWeight: "bold", fontSize: 18, marginLeft: 10 },
  containerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
});
