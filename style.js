import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },

  card: {
    width: "85%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },

  appName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1976D2",
    marginBottom: 4,
  },

  appSubtitle: {
    fontSize: 13,
    textAlign: "center",
    color: "#777777",
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    maxWidth: 350,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    borderTopWidth: 6,
  },

  modalSuccess: {
    borderTopColor: "#2E7D32",
  },

  modalError: {
    borderTopColor: "#C62828",
  },

  modalWarning: {
    borderTopColor: "#F9A825",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },

  modalMessage: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },

  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },

  modalButtonSuccess: {
    backgroundColor: "#2E7D32",
  },

  modalButtonError: {
    backgroundColor: "#C62828",
  },

  modalButtonWarning: {
    backgroundColor: "#F9A825",
  },

  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});