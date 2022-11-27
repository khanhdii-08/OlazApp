import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";
import { getAcronym } from "../../utils/functionGlobal";

const ItemMeInvite = (props: any) => {
  const { friendMeInvite } = props;

  // console.log(friendMeInvite);
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Avatar
          rounded
          title={getAcronym(friendMeInvite.name)}
          overlayContainerStyle={{
            backgroundColor: friendMeInvite.avatarColor,
          }}
          source={
            friendMeInvite.avatar.length
              ? {
                  uri: friendMeInvite.avatar,
                }
              : {}
          }
          size={45}
        />

        <View style={styles.containerRight}>
          <Text style={styles.text}>{friendMeInvite.name}</Text>
          <View>
            <Pressable style={styles.btn}>
              <Text>Thu hồi</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemMeInvite;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerRight: {
    flex: 1,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontWeight: "bold",
    fontSize: 17,
    padding: 5,
  },
  btn: {
    height: 35,
    width: 120,
    backgroundColor: "#dbdbdb",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
});
