import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import ImageView from "react-native-image-viewing";

export default function () {
  const [visible, setIsVisible] = useState(false);

  const images = [
    {
      uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    },
    {
      uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
    },
    {
      uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
    },
  ];

  return (
    <View>
      <Pressable onPress={() => setIsVisible(true)}>
        <Text>Onclick</Text>
      </Pressable>
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
