import { StyleSheet, Dimensions } from "react-native"
import Colors from '../../../Global/Color.js'

export default StyleSheet.create({
  container:{ 
    justifyContent: "center", 
    alignItems: "center" 
  },
  keyboardView:{ 
    width: "100%" 
  },
  logoStyle:{ 
    width: "85%", 
    height: 80 
  },
  backgroundImage:{
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  registerForm:{
    flex:1,
    width: "90%",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  logoContainer:{
    margin: 8,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  copyright:{
    color:Colors.Green, 
    fontSize:15,
  }
})
