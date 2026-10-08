import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export default function TestFirebase() {
  const [userEmail, setUserEmail] = useState(null);
  const [firestoreStatus, setFirestoreStatus] = useState("Belum diuji");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user ? user.email : null);
    });
    return unsubscribe;
  }, []);

  const testFirestore = async () => {
    setLoading(true);
    setFirestoreStatus("Menguji koneksi...");
    try {
      const ref = doc(db, "test_koneksi", "ping");
      await setDoc(ref, { waktu: serverTimestamp() });
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        setFirestoreStatus("Berhasil terhubung ke Firestore ✅");
      } else {
        setFirestoreStatus("Gagal membaca data dari Firestore ❌");
      }
    } catch (error) {
      setFirestoreStatus(`Gagal terhubung: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Koneksi Firebase</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Authentication</Text>
        <Text style={styles.value}>
          {userEmail
            ? `Terhubung (login sebagai ${userEmail})`
            : "Tidak ada pengguna yang login"}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Firestore</Text>
        <Text style={styles.value}>{firestoreStatus}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={testFirestore}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Menguji..." : "Test Koneksi Firestore"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", color: "#1976D2", marginBottom: 20 },
  row: { marginBottom: 16 },
  label: { fontSize: 13, color: "#777777" },
  value: { fontSize: 15, color: "#222222", marginTop: 2 },
  button: {
    backgroundColor: "#1976D2",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: { color: "#FFFFFF", fontWeight: "bold" },
});
