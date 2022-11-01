import { StyleSheet, Text, View } from "react-native";
import JWTManager from "../../utils/jwt";
import MessageDivider from "./MessageDivider";

const Message = ({ index, message }: { index: any; message: any }) => {
  const nextMessage: any = message?.[index + 1];

  const nextMessageTime: any = new Date(nextMessage?.createdAt);
  const messageTime: any = new Date(message.createdAt);
  const messageTimeTemp: any = new Date(message.createdAt);

  // console.log(messageTimeTemp);

  const isSeparate =
    messageTimeTemp.setMinutes(messageTimeTemp.getMinutes() - 5) >
    nextMessageTime;

  const myId = JWTManager.getUserId()?.toString() as string;

  const isMe = message.user._id === myId;

  return (
    <View>
      {isSeparate && <MessageDivider dateString={messageTime} />}
      <View
        style={[
          styles.container,
          isMe ? styles.rightContainer : styles.leftContainer,
        ]}
      >
        <Text style={{ color: "black" }}>{message.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3777f0",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: "75%",
  },
  leftContainer: {
    backgroundColor: "white",
    marginLeft: 10,
    marginRight: "auto",
  },
  rightContainer: {
    backgroundColor: "rgba(208,242,254,255)",
    marginLeft: "auto",
    marginRight: 10,
  },
});

export default Message;
