import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import Colors from "../Global/Color.js";
import Fonts from "../Global/Fonts.js";
export default StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  closeContainer: {
    width: width,
    alignItems: "flex-end",
    height:50
  },
  textContainer: {
    marginTop: 0,
    flex:1,
    width: width,
   
    
  },
  imageStyle:{
    width:width,
    height:height-100
  },
  closeButton: {
    color: Colors.Red,
    fontSize: 16,
    margin: 15,
    paddingHorizontal: 10
  }
});
