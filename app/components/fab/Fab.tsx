import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
}

const Fab = ({onPress}: Props) => {
  return (
    <View style={[styles.container]}>

      <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View style={[styles.button, styles.menu]}>
          <MaterialCommunityIcons
            name="message-plus-outline"
            size={24}
            color="black"
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View> 
  );
};

export default Fab;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute",
    right: 30,
    bottom: 70,
  },
  button: {
    position: "absolute",
    height: 60,
    width: 60,
    borderRadius: 60 / 3,
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 10,
    shadowColor: "#f7f7f7",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10, width: 0 },
  },
  menu: {
    backgroundColor: "#f7f7f7",
  },
});
