# Aplikasi Peminjaman Alat (Expo + Firebase)

Aplikasi mobile **Sistem Informasi Peminjaman Alat** untuk mengelola data alat,
peminjaman, pengembalian, dan laporan. Dibangun dengan **React Native (Expo SDK 57)**
dan **Firebase (Auth + Firestore)**.

> Folder aktif aplikasi adalah `test/` (hasil `create-expo-app` default bernama `test`).
> Folder `C:\Project\React_Project\` hanya pembungkus — semua perintah dijalankan dari dalam `test/`.

---

## 1. Fitur

| Fitur | Lokasi | Status |
|---|---|---|
| Login demo (`admin` / `12345`) + modal success/warning/error | `screen/Login.js` | ✅ Jalan |
| Drawer: Dashboard, Data Alat, Peminjaman, Pengembalian, Laporan, Test Firebase + Logout | `App.js` | ✅ Jalan (3 menu masih placeholder) |
| Dashboard selamat datang | `screen/Home.js` | ✅ Jalan |
| CRUD Data Alat (`kode`, `nama`, `status`) ke Firestore | `screen/Alat.js` | ✅ Jalan (sudah robust: validasi, konfirmasi hapus, loading, pull-to-refresh) |
| Test koneksi Auth + Firestore (`test_koneksi/ping`) | `screen/TestFirebase.js` | ✅ Jalan |
| Auth persisten di Android/iOS (AsyncStorage) | `config/firebase.js` | ✅ Sudah diperbaiki |

Menu **Peminjaman / Pengembalian / Laporan** saat ini masih menampilkan
`Halaman ... sedang dalam pengembangan` (lihat `App.js:74-76` + `Home.js`).

---

## 2. Struktur Folder & Penjelasan Syntax

```
test/
├── App.js                  # Stack Login->Main + Drawer + CustomDrawerContent + logout reset
├── index.js                # import gesture-handler + registerRootComponent(App)
├── babel.config.js         # WAJIB untuk Reanimated/Drawer (presets expo + plugin reanimated)
├── app.json                # Nama, slug, icon, adaptive icon Android, favicon web
├── package.json            # Deps + scripts start/android/ios/web
├── config/
│   └── firebase.js         # initializeApp + initializeAuth(AsyncStorage) + getFirestore
├── screen/
│   ├── Login.js            # useState username/password + modal + reset ke Main saat sukses
│   ├── Home.js             # Branching route.name (Dashboard vs placeholder)
│   ├── Alat.js             # getDocs/addDoc/deleteDoc + validasi + RefreshControl + FocusEffect
│   └── TestFirebase.js     # onAuthStateChanged + setDoc/getDoc serverTimestamp
├── style.js                # Style Login + modal (success/error/warning)
└── style/
    ├── AlatStyle.js        # Card, form, tabel flex row, tombol hapus merah
    ├── HomeStyle.js        # Center layout dashboard
    └── DrawerStyle.js      # Header biru #1976D2, logout merah
