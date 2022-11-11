import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import dateUtils from "../../utils/dateUtils";
import ImageView from "react-native-image-viewing";
import { Video } from "expo-av";

const win = Dimensions.get("window");
const ratio = win.width / 541;

const GroupImage = (props: any) => {
  const { item, isMe } = props;

  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState("");

  const handleViewingImage = (link: string) => {
    setVisible(true);
    setUrl(link);
  };

  const checkType = (content: string) => {
    const splitTempt = content.split(".");
    const fileExtension = splitTempt[splitTempt.length - 1];
    if (fileExtension === "mp4") return "VIDEO";
    return "IMAGE";
  };

  const listImage = item.type === "GROUP_IMAGE" && item.content?.split(";");
  listImage.splice(listImage.length - 1, 1);

  return (
    <View
      style={[
        styles.container,
        isMe ? styles.rightImageGroup : styles.leftImageGroup,
      ]}
    >
      <View style={styles.groupImage}>
        {listImage.map((link: string, index: number) => {
          return (
            <>
              {checkType(link) === "VIDEO" ? (
                <Video
                  key={link}
                  style={[styles.imageStyle, { width: "50%" }]}
                  source={{ uri: link }}
                  useNativeControls
                  isLooping
                  volume={1.0}
                />
              ) : (
                <TouchableOpacity
                  key={link}
                  onPress={() => {
                    handleViewingImage(link);
                  }}
                  style={{ width: "50%" }}
                >
                  <Image
                    source={{ uri: link }}
                    style={styles.imageStyle}
                    resizeMode="stretch"
                  />
                </TouchableOpacity>
              )}
            </>
          );
        })}
      </View>
      <Text style={{ color: "black", fontSize: 10 }}>
        {dateUtils.getTime(item.createdAt)}
      </Text>
      <ImageView
        images={[{ uri: url }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
};

export default GroupImage;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    maxWidth: "82%",
  },
  groupImage: {
    flexDirection: "row",
    flexWrap: "wrap",

    // justifyContent: "space-between",
  },
  imageStyle: {
    height: 362 * ratio, //362 is actual height of image
  },
  leftImageGroup: {
    marginLeft: 10,
    marginRight: "auto",
  },
  rightImageGroup: {
    marginLeft: "auto",
    marginRight: 10,
  },
});
