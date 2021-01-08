import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../Global/Color.js";
import Fonts from "../../../Global/Fonts.js";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.PrimaryColor
  },
  buttonView: {
    marginTop: 20
  },
  mainContainer: {
    marginTop: 30
  },
  inputContainer: {
    width: "90%",
    height: 60,
    backgroundColor: Colors.White,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 5,
    marginVertical: 5,
    borderWidth: 1,
  },
  titleStyle:{
    fontSize:11, 
    color:Colors.TextInputPlaceholder,
    paddingHorizontal:10,
    paddingTop: 10,
  },
  textInputStyle:{
    width: "90%",
    height: 35,
    // backgroundColor:'red',
    paddingHorizontal: 12,
    justifyContent: 'flex-start',
  },
  changeButtonView: {
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

