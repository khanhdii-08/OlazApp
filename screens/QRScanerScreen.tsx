import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";

const QRScanerScreen = () => {
  return (
    <QRCodeScanner
      onRead={(e) => console.log("QR code scanned!", e)}
      flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={
        <View style={styles.displayBtn}>
          <AntDesign name="closecircle" size={24} color="black" />
          <MaterialCommunityIcons name="flashlight" size={24} color="black" />
        </View>
      }
    >
      {/* <View style={styles.continer}>

      </View> */}
    </QRCodeScanner>
  );
};

export default QRScanerScreen;

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    padding: 20,
  },
  displayBtn: {
    flexDirection: "row",
    width: "80%",
  },
});
