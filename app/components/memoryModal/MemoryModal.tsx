import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const MemoryModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  return (
    <>
      {isModalVisible && (
        <View style={styles.container}>
          <Ionicons
            name="cloud-upload-outline"
            size={24}
            color="green"
            style={{ fontWeight: "bold" }}
          />
          <View style={styles.middleText}>
            <Text style={styles.text}>
              you google storage is over 70% full. make sure you have enough
              storage for backups
            </Text>
            <Pressable>
              <Text style={[styles.Button, styles.checkNowButton]}>
                Check Now
              </Text>
            </Pressable>
          </View>
          <Pressable onPress={() => setIsModalVisible(false)}>
            <AntDesign name="close" size={24} color="white" />
          </Pressable>
        </View>
      )}
    </>
  );
};

export default MemoryModal;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#0a332b",
    opacity: 0.7,
    flexDirection: "row",
    alignContent: "space-between",
    gap: 20,
    padding: 10,
    borderRadius: 20,
  },
  middleText: {
    flex: 1,
  },
  text: {
    color: "white",
  },
  Button: {
    opacity: 0.6,
    fontWeight: "bold",
  },
  checkNowButton: {
    marginTop: 4,
    color: "#1877F2",
    fontSize: 16,
  },
  xButton: {
    fontSize: 20,
    color: "white",
  },
});
