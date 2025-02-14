import { View, Text, ScrollView } from "react-native";
import React from "react";
import MemoryModal from "../memoryModal/MemoryModal";
import ButtonList from "../ButtonList/ButtonList";
import CardListItem from "../cardListItem/CardListItem";
import data from "@/app/utils/data";

const Home = () => {
  return (
    <ScrollView>
      <MemoryModal />
      <ButtonList />
      <CardListItem
        id={data.messageList[1].id}
        profile={data.messageList[1].profile}
        title={data.messageList[1].title}
        date={data.messageList[1].date}
        message={data.messageList[1].message}
        statusIcon={data.messageList[1].statusIcon}
      />
    </ScrollView>
  );
};

export default Home;
