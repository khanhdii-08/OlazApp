import { StyleSheet, Text, View } from "react-native";
import JWTManager from "../../utils/jwt"


const Message = ({message}) => {

    const myId = JWTManager.getUserId()?.toString() as string;
    const isMe = message.senderId === myId;



    return (
        <View style={[styles.container, isMe ? styles.rightContainer : styles.leftContainer]}>
            <Text style={{color: isMe ? '#ffffff' : 'black'}}>
                {message.messageText}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#3777f0',
        padding: 10,
        margin: 10,
        borderRadius: 10, 
        maxWidth: '75%'
    },
    leftContainer : {
        backgroundColor : 'lightgrey',
        marginLeft : 10,
        marginRight : 'auto'
    },
    rightContainer : {
        backgroundColor : '#3777f0',
        marginLeft: 'auto',
        marginRight: 10
    }
});

export default Message;

