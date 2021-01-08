import { StyleSheet, Dimensions } from "react-native"
import Fonts from "../../../Global/Fonts";
import Colors from '../../../Global/Color.js'
const { width } = Dimensions.get("window")

export default StyleSheet.create({

  surfaceContainer:{
    padding: 10,
    backgroundColor: "transparent",
    alignItems: "center"
  },
  imageContainer:{ 
    alignItems: "center" 
  },
  imageStyle:{
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "gray",
    borderWidth: 2,
    borderColor: "white"
  },
  uploadButton: {
    margin: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 15,
    alignItems: "center",
    padding: 5,
    backgroundColor: Colors.Gray
  },
  uploadText: { 
    color: Colors.White, 
    fontSize: 16 
  },
  inputIcons:{ 
    width: '15%', 
    height: 25 
  },
  inputContainer:{
    flexDirection: "row",
    margin: 4,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(1,1,1,0.06)",
    borderRadius: 4
  },
  buttonView: {
    marginTop: 10,
    width:'95%'
  },
  signUpText:{ 
    color: Colors.White, 
    fontSize: 18 
  },

})
