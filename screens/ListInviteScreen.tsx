import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSelector } from "../store";
import { friendSeletor } from "../store/reducers/friendReducer";
import ItemInvite from "../components/ItemInvite/ItemInvite";

const ListInviteScreen = () => {
  const { friendInvites } = useAppSelector(friendSeletor);

  return (
    <View style={styles.container}>
      <FlatList
        data={friendInvites}
        renderItem={({ item }) => <ItemInvite friendInvite={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ListInviteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
