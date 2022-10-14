import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useGetUserQuery } from "../../generated/graphql";
import JWTManager from "../../utils/jwt";

const FriendItem = ({ friendItem }) => {
  let id =
    friendItem.userIds[0] === (JWTManager.getUserId()?.toString() as string)
      ? friendItem.userIds[1]
      : friendItem.userIds[0];

  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useGetUserQuery({
    fetchPolicy: "no-cache",
    variables: {
      userId: id,
    },
  });

  console.log("user", dataUser?.getUser);

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        {dataUser?.getUser.avatar ? (
          <Avatar
            size={45}
            rounded
            source={{
              uri: dataUser.getUser.avatar,
            }}
            activeOpacity={0.2}
            containerStyle={{
              backgroundColor: "#BDBDBD",
              marginRight: 10,
            }}
          />
        ) : (
          <Avatar
            size={45}
            rounded
            title={dataUser?.getUser.name[0]}
            activeOpacity={0.2}
            containerStyle={{
              backgroundColor: "#BDBDBD",
              marginRight: 10,
            }}
          />
        )}
        <Text style={styles.text}>{dataUser?.getUser.name}</Text>
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
  text: { fontWeight: "bold", fontSize: 18 },
  containerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
});
