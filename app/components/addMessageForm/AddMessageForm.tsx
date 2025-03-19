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
} from "react-native";
import * as ImagePicker from "expo-image-picker";

interface AddMessageFormProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (newItem: any) => void;
}

const AddMessageForm: React.FC<AddMessageFormProps> = ({ visible, onClose, onAdd }) => {
  const [profile, setProfile] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [statusIcon, setStatusIcon] = useState("pin");
  const [isUnread, setIsUnread] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  // Function to Pick Image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile(result.assets[0].uri);
    }
  };

  // Submit Form
  const handleSubmit = () => {
    const newItem = {
      id: Date.now(),
      profile,
      title,
      date,
      message,
      statusIcon,
      isUnread,
      isGroup,
      isFavourite,
    };

    onAdd(newItem);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Item</Text>

          {/* Profile Image */}
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            {profile ? (
              <Image source={{ uri: profile }} style={styles.profileImage} />
            ) : (
              <Text style={styles.uploadText}>Upload Profile Image</Text>
            )}
          </TouchableOpacity>

          {/* Inputs */}
          <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
          <TextInput style={styles.input} placeholder="Date" value={date} onChangeText={setDate} />
          <TextInput style={styles.input} placeholder="Message" value={message} onChangeText={setMessage} />
          <TextInput style={styles.input} placeholder="Status Icon" value={statusIcon} onChangeText={setStatusIcon} />

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
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
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
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
