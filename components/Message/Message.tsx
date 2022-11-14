import { StyleSheet, Text, View, Image } from "react-native";
import MessageDivider from "./MessageDivider";
import dateUtils from "../../utils/dateUtils";
import jwt from "../../utils/jwt";
import MessageImage from "./MessageImage";
import GroupImage from "./GroupImage";

const Message = (props: any) => {
  const user = { _id: jwt.getUserId() };

  const { index, item, messages } = props;
  // console.log(item.content);

  const nextMessage: any = messages?.[index + 1];

  const nextMessageTime: any = new Date(nextMessage?.createdAt);
  const messageTime: any = new Date(item?.createdAt);
  const messageTimeTemp: any = new Date(item?.createdAt);

  const isSeparate =
    messageTimeTemp.setMinutes(messageTimeTemp.getMinutes() - 5) >
    nextMessageTime;

  const myId = user._id;

  const isMe = item.user._id === myId;

  return (
    <View>
      {isSeparate && <MessageDivider dateString={messageTime} />}
      {item.type === "TEXT" ? (
        chatContent.messageText(item, isMe)
      ) : item.type === "IMAGE" || item.type === "VIDEO" ? (
        <MessageImage item={item} isMe={isMe} />
      ) : item.type === "GROUP_IMAGE" ? (
        <GroupImage item={item} isMe={isMe} />
      ) : item.type === "NOTIFY" ? (
        chatContent.messageNotify(item, isMe)
      ) : (
        <></>
      )}
    </View>
  );
};

const chatContent = {
  messageNotify: (item: any, isMe: boolean) => {
    const { type, content, user } = item;
    const contentWithSenderName = `${isMe ? "Bạn" : user.name} ${content}`;
    return (
      <View style={[styles.containerNotify]}>
        <View>
          <Text style={{ fontSize: 13, flexWrap: "wrap" }}>
            {contentWithSenderName}
          </Text>
        </View>
      </View>
    );
  },
  messageText: (item: any, isMe: boolean) => (
    <View
      style={[
        styles.container,
        isMe ? styles.rightContainer : styles.leftContainer,
      ]}
    >
      <View>
        <Text style={{ color: "black" }}>{item.content}</Text>
        <Text style={{ color: "black", fontSize: 10, marginTop: 5 }}>
          {dateUtils.getTime(item.createdAt)}
        </Text>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3777f0",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: "82%",
    minWidth: "22%",
  },
  containerNotify: {
    backgroundColor: "#fcfdff",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 100,
    paddingVertical: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
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
