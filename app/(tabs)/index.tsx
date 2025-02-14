import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Header from "../components/header/Header";
import Home from "../components/main/home";

const index = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Home />
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
