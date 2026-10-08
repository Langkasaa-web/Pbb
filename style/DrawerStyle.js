import { StyleSheet } from "react-native";
const DrawerStyle = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#1976D2",
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  logo: {
    fontSize: 30,
  },
  appName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 10,
  },
  appDescription: {
    fontSize: 13,
    color: "#E3F2FD",
    marginTop: 4,
  },
  logoutContainer: {
    marginTop: "auto",
  },
  logoutText: {
    color: "#D32F2F",
  },
  headerStyle: {
    backgroundColor: "#1976D2",
  },
  headerTitleStyle: {
    fontWeight: "bold",
  },
  drawerStyle: {
    width: 280,
  },
});
export default DrawerStyle;
