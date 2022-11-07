import { StyleSheet, Text, View } from "react-native";
import JWTManager from "../../utils/jwt";
import MessageDivider from "./MessageDivider";
import dateUtils from "../../utils/dateUtils";

const Message = (props: any) => {
  const { index, item, messages } = props;

  const nextMessage: any = messages?.[index + 1];

  const nextMessageTime: any = new Date(nextMessage?.createdAt);
  const messageTime: any = new Date(item.createdAt);
  const messageTimeTemp: any = new Date(item.createdAt);

  const isSeparate =
    messageTimeTemp.setMinutes(messageTimeTemp.getMinutes() - 5) >
    nextMessageTime;

  const myId = JWTManager.getUserId()?.toString() as string;

  const isMe = item.user._id === myId;

  return (
    <View>
      {isSeparate && <MessageDivider dateString={messageTime} />}
      <View
        style={[
          styles.container,
          isMe ? styles.rightContainer : styles.leftContainer,
        ]}
      >
        <View>
          <Text style={{ color: "black" }}>{item.content}</Text>
          <Text style={{ color: "black", fontSize: 10 }}>
            {dateUtils.getTime(item.createdAt)}
          </Text>
        </View>
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
    minWidth: "20%",
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
