import React, { useCallback, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Platform,
  BackHandler,
} from "react-native";
import HistorySearchItem from "../components/HistorySearchItem/HistorySearchItem";
import SearchInput from "../components/SearchInput";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function ModalScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
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
    paddingTop: Platform.OS === "ios" ? 20 : 39.4,
    elevation: 4,
    paddingStart: 10,
    paddingEnd: 15,
  },
});
