import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import React from "react";
import data from "@/app/utils/data";
import { Foundation } from "@expo/vector-icons";
import generalStyles from "@/app/utils/generalStyles";

const ButtonList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data.topButtons}
        renderItem={({ item }) => {
          return (
            <View key={item.id}>
              <Pressable>
                <Text style={styles.button}>{item.name}</Text>
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
    color: "white",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "grey",
    opacity: 0.5,
    fontSize: 16,
  },
  archiveSection: {
    flexDirection: "row",
    gap: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
});
