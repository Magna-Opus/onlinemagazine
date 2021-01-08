import { StyleSheet, Dimensions } from "react-native";
import Colors from "../Global/Color.js";
import Fonts from "../Global/Fonts.js";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: Colors.White,
    alignItems: "center"
  },
  closeContainer: {
    width: width,
    alignItems: "flex-end"
  },
  textContainer: {
    margin: 10,
    paddingHorizontal: 20
    // alignItems:'center'
  },
  subHeadingText: {
    width: width - 40,
    justifyContent: "center",
    alignItems: "center"
  },
  userInfoContainer: {
    flexDirection: "row",
    width: "85%"
  },
  titleText: {
    color: Colors.Red,
    fontSize: 16,
    paddingVertical: 8,
    fontFamily: Fonts.medium
  },
  itemStyle: {
    flexDirection: "row",
    width: 200,
    alignItems: "center",
    padding: 8,
    borderBottomColor: Colors.LightBorder,
    borderBottomWidth: 1
  },
  languageText: {
    paddingHorizontal: 10,
    fontSize: 16
  },
  closeButton: {
    color: Colors.Red,
    fontSize: 16,
    margin: 15,
    paddingHorizontal: 10
  }
});
