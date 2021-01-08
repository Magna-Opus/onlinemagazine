import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../Global/Color.js";
import Fonts from "../../Global/Fonts.js";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  coverImage:{
    width:'100%'
  },
  innerContainer: {
    height: height*0.4,
    backgroundColor: Colors.Opacity,
    alignItems: 'center',
    justifyContent:'flex-start'
  },
  bottomContainer: {
    flex:1,
    padding:10
  },
  detailsContainer: {
    elevation: 1,
    height: height*0.6+38,
    position: "absolute",
    top: -40,
    left: 30,
    right: 30,
    borderRadius: 5,
  },
  scrollViewStyle:{
    marginVertical:10,
  },
  postView: {
    width:'90%',
    flexDirection: "row",
    justifyContent:'flex-start'
  },
  postText: {
    fontSize: 12,
    marginLeft: 3,
    paddingRight: 10,
    color: Colors.LightBlack
  },
  translateButtonStyle:{
      width:'50%',
      height:50,
      backgroundColor: Colors.LightBorder,
      justifyContent: 'center',
      alignItems:'center',
  },
  audioButtonStyle:{
    width:'50%',
    height:50,
    backgroundColor: Colors.Red,
    justifyContent: 'center',
    alignItems:'center',
  },
  titleStyle:{
    fontSize:17,
    fontFamily: Fonts.medium,
    color: Colors.Green,
    padding:10
  },
  headerTextStyle: {
    flex:1,
    fontSize: 14,
    fontFamily: Fonts.regular,
    padding:10,
  }
});

export default styles;
