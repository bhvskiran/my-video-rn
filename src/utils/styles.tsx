import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  logo: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "blue",
  },
  inputWrap: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 10,
    height: 45,
    width: "100%",
    fontSize: 22,
    paddingHorizontal: 10,
  },
  downloadBtn: {
    backgroundColor: "#cecece",
    paddingHorizontal: 20,
    margin: 10,
    paddingVertical: 12,
    borderRadius: 5,
  },
  downloadText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  hLine: {
    width: "100%",
    height: 0.5,
    backgroundColor: "grey",
  },
  subhead: {
    paddingVertical: 10,
    fontSize: 16,
  },
  fileCard: {
    backgroundColor: "#cecece",
    marginVertical: 5,
    padding: 20,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fileName: {
    fontWeight: "600",
    fontSize: 14,
    flex: 1,
  },
  delBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  closeBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    alignSelf: "flex-end",
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  loader: {
    height: height,
    width: width,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    backgroundColor: "#00000050",
  },
  videoPlayerHeader: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backIcon: { height: 40, width: 40 },
  vPHeaderText: { fontWeight: "bold", fontSize: 20 },
  empty: { width: 40 },
  videoNameWrapper: { paddingHorizontal: 20 },
  videoNameText: { marginVertical: 10, fontSize: 16 },
  videoName: { fontWeight: "bold" },
  videoWrapper: { flex: 1, padding: 20 },
  video: {
    height: 200,
    width: "100%",
  },
});
