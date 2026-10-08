import { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

import { db } from "../config/firebase";
import AlatStyle from "../style/AlatStyle";

export default function Alat({ navigation }) {
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [alat, setAlat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const ambilData = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setErrorMsg("");
      const snapshot = await getDocs(collection(db, "alat"));
      setAlat(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (e) {
      const msg =
        e?.code === "permission-denied"
          ? "Izin Firestore ditolak. Cek Firestore Rules."
          : e?.code === "unavailable"
            ? "Tidak ada koneksi / Firestore offline."
            : `Gagal memuat data: ${e?.message || e}`;
      setErrorMsg(msg);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Refetch tiap kali layar difokuskan (kembali dari Drawer)
  useFocusEffect(
    useCallback(() => {
      ambilData();
    }, [])
  );

  const tambah = async () => {
    const kodeBersih = kode.trim();
    const namaBersih = nama.trim();
    if (!kodeBersih || !namaBersih) {
      Alert.alert("Validasi", "Kode Alat dan Nama Alat harus diisi!");
      return;
    }
    const duplikat = alat.some(
      (a) => String(a.kode).toLowerCase() === kodeBersih.toLowerCase()
    );
    if (duplikat) {
      Alert.alert("Validasi", `Kode "${kodeBersih}" sudah terdaftar!`);
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "alat"), {
        kode: kodeBersih,
        nama: namaBersih,
        status: "tersedia",
      });
      setKode("");
      setNama("");
      await ambilData();
    } catch (e) {
      Alert.alert(
        "Gagal menambah",
        e?.code === "permission-denied"
          ? "Izin ditolak. Cek Firestore Rules."
          : `${e?.message || e}`
      );
    } finally {
      setLoading(false);
    }
  };

  const konfirmasiHapus = (id, kodeItem) => {
    Alert.alert(
      "Hapus Alat",
      `Hapus alat "${kodeItem}"? Tindakan ini tidak bisa dibatalkan.`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => hapus(id),
        },
      ]
    );
  };

  const hapus = async (id) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "alat", id));
      await ambilData();
    } catch (e) {
      Alert.alert("Gagal menghapus", `${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={AlatStyle.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => ambilData(true)} />
      }
    >
      <View style={AlatStyle.card}>
        <Text style={AlatStyle.title}>Data Alat</Text>

        <View style={AlatStyle.form}>
          <TextInput
            style={AlatStyle.input}
            placeholder="Kode Alat"
            value={kode}
            onChangeText={setKode}
            autoCapitalize="characters"
          />

          <TextInput
            style={AlatStyle.input}
            placeholder="Nama Alat"
            value={nama}
            onChangeText={setNama}
          />
        </View>

        <TouchableOpacity
          style={[AlatStyle.button, loading && { opacity: 0.6 }]}
          onPress={tambah}
          disabled={loading}
        >
          <Text style={AlatStyle.buttonText}>
            {loading ? "Memproses..." : "Tambah"}
          </Text>
        </TouchableOpacity>

        {loading && alat.length === 0 ? (
          <ActivityIndicator size="large" color="#1976D2" style={{ marginVertical: 16 }} />
        ) : null}

        {errorMsg ? (
          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#C62828", textAlign: "center" }}>{errorMsg}</Text>
            <TouchableOpacity style={AlatStyle.backButton} onPress={() => ambilData()}>
              <Text style={AlatStyle.buttonText}>Coba Lagi</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={AlatStyle.tableHeader}>
          <Text style={[AlatStyle.cell, { flex: 1 }]}>Kode</Text>
          <Text style={[AlatStyle.cell, { flex: 2 }]} numberOfLines={1}>Nama</Text>
          <Text style={[AlatStyle.cell, { flex: 1.2 }]}>Status</Text>
          <Text style={{ width: 72 }} />
        </View>

        {alat.length === 0 && !loading && !errorMsg ? (
          <Text style={{ textAlign: "center", color: "#777", marginVertical: 12 }}>
            Belum ada data alat. Tambahkan di atas atau tarik ke bawah untuk refresh.
          </Text>
        ) : null}

        {alat.map((item) => (
          <View style={AlatStyle.row} key={item.id}>
            <Text style={[AlatStyle.cell, { flex: 1 }]} numberOfLines={1}>
              {item.kode}
            </Text>
            <Text style={[AlatStyle.cell, { flex: 2 }]} numberOfLines={1}>
              {item.nama}
            </Text>
            <Text style={[AlatStyle.cell, { flex: 1.2 }]} numberOfLines={1}>
              {item.status}
            </Text>
            <TouchableOpacity
              style={[AlatStyle.deleteButton, { width: 72, marginLeft: 6, paddingHorizontal: 0, alignItems: "center" }]}
              onPress={() => konfirmasiHapus(item.id, item.kode)}
            >
              <Text style={AlatStyle.buttonText}>Hapus</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={AlatStyle.backButton}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text style={AlatStyle.buttonText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
