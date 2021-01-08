import { StyleSheet, Platform ,Dimensions} from 'react-native'
import Colors from '../../../Global/Color.js'

const { width, height } = Dimensions.get("window");

module.exports = StyleSheet.create({ 
container: {
    justifyContent: "center", 
    alignItems: "center",
  },
  backgroundImageStyle: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center"
  },
  innerContainer:{
    height: "80%",
    width: "85%",
    justifyContent: "center",
    backgroundColor: 'transparent'
  },
  loginContainer:{
    margin: 8,
    width: "95%",
    justifyContent: "center",
    alignItems: "center"
  },
  logoStyle:{ 
    width: "85%", 
    height: 80 
  },
  copyrightView:{
    bottom:20, 
    position:'absolute'
  },
  copyright:{
    color:Colors.Green, 
    fontSize:15,
  }

})