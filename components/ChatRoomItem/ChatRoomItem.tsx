import { Text, View, StyleSheet, Image, TextInput } from "react-native";

import styles from "./styles";

export default function ChatRoomItem() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/graham.jpg",
        }}
        style={styles.image}
      />
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>4</Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>Phạm Lê Khánh Duy</Text>
          <Text style={styles.text}>12:55 PM</Text>
        </View>
        <View>
          <Text numberOfLines={1} style={styles.text}>
            Hello Duy
            vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </Text>
        </View>
      </View>
    </View>
  );
}
