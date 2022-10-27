import React, { useCallback, useEffect, useRef, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Platform,
  BackHandler,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import HistorySearchItem from "../components/HistorySearchItem/HistorySearchItem";

import SearchInput from "../components/SearchInput";
import { LinearGradient } from "expo-linear-gradient";

import { RootStackScreenProps } from "../types";
import {
  getUserByUserName,
  resetUserSlice,
  userSelector,
} from "../store/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "../store";
import UserSearchItem from "../components/UserSearchItem/UserSearchItem";

export default function ModalScreen({
  navigation,
}: RootStackScreenProps<"Search">) {
  // const navigation = useNavigation();

  const user = useAppSelector(userSelector);

  // const props = { avatar, avatarColor, isLoading, name, status, username };
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");

  const headerSearch = ({ navigation }: { navigation: any }) => (
    <LinearGradient
      // Background Linear Gradient
      colors={["#257afe", "#00bafa"]}
      style={StyleSheet.absoluteFill}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            dispatch(resetUserSlice(null)), navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back" size={26} color="white" />
        </Pressable>
        <SearchInput search={search} setSearch={setSearch} />
        <Pressable
          onPress={() => (navigation.navigate("QRScreen"), navigation.reset)}
        >
          <MaterialIcons name="qr-code-scanner" size={24} color="white" />
        </Pressable>
      </View>
    </LinearGradient>
  );

  navigation.setOptions({
    headerBackground: () => headerSearch({ navigation }),
  });

  useCallback(() => {
    headerSearch({ navigation });
  }, [search]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  const checkPhone = (search: string) => {
    let phone_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

    if (phone_regex.test(search) && search.length === 10) return true;
    else {
      dispatch(resetUserSlice(null));
      return false;
    }
  };

  const findMenber = (search: string) => {
    if (checkPhone(search)) {
      dispatch(getUserByUserName(search));
    } else {
    }
  };

  useEffect(() => {
    findMenber(search);
  }, [search]);

  return (
    <View style={styles.container}>
      {search ? (
        <View>
          <Text style={{ padding: 12 }}>Tìm bạn qua số điện thoại</Text>
          {user.isLoading ? (
            <ActivityIndicator />
          ) : (
            <View>
              <UserSearchItem props={user} />
            </View>
          )}
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
