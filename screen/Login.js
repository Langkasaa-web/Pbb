import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Modal } from "react-native";
import styles from "../style";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("error");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const showAlert = (type, title, message) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  // Dipanggil saat tombol OK di modal ditekan. Kalau modal-nya modal
  // sukses, baru pindah ke Main setelah modal ditutup.
  const closeModal = () => {
    setModalVisible(false);
    if (modalType === "success") {
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    }
  };

  const login = () => {
    if (username === "" || password === "") {
      showAlert("warning", "Peringatan", "Username dan password harus diisi!");
    } else if (username === "admin" && password === "12345") {
      showAlert("success", "Berhasil", "Login berhasil!");
    } else {
      showAlert("error", "Gagal", "Username atau password salah!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.appName}>Aplikasi Peminjaman</Text>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email / Username"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalBox,
              modalType === "success" && styles.modalSuccess,
              modalType === "error" && styles.modalError,
              modalType === "warning" && styles.modalWarning,
            ]}
          >
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>

            <TouchableOpacity
              style={[
                styles.modalButton,
                modalType === "success" && styles.modalButtonSuccess,
                modalType === "error" && styles.modalButtonError,
                modalType === "warning" && styles.modalButtonWarning,
              ]}
              onPress={closeModal}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}