import { StatusBar } from "expo-status-bar";
import { View, Text, Alert, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import DrawerStyle from "./style/DrawerStyle";
import Login from "./screen/Login";
import Home from "./screen/Home";
import Alat from "./screen/Alat";
import TestFirebase from "./screen/TestFirebase";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const logout = () => {
    Alert.alert("Logout", "Apakah Anda yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          props.navigation.getParent()?.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={DrawerStyle.drawerContainer}
    >
      <View style={DrawerStyle.drawerHeader}>
        <Text style={DrawerStyle.appName}>PEMINJAMAN ALAT</Text>
        <Text style={DrawerStyle.appDescription}>
          Sistem Informasi Peminjaman
        </Text>
      </View>
      <DrawerItemList {...props} />
      <View style={DrawerStyle.logoutContainer}>
        <DrawerItem
          label="Logout"
          onPress={logout}
          labelStyle={DrawerStyle.logoutText}
        />
      </View>
    </DrawerContentScrollView>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: "#1976D2" },
        headerTintColor: "#ffffff",
        headerTitleStyle: { fontWeight: "bold" },
        drawerStyle: { width: 280 },
        drawerActiveTintColor: "#1976D2",
        drawerInactiveTintColor: "#444444",
      }}
    >
      <Drawer.Screen name="Dashboard" component={Home} />
      <Drawer.Screen name="Data Alat" component={Alat} />
      <Drawer.Screen name="Peminjaman" component={Home} />
      <Drawer.Screen name="Pengembalian" component={Home} />
      <Drawer.Screen name="Laporan" component={Home} />
      <Drawer.Screen name="Test Firebase" component={TestFirebase} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
