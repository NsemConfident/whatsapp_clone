import React from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface props {
  onPress: () => void;
}

const Fab = ({ onPress }: props) => {
  // Debug function to make sure the event is firing

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.touchable}
        onPress={onPress}
      >
        <Animated.View style={[styles.button, styles.menu]}>
          <MaterialCommunityIcons
            name="message-plus-outline"
            size={24}
            color="black"
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default Fab;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 30,
    bottom: 70,
    zIndex: 1000, // Make sure it's on top of other elements
    elevation: 5, // For Android
  },
  touchable: {
    width: 60,
    height: 60,
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 10,
    shadowColor: "#f7f7f7",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10, width: 0 },
    elevation: 5, // For Android shadow
  },
  menu: {
    backgroundColor: "#f7f7f7",
  },
});
