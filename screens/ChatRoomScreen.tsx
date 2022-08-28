import { StyleSheet, Text, View } from "react-native";
import Message from "../components/Message";

export default function ChatRoomScreen() {
    return (
        <View style={styles.page}>
            <Message />
        </View>
    );
};


const styles = StyleSheet.create({
    page:{
        flex: 1,
        backgroundColor: "white"
    }
});