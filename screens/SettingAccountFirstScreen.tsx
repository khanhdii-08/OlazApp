import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Button,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import { Entypo, Fontisto } from "@expo/vector-icons";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import DatePicker from "react-native-date-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
// import DatePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useAppSelector } from "../store";
import { meSelector } from "../store/reducers/meSlice";
import meApi from "../service/meService";

const radioButtonsData: RadioButtonProps[] = [
  {
    id: "1", // acts as primary key, should be unique and non-empty string
    label: "",
    value: "true",
  },
  {
    id: "2",
    label: "",
    value: "false",
  },
];

const SettingAccountFirstScreen = () => {
  const { userProfile } = useAppSelector(meSelector);

  const [radioButtons, setRadioButtons] =
    useState<RadioButtonProps[]>(radioButtonsData);

  const [image, setImage] = useState(null);
  const [gender, setGender] = useState(true);

  function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
    radioButtonsArray.forEach((e) => {
      if (e.selected) {
        setGender(Boolean(e.value));
      }
    });
  }

  const [dateOfBirth, setDateOfBirth] = useState(new Date(1598051730000));
  const [dobTitle, setDobTitle] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDobTitle(handleDateOfBirth(date));
    hideDatePicker();
  };

  const handleDateOfBirth = (dateOfBirth: Date) => {
    const date = dateOfBirth.getDate();
    const month = dateOfBirth.getMonth() + 1;
    const year = dateOfBirth.getFullYear();

    return (
      ("00" + date).slice(-2) + "/" + ("00" + month).slice(-2) + "/" + year
    );
  };

  const getAcronym = (name: string) => {
    if (name) {
      const acronym = name
        .split(/\s/)
        .reduce((response, word) => (response += word.slice(0, 1)), "")
        .toUpperCase();

      return acronym.slice(0, 2);
    }
    return "";
  };

  useEffect(() => {
    const date = userProfile?.birthDay;
    const dob = new Date(date?.year, date?.month - 1, date?.day);
    setDobTitle(handleDateOfBirth(dob));
    setDateOfBirth(dob);
  }, []);

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);

      const formData = new FormData();
      formData.append("file", {
        name: "dyt",
        type: result.type,
        uri:
          Platform.OS === "ios"
            ? result.uri.replace("file://", "")
            : result.uri,
      });

      meApi.updateAvatar(formData);
    }
  };

  const onPress = () => {
    const dateOfBirthObj = {
      day: dateOfBirth.getDate(),
      month: dateOfBirth.getMonth() + 1,
      year: dateOfBirth.getFullYear(),
    };
    console.log(image, gender, dobTitle);
  };

  return (
    <SafeAreaView>
      <View style={[styles.layout]}>
        <Text style={{ padding: 10 }}>Chọn ảnh đại diện</Text>
        <Pressable style={styles.avatarContainer} onPress={pickImage}>
          <Avatar
            rounded
            title={getAcronym(userProfile.name)}
            overlayContainerStyle={{
              backgroundColor: userProfile.avatarColor,
            }}
            source={
              image
                ? {
                    uri: image,
                  }
                : {}
            }
            size="xlarge"
          />
          <Entypo
            name="camera"
            size={24}
            color="black"
            style={styles.cameraAvatar}
          />
        </Pressable>
      </View>
      <View style={styles.layout}>
        <Text style={{ padding: 10 }}>Chọn giới tính</Text>
        <View style={{ marginLeft: 100, marginRight: 100 }}>
          <View style={styles.iconSex}>
            <Fontisto name="male" size={64} color="black" />
            <Fontisto name="female" size={64} color="black" />
          </View>
          <View>
            <RadioGroup
              radioButtons={radioButtons}
              layout="row"
              containerStyle={{
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: 7,
                marginRight: 7,
              }}
              onPress={onPressRadioButton}
            />
          </View>
        </View>
      </View>
      <View style={styles.layout}>
        <Text
          style={{
            padding: 10,
          }}
        >
          Chọn ngày sinh
        </Text>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={dateOfBirth}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          onHide={() => false}
        />

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable onPress={showDatePicker}>
              <Fontisto name="date" size={24} color="black" />
            </Pressable>
            <Text style={{ marginLeft: 20 }}>{dobTitle}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Pressable style={styles.btn} onPress={onPress}>
              <Text>Tiếp tục</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingAccountFirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    height: "33.33333333%",
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cameraAvatar: {
    position: "absolute",
    bottom: 10,
    right: 150,
  },
  iconSex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "red",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
});
