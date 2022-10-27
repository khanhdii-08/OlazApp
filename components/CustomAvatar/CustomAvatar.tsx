import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";

const CustomAvatar = ({ props }: any) => {
  const { avatar, name, totalMembers, avatarColor } = props;

  const arr = Array.from(Array(totalMembers), (_, index) => index + 1);

  return typeof avatar === "string" ? (
    <Avatar
      rounded
      title={name[0]}
      overlayContainerStyle={{
        backgroundColor: avatarColor,
      }}
      source={
        avatar.length
          ? {
              uri: avatar,
            }
          : {}
      }
      size="medium"
    />
  ) : (
    <View style={styles.container}>
      {arr.map((value) =>
        value < 4 ? (
          <View key={value}>
            <Avatar
              rounded
              // title={commonFuc.getAcronym(name)}
              overlayContainerStyle={{
                backgroundColor: avatar[value - 1].avatarColor,
              }}
              icon={{ name: "person" }}
              source={
                avatar[value - 1]?.avatar?.length > 0
                  ? {
                      uri: avatar[value - 1].avatar,
                    }
                  : {}
              }
              containerStyle={styles.avatar}
              titleStyle={styles.title}
            />
          </View>
        ) : value === 4 ? (
          <View key={value}>
            <Avatar
              rounded
              title={totalMembers - 3 > 99 ? "99+" : `+${totalMembers - 3}`}
              overlayContainerStyle={{ backgroundColor: "#7562d8" }}
              source={{}}
              containerStyle={[styles.avatar]}
              titleStyle={styles.title}
            />
          </View>
        ) : null
      )}
    </View>
  );
};

export default CustomAvatar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: 50,
  },
  avatar: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 10,
  },
});
