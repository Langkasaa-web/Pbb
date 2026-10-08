import { StyleSheet } from "react-native";

const HomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1976D2",
    textAlign: "center",
  },
  welcomeSubtitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    textAlign: "center",
    marginTop: 6,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#5A5A5A",
    textAlign: "center",
    marginTop: 18,
    maxWidth: 460,
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1976D2",
  },
  placeholderText: {
    fontSize: 14,
    color: "#777777",
    textAlign: "center",
    marginTop: 8,
  },
});

export default HomeStyle;
