import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useAppDispatch } from "../../store";
import { sendMessage } from "../../store/reducers/messageSlice";
import EmojiSelector from "react-native-emoji-selector";
import * as ImagePicker from "expo-image-picker";
import { useHeaderHeight } from "@react-navigation/elements";

const MessageInput = (props: any) => {
  const { conversationId, scrollViewRef } = props;

  const headerHeight = useHeaderHeight();

  const [image, setImage] = useState<String | null>(null);

  const [content, setContent] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const dispatch = useAppDispatch();

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      selectionLimit: 0,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
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

  return (
    <KeyboardAvoidingView
      style={[styles.root, { height: isEmojiPickerOpen ? "50%" : "auto" }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={headerHeight}
    >
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Pressable
            onPress={() =>
              setIsEmojiPickerOpen((currentValue) => !currentValue)
            }
          >
            <SimpleLineIcons
              name="emotsmile"
              size={24}
              color="#595959"
              style={styles.icon}
            />
          </Pressable>
          <TextInput
            style={styles.input}
            value={content}
            onChangeText={(newContent) => setContent(newContent)}
            placeholderTextColor="#BBBBBB"
            placeholder="Tin nhắn"
            onBlur={() => setIsEmojiPickerOpen(false)}
          />

          {content ? (
            <Pressable onPress={() => onPress()}>
              <Ionicons name="send" size={24} color="blue" />
            </Pressable>
          ) : (
            <>
              <MaterialCommunityIcons
                name="microphone-outline"
                size={24}
                color="#595959"
                style={styles.icon}
              />

              <Pressable>
                <Feather
                  name="camera"
                  size={24}
                  color="#595959"
                  style={styles.icon}
                />
              </Pressable>

              <Pressable onPress={pickImage}>
                <Feather
                  name="image"
                  size={24}
                  color="#595959"
                  style={styles.icon}
                />
              </Pressable>
            </>
          )}
        </View>
      </View>

      {isEmojiPickerOpen && (
        <EmojiSelector
          onEmojiSelected={(emoji) =>
            setContent((currentContent) => currentContent + emoji)
          }
          columns={8}
        />
      )}
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
  },
  buttonContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#3777f0",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessageInput;
