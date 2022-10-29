import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";
import { Feather, AntDesign } from "@expo/vector-icons";

const FriendItem = ({ friendItem }: { friendItem: any }) => {
  // console.log("data", friendItem);

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <Avatar
          rounded
          title={friendItem.name[0]}
          overlayContainerStyle={{
            backgroundColor: friendItem.avatarColor,
          }}
          source={
            friendItem.avatar.length
              ? {
                  uri: friendItem.avatar,
                }
              : {}
          }
          size={45}
        />
        <Text style={styles.text}>{friendItem.name}</Text>
      </View>

      <View style={styles.containerRight}>
        <Feather name="phone" size={24} color="black" />
        <AntDesign
          name="videocamera"
          size={24}
          color="black"
          style={{ marginLeft: 24, marginRight: 34 }}
        />
      </View>
    </View>
  );
};

export default FriendItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  text: { fontWeight: "bold", fontSize: 18, marginLeft: 10 },
  containerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
});
