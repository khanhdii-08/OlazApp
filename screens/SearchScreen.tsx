import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text, Pressable } from "react-native";

import HistorySearchItem from "../components/HistorySearchItem/HistorySearchItem";
import SearchInput from "../components/SearchInput";
import { RootStackScreenProps } from "../types";

export default function ModalScreen({
  navigation,
}: RootStackScreenProps<"Search">) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="white" />
        </Pressable>
        <SearchInput />
        <MaterialIcons name="qr-code-scanner" size={24} color="white" />
      </View>
      <Text style={{ padding: 12 }}>Liên hệ đã tìm</Text>
      <HistorySearchItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#0091ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 65,
    paddingTop: 20,
    elevation: 4,
    paddingStart: 10,
    paddingEnd: 15,
  },
});
