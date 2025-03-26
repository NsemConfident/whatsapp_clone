import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Pressable,
  Button,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import MemoryModal from "../memoryModal/MemoryModal";
import CardListItem from "../cardListItem/CardListItem";
import Fab from "../fab/Fab";
import { Foundation } from "@expo/vector-icons";
import generalStyles from "@/app/utils/generalStyles";
import supabase from "@/app/utils/supabaseClient";
import { formatRelativeTime } from "@/app/utils/dateUtils";
import CreateChatFormModal from "../chatCreationModal/CreateChatFormModal";
import { Picker } from "@react-native-picker/picker";
import * as Font from "expo-font";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
interface Message {
  id: string;
  profile: string;
  title: string;
  date: string;
  message: string;
  statusIcon: string;
  isRead: boolean;
  isGroup: boolean;
  isFavourite: boolean;
  isUnread: boolean; // Added to match your data structure
}

interface TopButton {
  id: number;
  name: string;
  type: string;
}

// Filter types
type FilterType = "all" | "unread" | "favorites" | "groups";

const Home: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState(false);

  let [fontsLoaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });

  // Top buttons data
  const topButtons: TopButton[] = [
    { id: 1, name: "All", type: "all" },
    { id: 2, name: "Unread", type: "unread" },
    { id: 3, name: "Favorites", type: "favorites" },
    { id: 4, name: "Groups", type: "groups" },
  ];

  // Fetch messages from Supabase when component mounts
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("chats").select("*");
      if (error) {
        throw error;
      }
      const formattedMessages = (data || []).map((chat) => ({
        ...chat,
        isRead: !chat.isUnread, // Convert isUnread to isRead
        date: chat.created_at, // Use created_at as date if needed
      }));
      setMessages(formattedMessages);
      setFilteredMessages(formattedMessages); // Initialize filtered messages
    } catch (error) {
      console.log("Failed to fetch chats", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (filterType: FilterType): void => {
    setFilter(filterType);
    let filtered: Message[] = [];

    switch (filterType) {
      case "unread":
        filtered = messages.filter((message) => message.isUnread);
        break;
      case "favorites":
        filtered = messages.filter((message) => message.isFavourite);
        break;
      case "groups":
        filtered = messages.filter((message) => message.isGroup);
        break;
      default:
        filtered = messages;
        break;
    }

    setFilteredMessages(filtered);
  };

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <MemoryModal />
          <View style={styles.container}>
            <FlatList
              data={topButtons}
              renderItem={({ item }) => (
                <Pressable
                  key={item.id}
                  onPress={() => applyFilter(item.type as FilterType)}
                >
                  <View
                    style={[
                      styles.button,
                      filter === item.type && styles.activeButton,
                    ]}
                  >
                    <Text style={styles.buttonText}>{item.name}</Text>
                  </View>
                </Pressable>
              )}
              ItemSeparatorComponent={() => (
                <View style={{ padding: 2 }}></View>
              )}
              horizontal
            />
            <View style={styles.archiveSection}>
              <Foundation name="archive" size={24} color="white" />
              <Text style={generalStyles.text}>Archived</Text>
            </View>
          </View>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={generalStyles.text}>Loading messages...</Text>
            </View>
          ) : (
            filteredMessages.map((listItem) => (
              <View key={listItem.id}>
                <CardListItem
                  id={listItem.id}
                  profile={listItem.profile}
                  title={listItem.title}
                  date={formatRelativeTime(listItem.date)}
                  message={listItem.message}
                  statusIcon={listItem.statusIcon}
                />
              </View>
            ))
          )}
        </ScrollView>
      </View>
      <CreateChatFormModal isOpen={modalOpen}>
        <View style={styles.modalFormContainer}>
          <Text style={styles.modalTitle}>Modal Form</Text>
          <Text style={styles.formDescription}>
            Create a simple chat message
          </Text>
          <View style={styles.nameInput}>
            <TextInput placeholder="First Name" style={[styles.input]} />
            <TextInput placeholder="Last Name" style={[styles.input]} />
          </View>
          <TextInput
            multiline
            placeholder="message"
            style={[styles.input, styles.messageInput]}
          />
          <Pressable
            onPress={() => {
              setModalOpen(false);
            }}
            style={styles.closeButton}
          >
            <Text style={styles.closeModal}>Close</Text>
          </Pressable>
        </View>
      </CreateChatFormModal>
      <Fab onPress={() => setModalOpen(true)} />
      <Button title="Open Form" onPress={() => setModalOpen(true)} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "grey",
    opacity: 0.5,
  },
  activeButton: {
    opacity: 1,
    backgroundColor: "#4a4a4a",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  archiveSection: {
    flexDirection: "row",
    gap: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  modalFormContainer: {
    width: "95%",
    height: "80%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    gap: 20,
  },

  modalTitle: {
    color: "black",
    fontFamily: "Mulish_700Bold",
    fontSize: 32,
  },
  formDescription: {
    fontFamily: "Mulish_400Regular",
    fontSize: 14,
  },
  nameInput: {
    // borderWidth: 1,
    // backgroundColor: "cyan",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    gap: 2,
    width: "46%",
    borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
  },
  messageInput: {
    width: "100%",
  },
  closeButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: "50%",
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeModal: {
    borderStyle: "solid",
    borderColor: "grey",
    fontFamily: "Mulish_700Bold",
  },
});
