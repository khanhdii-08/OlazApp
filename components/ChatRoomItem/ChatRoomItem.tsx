import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from "react-native";

import { Avatar } from "react-native-elements";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function ChatRoomItem({ chatRoom }) {
  // const user = chatRoom.users[1];

  const navigation = useNavigation();

  console.log("chat Room", chatRoom);

  const onPress = () => {
    // navigation.navigate("ChatRoom", {
    //   conversationId: chatRoom._id,
    //   name: data?.getMyFriendByConversationId.name,
    // });
  };

  return (
    <Pressable style={styles.container} onPress={() => onPress()}>
      {/* {dataUser?.getUser.avatar ? (
        <Avatar
          size={45}
          rounded
          source={{
            uri: dataUser.getUser.avatar,
          }}
          activeOpacity={0.2}
          containerStyle={{
            marginRight: 10,
          }}
        />
      ) : (
        <Avatar
          size={45}
          rounded
          title={dataUser?.getUser.name[0]}
          activeOpacity={0.2}
          containerStyle={{
            backgroundColor: "#BDBDBD",
            marginRight: 10,
          }}
        />
      )} */}

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          {/* <Text numberOfLines={1} style={styles.name}>
            {data?.getMyFriendByConversationId.name}
          </Text> */}
          {/* {chatRoom.newMessages ? (
            <Text style={styles.textBold}>
              {data?.getMyFriendByConversationId.createdAt}
            </Text>
          ) : (
            <Text style={styles.text}>{chatRoom.lastMessage.createdAt}</Text>
          )} */}
        </View>
        <View>
          {/* {chatRoom.newMessages ? (
            <Text
              numberOfLines={1}
              style={[styles.textBold, { maxWidth: 280 }]}
            >
              {chatRoom.lastMessage.content}
            </Text>
          ) : (
            <Text numberOfLines={1} style={styles.text}>
              {chatRoom.lastMessage.content}
            </Text>
          )}
          {chatRoom.newMessages && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
            </View>
          )} */}
        </View>
      </View>
    </Pressable>
  );
}
