import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Header from "../components/header/Header";
import MemoryModal from "../components/memoryModal/MemoryModal";
import ButtonList from "../components/ButtonList/ButtonList";

const index = () => {
  return (
    <View style={styles.container}>
      <Header />
      <MemoryModal />
      <ButtonList/>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
});
