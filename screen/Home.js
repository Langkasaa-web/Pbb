import { View, Text } from "react-native";
import HomeStyle from "../style/HomeStyle";

// Home dipakai untuk beberapa menu drawer sekaligus (Dashboard, Data
// Alat, Peminjaman, Pengembalian, Laporan). route.name dipakai untuk
// membedakan tampilan tiap menu selama layar CRUD-nya masing-masing
// belum dibuat.
export default function Home({ route }) {
  const screenName = route.name;

  if (screenName === "Dashboard") {
    return (
      <View style={HomeStyle.container}>
        <Text style={HomeStyle.welcomeTitle}>Selamat Datang</Text>
        <Text style={HomeStyle.welcomeSubtitle}>Sistem Peminjaman Alat</Text>
        <Text style={HomeStyle.description}>
          Aplikasi untuk mengelola data alat, peminjaman, pengembalian, dan
          laporan.
        </Text>
      </View>
    );
  }

  return (
    <View style={HomeStyle.container}>
      <Text style={HomeStyle.placeholderTitle}>{screenName}</Text>
      <Text style={HomeStyle.placeholderText}>
        Halaman {screenName} sedang dalam pengembangan.
      </Text>
    </View>
  );
}
