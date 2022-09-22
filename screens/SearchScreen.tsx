import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text>Modal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
