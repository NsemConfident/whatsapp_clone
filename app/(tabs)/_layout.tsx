import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabBar from "../components/tabBar/TabBar";
import {
  EvilIcons,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        headerStyle: {
          backgroundColor: "black",
          height: 70,
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "black",
          borderColor: "",
        },
        tabBarLabelStyle: styles.text,
        headerRight: () => {
          return (
            <View style={styles.headerIcons}>
              <Feather name="camera" size={24} color="white" />
              <EvilIcons name="search" size={30} color="white" />
              <Feather name="more-vertical" size={24} color="white" />
            </View>
          );
        },
      }}
    >
      {/* <Tabs tabBar={(props) => <TabBar {...props} />}> */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Chats",
          headerTitle: "Whatsapp",
          tabBarIcon: ({ color, focused }) => {
            return (
              <View>
                <View style={[styles.tabIcons, focused && styles.focusedIcon]}>
                  <MaterialCommunityIcons
                    name="android-messages"
                    size={24}
                    color="white"
                  />
                  <View style={styles.unreadcontainer}>
                    <Text style={styles.unread}>99+</Text>
                  </View>
                </View>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="call"
        options={{
          title: "Calls",
          tabBarIcon: ({ color, focused }) => {
            return (
              <View style={[styles.tabIcons, focused && styles.focusedIcon]}>
                <Ionicons name="call-outline" size={24} color="white" />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="updates"
        options={{
          title: "Updates",
          tabBarIcon: ({ color, focused }) => {
            return (
              <View style={[styles.tabIcons, focused && styles.focusedIcon]}>
                <MaterialIcons name="update" size={24} color="white" />
                <View style={styles.unreadUpdate}></View>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: "Tools",
          tabBarIcon: ({ color, focused }) => {
            return (
              <View style={[styles.tabIcons, focused && styles.focusedIcon]}>
                <MaterialCommunityIcons
                  name="toolbox-outline"
                  size={24}
                  color="white"
                />
                <View style={styles.unreadUpdate}></View>
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  tabIcons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: 60,
    width: 60,
  },
  focusedIcon: {
    color: "white",
    borderRadius: 20,
    backgroundColor: "grey",
    // opacity: 0.5,
    fontSize: 16,
  },
  text: {
    fontWeight: "bold",
    fontSize: 12,
  },
  unread: {
    fontSize: 10,
    fontWeight: "bold",
  },
  unreadcontainer: {
    position: "absolute",
    backgroundColor: "#438602",
    paddingHorizontal: 5,
    borderRadius: 100,
    top: 0,
    right: 2,
  },
  unreadUpdate: {
    height: 10,
    width: 10,
    position: "absolute",
    backgroundColor: "#438602",
    top: 0,
    borderRadius: 50,
    right: 14,
  },
});
