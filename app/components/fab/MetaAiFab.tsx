import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const MetaAiFab = () => {
  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.menu]}>
          <LinearGradient
            colors={["#1877F2", "#8A2BE2"]}
            style={styles.metaAi}
          />
          <View style={styles.metaAi}></View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MetaAiFab;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute",
    right: 30,
    bottom: 140,
  },
  button: {
    position: "absolute",
    height: 50,
    width: 50,
    borderRadius: 50 / 3,
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 10,
    shadowColor: "#f7f7f7",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10, width: 0 },
  },
  menu: {
    backgroundColor: "grey",
    // opacity: 0.2,
  },
  metaAi: {
    height: 20,
    width: 20,
    backgroundColor: "",
    borderRadius: 50,
  },
});
