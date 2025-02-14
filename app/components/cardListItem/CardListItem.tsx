import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import generalStyles from "@/app/utils/generalStyles";
import { FontAwesome6, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
interface Prop {
  id: number;
  profile: { uri: string };
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
  console.log("info: ", id, profile, title, message, date, statusIcon);
  return (
    <View key={id}>
      {profile.uri === "group" && (
        <View style={styles.profileContainer}>
          <FontAwesome6 name="user-group" size={24} color="black" />
        </View>
      )}
      <View style={styles.profileContainer}>
        <Image source={profile} style={styles.listProfile} />
      </View>
      <View>
        <Text style={generalStyles.text}>{title}</Text>
        <Text>{message}</Text>
      </View>
      <View>
        <Text>{date}</Text>
        {statusIcon === "muted" && (
          <MaterialCommunityIcons name="bell-off" size={24} color="black" />
        )}
        {statusIcon === "pin" && (
          <MaterialIcons name="push-pin" size={24} color="white" />
        )}
      </View>
    </View>
  );
};

export default CardListItem;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  profileContainer: {
    height: 50,
    width: 50,
    alignItems: "center",
    backgroundColor: "grey",
    opacity: 0.5,
    borderRadius: 50,
  },
  listProfile: {
    objectFit: "cover",
  },
});
