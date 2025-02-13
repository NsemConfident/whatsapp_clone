import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import React from "react";
import topButtons from "@/app/utils/data";

const ButtonList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={topButtons}
        renderItem={({ item }) => {
          return (
            <View key={item.id}>
              <Pressable>
                <Text style={styles.button}>{item.name}</Text>
              </Pressable>
            </View>
          );
        }}
        ItemSeparatorComponent={()=>(
            <View style={{padding: 2}}>

            </View>
        )}
        horizontal
      />
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
});