```

Alur jalan aplikasi:

```
index.js → App.js → Stack(Login) → Login sukses → reset → Main (Drawer)
→ Dashboard (Home) | Data Alat (Alat + Firestore) | Test Firebase
→ Logout → Alert konfirmasi → reset → Login
```

---

## 3. Tech Stack & Versi Teruji

- `expo ~57.0.11`, `react 19.2.3`, `react-native 0.86.2`
- `@react-navigation/native`, `native-stack`, `drawer`
- `react-native-gesture-handler ~2.32.0`, `reanimated 4.5.1`, `worklets 0.10.1`
- `firebase ^12.18.0` (Auth + Firestore)
- `@react-native-async-storage/async-storage` (persistence Auth native)

Lihat `package.json` untuk versi exact setelah `npm install`.

---

## 4. Cara Run

### 4.1 Prasyarat

1. **Node LTS 20+** + npm (`node --version`, `npm --version`)
2. **Expo Go** di HP Android/iOS (satu WiFi dengan laptop), ATAU Android Emulator, ATAU browser (untuk web)
3. Project Firebase `peminjaman-alat-428d2` aktif + Firestore sudah dibuat

### 4.2 Install & Jalan

```powershell
cd C:\Project\React_Project\test
npm install
npx expo start
```

Lalu di terminal Expo:

- Tekan `w` → buka di browser (paling cepat untuk cek UI)
- Tekan `a` → Android emulator (butuh Android Studio)
- Scan QR dengan **Expo Go** → HP fisik

Perintah lain:

```powershell
npm run android   # expo start --android
npm run ios       # expo start --ios (butuh Mac/Xcode)
npm run web       # expo start --web
```

### 4.3 Login Demo

```
Username: admin
Password: 12345
```

Login salah/kosong → modal warning/error. Login benar → modal success → tombol OK → masuk Drawer.

### 4.4 Uji Firebase

1. Buka Drawer → **Test Firebase** → klik **Test Koneksi Firestore**
2. Berhasil → `Berhasil terhubung ke Firestore ✅`
3. Cek di Firebase Console → Firestore → koleksi `test_koneksi/ping` ada field `waktu`
4. Buka **Data Alat** → isi Kode + Nama → Tambah → muncul di tabel → Hapus (ada konfirmasi)

### 4.5 Troubleshooting

| Gejala | Penyebab umum | Solusi |
|---|---|---|
| QR tidak bisa scan / timeout | Beda WiFi, firewall, port 8081 diblokir | Satu WiFi, atau `npx expo start --tunnel`, `npx expo start --clear` |
| Drawer blank di Android | Dulu belum ada `babel.config.js` / `GestureHandlerRootView` | Sudah diperbaiki di repo ini. Jika masih: `npx expo start --clear` |
| `permission-denied` saat Tambah/Hapus | Firestore Rules menolak tulis | Sementara untuk testing di Console → Firestore → Rules: `allow read, write: if true;` lalu Publish. Untuk produksi batasi per user |
| `Tidak ada pengguna yang login` di Test Firebase | Wajar — Login demo belum pakai Firebase Auth | Buat user di Authentication Console jika ingin uji Auth, atau lanjutkan ke roadmap Auth |
| `unavailable` / offline | Tidak ada internet | Cek koneksi, coba web dulu |

Contoh Rules **testing saja** (jangan untuk produksi):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

---

## 5. Konfigurasi Firebase

File: `config/firebase.js`

- Sudah memakai `initializeAuth` + `AsyncStorage` persistence di native, `getAuth` di web, plus guard `getApps()` agar aman dari hot-reload.
- Nilai `apiKey`, `authDomain`, `projectId`, dll masih hardcoded. Untuk produksi pindahkan ke env:
  1. Buat `.env` berisi `EXPO_PUBLIC_FIREBASE_API_KEY=...` dst
  2. Ubah `firebase.js` membaca `process.env.EXPO_PUBLIC_...`
  3. Tambahkan `.env` ke `.gitignore` (jangan commit kunci pribadi walau apiKey Firebase aman untuk client)

---

## 6. Bug yang Sudah Diperbaiki + Todo Sisa

### Sudah fix di sesi ini

- [x] **T1 — babel + Drawer:** buat `babel.config.js`, tambah `import 'react-native-gesture-handler'`, bungkus dengan `GestureHandlerRootView`
- [x] **T2 — Auth persistence:** install `@react-native-async-storage/async-storage`, ganti `getAuth` → `initializeAuth` + fallback web
- [x] **T3 — Alat robust:** `try/catch` semua Firestore call, validasi kosong + duplikat kode, konfirmasi hapus, loading spinner, pesan error permission/offline, `RefreshControl` + `useFocusEffect`, fix overflow kolom tabel

### Todo lanjutan (belum dikerjakan)

- [ ] **T4 — Menu asli:** buat `screen/Peminjaman.js`, `Pengembalian.js`, `Laporan.js` ganti placeholder di `App.js`
- [ ] **T5 — Edit alat + search:** tambah `updateDoc`, kolom pencarian/filter status di `Alat.js`
- [ ] **T6 — Config aman:** pindah Firebase config ke env + dokumentasikan `firestore.rules` produksi
- [ ] **T7 — Auth beneran:** ganti hardcode `admin/12345` dengan `signInWithEmailAndPassword` + registrasi + proteksi route

---

## 7. Roadmap Singkat

1. Auth Firebase penuh + session guard (jika belum login tidak bisa ke Main via deep-link)
2. CRUD Peminjaman (relasi `alat` + `peminjam` + tanggal + status pinjam/kembali)
3. Laporan (rekap per periode, export sederhana)
4. Polish UI (ikon drawer, empty-state, dark mode opsional)

---

## 8. Lisensi

Lihat file `LICENSE` di folder ini.
