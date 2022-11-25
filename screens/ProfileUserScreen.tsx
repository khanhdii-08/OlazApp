import { RootRouteProps, RootStackScreenProps } from "../types";
import { useRoute } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import { useAppSelector } from "../store";
import { useNavigation } from "@react-navigation/native";
import { meSelector } from "../store/reducers/meSlice";

import React, { useEffect, useState } from "react";
import userApi from "../service/userService";

const ProfileUserScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RootRouteProps<"ProfileUser">>();
  const [user, setUser] = useState<any>(null);

  const idUser = route.params.userId;

  useEffect(() => {
    userApi.fetchUserById(idUser).then((res) => setUser(res.data));
  }, []);

  // console.log("user", user);

  return (
    <>
      {user ? (
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/images/default-cover-image.jpg")}
            resizeMode="cover"
            style={styles.image}
          >
            <Pressable style={styles.btnHeader}>
              <Ionicons
                name="chevron-back"
                size={26}
                color="white"
                style={styles.btnBack}
                onPress={() => navigation.navigate("Root")}
              />
              <View style={styles.btnGroup}>
                <Ionicons name="call-outline" size={26} color="white" />
              </View>
            </Pressable>
          </ImageBackground>
          <View style={styles.Avatar}>
            {user.avatar.length ? (
              <Avatar
                rounded
                overlayContainerStyle={{
                  backgroundColor: user?.avatarColor,
                }}
                source={{
                  uri: user.avatar,
                }}
                size={120}
              />
            ) : (
              <Avatar
                rounded
                title={user.name[0]}
                overlayContainerStyle={{
                  backgroundColor: user.avatarColor,
                }}
                size={100}
              />
            )}
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textNameUser}>{user.name}</Text>
              <AntDesign
                name="edit"
                size={24}
                color="black"
                style={{ paddingLeft: 10 }}
              />
            </View>
          </View>
          <View
            style={{
              paddingTop: 80,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View>
              {user.status === "FRIEND" && (
                <TouchableOpacity style={[styles.btnEdit, { opacity: 1 }]}>
                  <View style={styles.iconEdit}>
                    <AntDesign name="message1" size={24} color="#0099FF" />
                    <Text style={styles.textEdit}> Nhắn Tin</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <View>
              {user.status === "NOT_FRIEND" ? (
                <TouchableOpacity
                  style={[styles.btnAdd, { opacity: 1, width: 300 }]}
                >
                  <AntDesign name="adduser" size={24} color="black" />
                  <Text>Kêt bạn</Text>
                </TouchableOpacity>
              ) : (
                <View>
                  {user.status === "FOLLOWER" ? (
                    <View>
                      <TouchableOpacity
                        style={[styles.btnAdd, { opacity: 1, width: 100 }]}
                      >
                        <Text>Từ chối</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.btnAdd,
                          {
                            opacity: 1,
                            width: 100,
                            backgroundColor: "#B0E2FF",
                          },
                        ]}
                      >
                        <Text style={{ color: "#0099FF" }}>Đồng ý</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default ProfileUserScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    //flex: 1,
  },
  image: {
    height: 290,
    width: "100%",
    flexDirection: "column",
  },
  textNameUser: {
    fontWeight: "600",
    fontSize: 25,
    paddingLeft: 10,
    color: "black",
  },
  Avatar: {
    flex: 1,
    height: "10%",
    alignItems: "center",
    marginTop: "55%",
    marginLeft: "25%",
    marginBottom: 0,
    position: "absolute",
    borderRadius: 50,
  },
  btnBack: {
    paddingTop: 45,
    paddingLeft: 10,
  },
  btnGroup: {
    flex: 1,
    paddingTop: 45,
    alignItems: "flex-end",
    marginEnd: 25,
  },
  btnHeader: {
    flexDirection: "row",
  },
  textEdit: {
    color: "#0099FF",
    fontWeight: "600",
    fontSize: 15,
  },
  btnEdit: {
    width: 300,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 30,
    backgroundColor: "#B0E2FF",
  },
  btnSend: {
    width: 10,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 30,
    backgroundColor: "#B0E2FF",
  },
  iconEdit: {
    flexDirection: "row",
  },
  btnAdd: {
    flexDirection: "row",
    backgroundColor: "#B0E2FF",
    height: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
