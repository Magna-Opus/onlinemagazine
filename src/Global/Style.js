import { StyleSheet } from "react-native";
import Colors from './Color.js'
import Fonts from './Fonts.js'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PrimaryColor
  },
  topContainer: {
    width: "100%",
    height: "25%",
    flexDirection: "row"
  },
  bottomContainer: {
    width: "100%",
    height: "75%",
    
  },
  backgroundImage: { 
    width: "100%", 
    height: "100%" 
  },
  imageOverlayView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(115,115,115,0.4)"
  },
  innerSurface: {
    height: 80,
    width: 80,
    elevation: 0,
    borderRadius: 40,
    borderColor: Colors.White,
    borderWidth: 1
  },
  userImageStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "white",
    borderColor: Colors.White,
    borderWidth: 1
  },
  userName: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    paddingVertical: 5,
    color: Colors.White
  },
  touchView: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginLeft: 5,
  },
  iconsStyle:{ 
    width: 15, 
    height: 15 
  },
  lineStyle:{
    height: 15,
    width: 1,
    backgroundColor: Colors.Black,
    marginLeft: 10
  },
  myProfile: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    marginLeft: 15,
    color:Colors.LightBlack
  }
});

export default styles;
