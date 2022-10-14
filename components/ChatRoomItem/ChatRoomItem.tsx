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
import {
  useGetMyFriendByConversationIdQuery,
  useGetUserQuery,
} from "../../generated/graphql";

export default function ChatRoomItem({ chatRoom }) {
  // const user = chatRoom.users[1];

  const navigation = useNavigation();

  console.log("chat Room", chatRoom);

  const { loading, error, data } = useGetMyFriendByConversationIdQuery({
    variables: {
      conversationId: chatRoom._id,
    },
  });

  console.log("data", data?.getMyFriendByConversationId);

  const onPress = () => {
    navigation.navigate("ChatRoom", {
      conversationId: chatRoom._id,
      name: data?.getMyFriendByConversationId.name,
    });
  };

  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useGetUserQuery({
    fetchPolicy: "no-cache",
    variables: {
      userId: data?.getMyFriendByConversationId.userId as string,
    },
  });

  return (
    <Pressable style={styles.container} onPress={() => onPress()}>
      {dataUser?.getUser.avatar ? (
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
      )}

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {data?.getMyFriendByConversationId.name}
          </Text>
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
