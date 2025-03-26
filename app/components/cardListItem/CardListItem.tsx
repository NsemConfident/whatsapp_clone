import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import generalStyles from "@/app/utils/generalStyles";
import {
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
interface Prop {
  id: string;
  profile: string;
  title: string;
  message: string;
  date: string;
  statusIcon: string;
}

const CardListItem = ({
  id,
  profile,
  title,
  message,
  date,
  statusIcon,
}: Prop) => {
  console.log(statusIcon)
  return (
    <View style={styles.container}>
      {profile === "group" ? (
        <View style={styles.profileContainer}>
          <FontAwesome6 name="user-group" size={24} color="black" />
        </View>
      ) : (
        <View style={styles.profileImage}>
          <Image
            source={{ uri: profile }}
            style={[styles.listProfile, styles.profileImage]}
          />
        </View>
      )}
      <View style={styles.message}>
        <Text style={styles.textTitle} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.normalText} numberOfLines={1} ellipsizeMode="tail">
          {message}
        </Text>
      </View>
      <View>
        <Text style={styles.normalText}>{date}</Text>
        {statusIcon === "muted" && (
          <MaterialCommunityIcons
            name="bell-off"
            size={24}
            color="white"
            style={styles.messageIcon}
          />
        )}
        {statusIcon === "pin" && (
          <MaterialIcons
            name="push-pin"
            size={24}
            color="white"
            style={styles.messageIcon}
          />
        )}
      </View>
    </View>
  );
};

export default CardListItem;

const styles = StyleSheet.create({
  container: {
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 10,
  },
  profileContainer: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    opacity: 0.5,
    borderRadius: 50,
  },
  profileImage: {
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  listProfile: {
    objectFit: "cover",
  },
  message: {
    flex: 1,
  },
  textTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    opacity: 0.9,
  },
  normalText: {
    color: "lightgrey",
    paddingTop: 2,
  },
  messageIcon: {
    alignSelf: "flex-end",
  },
});
