import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
} from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch } from "../../store";
import {
  sendImage,
  sendImages,
  sendMessage,
} from "../../store/reducers/messageSlice";
import EmojiSelector from "react-native-emoji-selector";
import * as ImagePicker from "expo-image-picker";
import { useHeaderHeight } from "@react-navigation/elements";
import { Icon } from "react-native-elements";
import { useKeyboard } from "../../hooks/useKeyboard";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import { Video } from "expo-av";

const MessageInput = (props: any) => {
  const { conversationId, scrollViewRef } = props;

  const TYPE_MATCH_MEDIA = [
    "image/png",
    "image/jpeg",
    "image/gif",
    "video/mp4",
  ];

  const headerHeight = useHeaderHeight();

  const [images, setImage] = useState<Array<string> | null>(null);

  const [content, setContent] = useState("");

  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const dispatch = useAppDispatch();

  const formData = new FormData();

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      selectionLimit: 0,
      quality: 1,
    });

    if (!result.cancelled) {
      const listFile = [...result.selected].map((e) => e);
      imageUpload(listFile);
      // setImage(listFile);
    }
  };

  const imageUpload = (filePaths: any) => {
    const callback = (percentCompleted: any) => {
      console.log(percentCompleted);
    };

    if (filePaths.length > 1) {
      const formData = new FormData();

      filePaths.forEach((file: any) => {
        formData.append("files", {
          name: file.fileName,
          type: file.type,
          uri:
            Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri,
        });
      });

      const attachInfo = {
        type: "GROUP_IMAGE",
        conversationId: conversationId,
      };

      try {
        dispatch(sendImages({ formData, attachInfo, callback }));
      } catch (error) {
        console.log(error);
      }
    } else {
      const formData = new FormData();

      formData.append("file", {
        name: filePaths[0].fileName,
        type: filePaths[0].type,
        uri:
          Platform.OS === "ios"
            ? filePaths[0].uri.replace("file://", "")
            : filePaths[0].uri,
      });

      let mineType = "IMAGE";
      if (filePaths[0].type === "video") mineType = "VIDEO";

      console.log(mineType);

      const attachInfo = {
        type: mineType,
        conversationId: conversationId,
      };

      try {
        dispatch(sendImage({ formData, attachInfo, callback }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onPress = () => {
    if (content) {
      dispatch(sendMessage({ conversationId, content, type: "TEXT" }));
      setContent("");
      scrollViewRef.current.scrollToOffset({ animated: true, offset: 0 });
      setIsEmojiPickerOpen(false);
    } else {
    }
  };

  const checkType = (content: string) => {
    const splitTempt = content.split(".");
    const fileExtension = splitTempt[splitTempt.length - 1];
    if (fileExtension === "mp4") return "VIDEO";
    return "IMAGE";
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { height: isEmojiPickerOpen ? "50%" : "auto" }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={headerHeight}
    >
      {/* {images && (
        <SafeAreaView style={styles.sendImageContainer}>
          <Pressable
            onPress={() => setImage(null)}
            style={{ alignItems: "flex-end" }}
          >
            <AntDesign
              name="close"
              size={24}
              color="black"
              style={{ margin: 5 }}
            />
          </Pressable>
          <SafeAreaView>
            <FlatList
              data={images}
              renderItem={({ item }) =>
                checkType(item) === "VIDEO" ? (
                  <Video
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                    source={{ uri: item }}
                  />
                ) : (
                  <Image
                    key={item}
                    source={{ uri: item }}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                  />
                )
              }
              // showsVerticalScrollIndicator={true}
              horizontal
            />
          </SafeAreaView>
        </SafeAreaView>
      )} */}

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Pressable
            onPress={() => {
              setIsEmojiPickerOpen((currentContent) => !currentContent);
              Keyboard.dismiss();
            }}
          >
            <MaterialCommunityIcons
              name="sticker-emoji"
              size={28}
              color="black"
              style={styles.icon}
            />
          </Pressable>
          <TextInput
            style={styles.input}
            value={content}
            onChangeText={(newContent) => setContent(newContent)}
            placeholderTextColor="#BBBBBB"
            placeholder="Tin nhắn"
            // onBlur={() => setIsEmojiPickerOpen(false)}
            onFocus={() => setIsEmojiPickerOpen(false)}
          />

          {content ? (
            <Pressable onPress={() => onPress()}>
              <Ionicons name="send" size={28} color="blue" />
            </Pressable>
          ) : (
            <>
              <MaterialCommunityIcons
                name="microphone-outline"
                size={28}
                color="#595959"
                style={styles.icon}
              />

              <Pressable>
                <Feather
                  name="camera"
                  size={28}
                  color="#595959"
                  style={styles.icon}
                />
              </Pressable>

              <Pressable onPress={pickImage}>
                <Feather
                  name="image"
                  size={28}
                  color="#595959"
                  style={styles.icon}
                />
              </Pressable>
            </>
          )}
        </View>
      </View>

      {isEmojiPickerOpen && <EmojiPicker setContent={setContent} />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {},
  row: {
    flexDirection: "row",
  },
  inputContainer: {
    backgroundColor: "#f2f2f2",
    flex: 1,
    borderWidth: 1,
    borderColor: "#dedede",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
  },
  icon: {
    marginHorizontal: 5,
    // padding: 2,
  },
  buttonContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#3777f0",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendImageContainer: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    width: "100%",
  },
});

export default MessageInput;
