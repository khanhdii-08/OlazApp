import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Animated,
} from "react-native";
import React, { useRef } from "react";
import { Avatar } from "react-native-elements";
import { Feather, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  conversationSelector,
  setCurrentConversation,
} from "../../store/reducers/conversationSlice";
import { getConversationByUserId } from "../../utils/functionGlobal";
import { getMessages } from "../../store/reducers/messageSlice";
import { useNavigation } from "@react-navigation/native";
import { ParamsApi } from "../ChatRoomItem/ChatRoomItem";
import { Swipeable } from "react-native-gesture-handler";
import { deleteFriendAsync } from "../../store/reducers/friendSlice";

const FriendItem = ({ friendItem }: { friendItem: any }) => {
  // console.log("data", friendItem);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { conversations } = useAppSelector(conversationSelector);

  const paramsApi: ParamsApi = {
    page: 0,
    size: 20,
  };

  const sipeRef: any = useRef();
  const onPressMessage = () => {
    const conversation = getConversationByUserId(friendItem._id, conversations);
    if (conversation) {
      const conversationId: string = conversation._id;
      dispatch(setCurrentConversation(conversation));
      dispatch(getMessages({ conversationId, paramsApi }));
      navigation.navigate("ChatRoom");
    }
  };

  const onPressDelete = () => {
    sipeRef.current.close();
    dispatch(deleteFriendAsync(friendItem._id));
  };

  const rightSipe = () => {
    return (
      <Pressable onPress={onPressDelete} style={styles.deleteFriend}>
        <MaterialIcons name="delete" size={24} color="white" />
        <Animated.Text style={{ color: "white" }}>Xóa</Animated.Text>
      </Pressable>
    );
  };

  return (
    <Swipeable ref={sipeRef} renderRightActions={rightSipe}>
      <View style={styles.container}>
        <Pressable onPress={onPressMessage}>
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
        </Pressable>

        <View style={styles.containerRight}>
          <Pressable onPress={() => Alert.alert("gọi")}>
            <Feather name="phone" size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => Alert.alert("gọi video")}>
            <AntDesign
              name="videocamera"
              size={24}
              color="black"
              style={{ marginLeft: 24, marginRight: 34 }}
            />
          </Pressable>
        </View>
      </View>
    </Swipeable>
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
  deleteFriend: {
    backgroundColor: "red",
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});
