import React, { useCallback, useEffect, useState } from "react";
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

import { useNavigation } from "@react-navigation/native";
import SearchInput from "../components/SearchInput";
import { LinearGradient } from "expo-linear-gradient";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function ModalScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <View style={{ height: headerHeight }}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#257afe", "#00bafa"]}
          style={[StyleSheet.absoluteFill, { height: headerHeight }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={26} color="white" />
            </Pressable>

            <SearchInput search={search} setSearch={setSearch} />

            <Pressable
              onPress={() => (
                navigation.navigate("QRScreen"), navigation.reset
              )}
            >
              <MaterialIcons name="qr-code-scanner" size={24} color="white" />
            </Pressable>
          </View>
        </LinearGradient>
      </View>

      {search ? (
        <View>
          <Text style={{ padding: 12 }}>Tìm bạn qua số điện thoại</Text>
        </View>
      ) : (
        <View>
          <Text style={{ padding: 12 }}>Liên hệ đã tìm</Text>
          <HistorySearchItem />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    elevation: 4,
    paddingStart: 10,
    paddingEnd: 15,
    position: "absolute",
    bottom: Platform.OS === "ios" ? -4 : -4,
  },
});
