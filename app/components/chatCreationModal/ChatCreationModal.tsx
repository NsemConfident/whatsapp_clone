import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Switch,
  Image,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import supabase from "@/app/utils/supabaseClient";
import generalStyles from "@/app/utils/generalStyles";
import { v4 as uuidv4 } from 'uuid';

interface ChatModalProps {
  isVisible: boolean;
  onClose: () => void;
  onChatCreated?: () => void;
}

const ChatCreationModal: React.FC<ChatModalProps> = ({ 
  isVisible, 
  onClose, 
  onChatCreated 
}) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isGroup, setIsGroup] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUnread, setIsUnread] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  const pickImage = async () => {
    // Request permission to access gallery
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const uploadImageToSupabase = async (uri: string) => {
    try {
      // Convert URI to blob
      const response = await fetch(uri);
      const blob = await response.blob();
      
      // Generate unique filename
      const fileExt = uri.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('profile-images')
        .upload(filePath, blob, {
          contentType: `image/${fileExt}`
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Failed to upload image');
      return null;
    }
  };

  const handleCreateChat = async () => {
    // Validate inputs
    if (!title.trim()) {
      Alert.alert('Please enter a title');
      return;
    }

    try {
      let profileUrl = '';
      
      // Upload profile image if selected for personal chat
      if (!isGroup && profileImage) {
        const uploadedUrl = await uploadImageToSupabase(profileImage);
        if (uploadedUrl) {
          profileUrl = uploadedUrl;
        }
      }

      // Insert new chat into Supabase
      const { data, error } = await supabase
        .from('chats')
        .insert({
          title,
          message,
          isGroup,
          profile: profileUrl || (isGroup ? 'group' : 'https://ca.slack-edge.com/T05R6LXN7J8-U06R7GRBJSD-0bb90b6f36d1-512'),
          isUnread,
          statusIcon: 'pin', // Default status icon
          isFavourite,
          created_at: new Date().toISOString()
        })
        .select();

      if (error) throw error;

      // Reset form
      setTitle('');
      setMessage('');
      setIsGroup(false);
      setProfileImage(null);
      setIsUnread(true);
      setIsFavourite(false);

      // Close modal and potentially refresh list
      onClose();
      onChatCreated && onChatCreated();
    } catch (error) {
      console.error('Error creating chat:', error);
      Alert.alert('Failed to create chat');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={[generalStyles.text, styles.modalTitle]}>Create New Chat</Text>

          {/* Profile Type Selection */}
          <View style={styles.profileTypeContainer}>
            <TouchableOpacity 
              style={[
                styles.profileTypeButton, 
                !isGroup && styles.activeProfileType
              ]}
              onPress={() => setIsGroup(false)}
            >
              <Text style={!isGroup ? styles.activeText : styles.inactiveText}>
                Personal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.profileTypeButton, 
                isGroup && styles.activeProfileType
              ]}
              onPress={() => setIsGroup(true)}
            >
              <Text style={isGroup ? styles.activeText : styles.inactiveText}>
                Group
              </Text>
            </TouchableOpacity>
          </View>

          {/* Profile Image Upload for Personal Chats */}
          {!isGroup && (
            <View style={styles.imageUploadContainer}>
              <TouchableOpacity 
                style={styles.imagePickerButton} 
                onPress={pickImage}
              >
                {profileImage ? (
                  <Image 
                    source={{ uri: profileImage }} 
                    style={styles.profileImage} 
                  />
                ) : (
                  <Text style={styles.imagePickerText}>
                    Pick Profile Image
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Toggles for Additional Options */}
          <View style={styles.toggleContainer}>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Unread</Text>
              <Switch
                value={isUnread}
                onValueChange={setIsUnread}
                trackColor={{ false: "#767577", true: "#4a4a4a" }}
                thumbColor={isUnread ? "#f4f3f4" : "#f4f3f4"}
              />
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Favourite</Text>
              <Switch
                value={isFavourite}
                onValueChange={setIsFavourite}
                trackColor={{ false: "#767577", true: "#4a4a4a" }}
                thumbColor={isFavourite ? "#f4f3f4" : "#f4f3f4"}
              />
            </View>
          </View>

          {/* Title Input */}
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Chat Title"
            placeholderTextColor="#888"
          />

          {/* Message Input */}
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={message}
            onChangeText={setMessage}
            placeholder="Initial Message (Optional)"
            placeholderTextColor="#888"
            multiline
            numberOfLines={4}
          />

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.createButton} 
              onPress={handleCreateChat}
            >
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#2c2c2c',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  profileTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  profileTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4a4a4a',
  },
  activeProfileType: {
    backgroundColor: '#4a4a4a',
  },
  activeText: {
    color: 'white',
    marginLeft: 10,
  },
  inactiveText: {
    color: '#888',
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#3c3c3c',
    color: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    width: '48%',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#3c3c3c',
    alignItems: 'center',
  },
  createButton: {
    width: '48%',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#4a4a4a',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#888',
    fontWeight: '600',
  },
  createButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  imageUploadContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePickerButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3c3c3c',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imagePickerText: {
    color: '#888',
    textAlign: 'center',
  },
  toggleContainer: {
    marginBottom: 15,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleLabel: {
    color: 'white',
    fontSize: 16,
  },
});

export default ChatCreationModal;