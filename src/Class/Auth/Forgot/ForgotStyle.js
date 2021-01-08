import { StyleSheet, Dimensions } from "react-native";
import Fonts from "../../../Global/Fonts";
import Colors from '../../../Global/Color.js'

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImageStyle: {
    width: width,
    height: height
    // justifyContent: "center",
    // alignItems: "center"
  },
  innerContainer: {
    height: "80%",
    width: "85%",
    justifyContent: "center",
    backgroundColor: "transparent",
    alignSelf: "center"
  },
  loginContainer: {
    margin: 8,
    width: "95%",
    justifyContent: "center",
    alignItems: "center"
  },
  logoStyle: {
    width: "85%",
    height: 80
  },
  copyrightView: {
    bottom: 20,
    position: "absolute",
    alignSelf: "center"
  },
  copyright: {
    color: Colors.Green,
    fontSize: 15
  },
  inputContainer: {
    flexDirection: "row",
    margin: 4,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(1,1,1,0.06)",
    borderRadius: 4
  },
  inputIcons: {
    width: '15%',
    height: 25
  },
  buttonView: {
    marginTop: 10,
    width: "95%"
  },
  textStyle: {
    textAlign: "center",
    fontSize: 17,
    marginVertical: 20,
    color: Colors.Black,
    fontFamily: Fonts.regular
  },
  headerTextStyle: {
    color: Colors.Red,
    fontSize: 18,
    marginLeft: 15,
    fontFamily: Fonts.medium
  }
});
