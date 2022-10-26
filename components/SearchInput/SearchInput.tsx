import { View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
export default function SearchInput() {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={search}
        placeholderTextColor="#717070"
        placeholder="Tìm kiếm"
        autoFocus={true}
        onChangeText={(value) => {
          setSearch(value);
        }}
      />
      {search && (
        <TouchableOpacity
          style={styles.closeButtonParent}
          onPress={() => setSearch("")}
        >
          <Image
            style={styles.closeButton}
            source={require("../../assets/images/btn_flyemoji_close.png")}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
