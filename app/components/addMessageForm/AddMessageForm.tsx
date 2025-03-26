import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AddMessageFormProps, NewMessage } from "../types"; // Update this path to your actual types file location

const AddMessageForm: React.FC<AddMessageFormProps> = ({ visible, onClose, onAdd }) => {
  const [profile, setProfile] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [statusIcon, setStatusIcon] = useState<string>("pin");
  const [isUnread, setIsUnread] = useState<boolean>(false);
  const [isGroup, setIsGroup] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  // Reset form when closed
  const resetForm = () => {
    setProfile("");
    setTitle("");
    setDate("");
    setMessage("");
    setStatusIcon("pin");
    setIsUnread(false);
    setIsGroup(false);
    setIsFavourite(false);
  };

  // Function to Pick Image
  const pickImage = async () => {
    try {
      // Request media library permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Denied", "We need camera roll permissions to upload an image.");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfile(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image. Please try again.");
      console.error("Image picking error:", error);
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    if (!title.trim()) {
      Alert.alert("Validation Error", "Title is required");
      return false;
    }
    if (!date.trim()) {
      Alert.alert("Validation Error", "Date is required");
      return false;
    }
    if (!message.trim()) {
      Alert.alert("Validation Error", "Message is required");
      return false;
    }
    return true;
  };

  // Submit Form
  const handleSubmit = () => {
    if (!validateForm()) return;

    const newItem: NewMessage = {
      profile: profile ? { uri: profile } : "",
      title,
      date,
      message,
      statusIcon,
      isUnread,
      isGroup,
      isFavourite,
    };
  
    onAdd(newItem);
    resetForm();
    onClose();
  };

  // Close form and reset
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Message</Text>

          {/* Profile Image */}
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            {profile ? (
              <Image source={{ uri: profile }} style={styles.profileImage} />
            ) : (
              <Text style={styles.uploadText}>Upload Profile Image</Text>
            )}
          </TouchableOpacity>

          {/* Inputs */}
          <TextInput 
            style={styles.input} 
            placeholder="Title" 
            value={title} 
            onChangeText={setTitle} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Date (e.g., Jan 20)" 
            value={date} 
            onChangeText={setDate} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Message" 
            value={message} 
            onChangeText={setMessage}
            multiline
            numberOfLines={3}
          />
          <TextInput 
            style={styles.input} 
            placeholder="Status Icon (e.g., pin, check)" 
            value={statusIcon} 
            onChangeText={setStatusIcon} 
          />

          {/* Toggles */}
          <View style={styles.switchContainer}>
            <Text>Unread</Text>
            <Switch value={isUnread} onValueChange={setIsUnread} />
          </View>
          <View style={styles.switchContainer}>
            <Text>Group</Text>
            <Switch value={isGroup} onValueChange={setIsGroup} />
          </View>
          <View style={styles.switchContainer}>
            <Text>Favourite</Text>
            <Switch value={isFavourite} onValueChange={setIsFavourite} />
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 320,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  uploadText: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    padding: 5,
  },
  input: {
    width: "100%",
    minHeight: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddMessageForm;