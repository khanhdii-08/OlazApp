import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";

const ItemInvite = ({ friendInvite }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Avatar
          rounded
          title={friendInvite.name[0]}
          overlayContainerStyle={{
            backgroundColor: friendInvite.avatarColor,
          }}
          source={
            friendInvite.avatar.length
              ? {
                  uri: friendInvite.avatar,
                }
              : {}
          }
          size={45}
        />
        <View style={styles.containerRight}>
          <Text style={styles.text}>{friendInvite.name}</Text>
          <View style={styles.btnContainer}>
            <View style={{ paddingRight: 20 }}>
              <Pressable style={[styles.btn, { backgroundColor: "#dbdbdb" }]}>
                <Text>Từ chối</Text>
              </Pressable>
            </View>
            <View>
              <Pressable style={styles.btn}>
                <Text style={{ color: "#0091ff" }}>Đồng ý</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemInvite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerRight: {
    paddingLeft: 20,
    flexDirection: "column",
  },
  text: {
    fontWeight: "bold",
    height: 35,
  },
  btnContainer: {
    flexDirection: "row",
  },
  btn: {
    height: 35,
    width: 120,
    backgroundColor: "#d6efff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
});
