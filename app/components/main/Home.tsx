import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import MemoryModal from "../memoryModal/MemoryModal";
import ButtonList from "../ButtonList/ButtonList";
import CardListItem from "../cardListItem/CardListItem";
import data from "@/app/utils/data";
import Fab from "../fab/Fab";
import MetaAiFab from "../fab/MetaAiFab";
const Home = () => {

  
  return (
    <View style={{ position: "relative" }}>
      <ScrollView>
        <MemoryModal />
        <ButtonList />
        {data.messageList.map((listItem, key) => (
          <CardListItem
            key={listItem.id}
            profile={listItem.profile}
            title={listItem.title}
            date={listItem.date}
            message={listItem.message}
            statusIcon={listItem.statusIcon}
            id={0}
          />
        ))}
      </ScrollView>
      <MetaAiFab />
      <Fab />
    </View>
  );
};

export default Home;
