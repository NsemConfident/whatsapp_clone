import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import data from "@/app/utils/data";
import { Foundation } from "@expo/vector-icons";
import generalStyles from "@/app/utils/generalStyles";

const ButtonList = () => {
  const [filter, setFilter] = useState("all");
  const [filteredMessage, setFilteredMessage] = useState(data.messageList);
  const applyFilter = (filterType: string) => {
    setFilter(filterType);
    switch (filterType) {
      case "unread":
        setFilteredMessage(
          data.messageList.filter((message) => message.isUnread)
        );
        break;
      case "favorites":
        setFilteredMessage(
          data.messageList.filter((message) => message.isFavourite)
        );
        break;
      case "groups":
        setFilteredMessage(
          data.messageList.filter((message) => message.isGroup)
        );
        break;
      default:
        setFilteredMessage(data.messageList);
        break;
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data.topButtons}
        renderItem={({ item }) => {
          return (
            <View key={item.id}>
              <Pressable onPress={() => applyFilter(item.type)}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{item.name}</Text>
                </View>
              </Pressable>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ padding: 2 }}></View>}
        horizontal
      />
      <View style={styles.archiveSection}>
        <Foundation name="archive" size={24} color="white" />
        <Text style={generalStyles.text}>Archived</Text>
      </View>
    </View>
  );
};

export default ButtonList;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "grey",
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  archiveSection: {
    flexDirection: "row",
    gap: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
});
