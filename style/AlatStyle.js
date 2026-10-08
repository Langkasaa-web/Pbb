import { StyleSheet } from "react-native";

const AlatStyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 16,
    textAlign: "center",
  },

  form: {
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },

  button: {
    backgroundColor: "#1976D2",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },

  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#1976D2",
    paddingBottom: 8,
    marginBottom: 4,
  },

  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingVertical: 8,
  },

  cell: {
    flex: 1,
    fontSize: 13,
    color: "#333333",
  },

  backButton: {
    backgroundColor: "#777777",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },

  deleteButton: {
    backgroundColor: "#FF5252",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 10,
  },
});

export default AlatStyle;
