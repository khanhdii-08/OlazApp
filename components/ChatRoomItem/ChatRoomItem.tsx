import { Text, View, StyleSheet, Image, TextInput } from "react-native";

import styles from "./styles";

export default function ChatRoomItem({ chatRoom }) {
  const user = chatRoom.users[1];

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: user.imageUri,
        }}
        style={styles.image}
      />
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {user.name}
          </Text>
          {chatRoom.newMessages ? (
            <Text style={styles.textBold}>
              {chatRoom.lastMessage.createdAt}
            </Text>
          ) : (
            <Text style={styles.text}>{chatRoom.lastMessage.createdAt}</Text>
          )}
        </View>
        <View>
          {chatRoom.newMessages ? (
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
          )}
        </View>
      </View>
    </View>
  );
}
