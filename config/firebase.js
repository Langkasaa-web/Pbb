import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Ganti nilai di bawah sesuai Firebase Console > Project Settings > Your apps.
// Disarankan pindah ke EXPO_PUBLIC_* env (lihat README) agar tidak hardcoded.
const firebaseConfig = {
  apiKey: "AIzaSyDcs-n7OJF_dHcTh6eHqjKkManfMySPMsQ",
  authDomain: "peminjaman-alat-428d2.firebaseapp.com",
  projectId: "peminjaman-alat-428d2",
  storageBucket: "peminjaman-alat-428d2.firebasestorage.app",
  messagingSenderId: "1040716913208",
  appId: "1:1040716913208:web:34dd58648c046d9ac9e4cd",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Auth harus persisten di Android/iOS (AsyncStorage).
// Di web tetap pakai getAuth biasa.
let auth;
if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (e) {
    // Hot-reload / sudah di-init: fallback aman
    auth = getAuth(app);
  }
}

const db = getFirestore(app);

export { app, auth, db };
