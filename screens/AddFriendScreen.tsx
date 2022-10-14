import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import React from "react";

export default function AddFriendScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>Thêm bạn bằng số điện thoại</Text>
      <View>
        <TextInput
          placeholder="Nhập số điện thoại"
          placeholderTextColor="gray"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 10 },
});
