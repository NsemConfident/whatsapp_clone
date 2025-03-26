import {
  Modal as RNModal,
  ModalProps,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import React from "react";

type PROPS = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
};

const CreateChatFormModal = ({
  isOpen,
  withInput,
  children,
  ...rest
}: PROPS) => {
  const content = withInput ? (
    <KeyboardAvoidingView
      style={styles.ViewContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}

    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View style={styles.ViewContainer}>{children}</View>
  );
  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      {content}
    </RNModal>
  );
};

export default CreateChatFormModal;

const styles = StyleSheet.create({
  ViewContainer: {
    display: "flex",
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // backgroundColor: "red",
  },
});
