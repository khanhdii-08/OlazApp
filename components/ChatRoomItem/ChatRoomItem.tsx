import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useGetMyFriendByConversationIdQuery } from "../../generated/graphql";

export default function ChatRoomItem({ chatRoom }) {
  // const user = chatRoom.users[1];

  const navigation = useNavigation();

  // console.log(chatRoom)

  const { loading, error, data } = useGetMyFriendByConversationIdQuery({
    variables: {
        conversationId: chatRoom._id
    },
});

const onPress = () => {
  navigation.navigate("ChatRoom", { id: chatRoom._id });
};


  return (
    <Pressable style={styles.container} onPress={() => onPress()}>
      <Image
        source={{
          uri: "https://previews.123rf.com/images/panyamail/panyamail1809/panyamail180900343/109879063-user-avatar-icon-sign-profile-symbol.jpg",
        }}
        style={styles.image}
      />
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
