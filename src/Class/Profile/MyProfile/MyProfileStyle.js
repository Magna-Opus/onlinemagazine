import { StyleSheet, Dimensions } from "react-native";
import Fonts from "../../../Global/Fonts.js";
import Colors from "../../../Global/Color.js";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backStyle: {
    margin: 15
  },
  imageView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImageStyle: {
    height: 300,
    width: "100%"
  },
  imageOverlayView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Opacity
  },
  userProfile: {
    height: 160,
    width: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: "white",
    borderColor:Colors.LightGray
  },
  userName: {
    fontSize: 20,
    padding: 10,
    color: Colors.LightBlack
  },
  editImageStyle: {
    position: "absolute",
    top:30,
    right: 0,
    // bottom: 300 - 156,
    // left: width / 2 - 156,
    width: 40,
    height: 40,
  },
  bottomContainer: {
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 10
  },
  containerStyle: {
    width: "90%",
    margin: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.BottomBorder,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingLeft: 15
  },
  titleStyle: {
    paddingHorizontal: 5,
    fontSize: 16,
    fontFamily: Fonts.medium,
    backgroundColor: "transparent",
    // height:50,
    width: "85%",
    justifyContent: "center"
  },
  changePassword: {
    width: "90%",
    height: 60,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.Red,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10
  },
  changePasswordText: {
    color: Colors.Red,
    fontSize: 20,
    fontFamily: Fonts.regular
  },
  buttonView: {
    marginVertical: 15,
    width:'70%'
  },
  submitButton:{ 
    width:'70%', 
    height: 50, 
    marginTop:20, 
    justifyContent:'center', 
    alignItems:'center',
    backgroundColor: Colors.PrimaryColor
  }
});

export default styles;
