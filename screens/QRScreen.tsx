import { StyleSheet, Text, View } from "react-native";
import React from "react";

const QRScreen = () => {
  return (
    <View style={styles.container}>
      <Text>QRScreen</Text>
    </View>
  );
};

export default QRScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "while",
  },
});
