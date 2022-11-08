import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import CustomAvatar from "../CustomAvatar/CustomAvatar";

const UserSearchItem = ({ props }: any) => {
  const { avatar, avatarColor, name, status, username } = props;

  const totalMembers: number = 0;
  const dataAvatar = { avatar, name, totalMembers, avatarColor };

  return (
    <Pressable style={styles.container}>
      <CustomAvatar props={dataAvatar} />
      <View style={styles.rightContainer}>
        <View>
          <View>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View style={styles.textContent}>
            <Text style={styles.text}>Số điện thoại : </Text>
            <Text style={{ color: "#0091ff" }}>{username}</Text>
          </View>
        </View>

        {status === "NOT_FRIEND" ? (
          <Pressable style={styles.btn}>
            <Text style={{ color: "#0091ff" }}>Kết bạn</Text>
          </Pressable>
        ) : (
          <View>
            {status === "FOLLOWER" ? (
              <Pressable style={styles.btn}>
                <Text style={{ color: "#0091ff" }}>Đồng ý</Text>
              </Pressable>
            ) : (
              <></>
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default UserSearchItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 2,
    maxWidth: 270,
  },
  textContent: {
    flexDirection: "row",
  },
  text: {
    color: "grey",
    maxWidth: 280,
  },
  btn: {
    height: 30,
    width: 80,
    backgroundColor: "#bedff7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
