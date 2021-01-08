import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');
import Colors from "../../Global/Color.js";

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    width:width,
    borderBottomColor: Colors.LightBorder,
    borderBottomWidth: 1,
    // justifyContent: 'center',
  },
  imageStyle: {
    width: width*0.18,
    height:50,
    alignSelf: 'center',
    marginLeft:5
  },
  innerContainer: {
    flexDirection:'row',
    width: width*0.7,
  },
  textContainer:{
    width: width*0.8-65
  },
  postView: {
    flexDirection: "row"
  },
  postText: {
    fontSize: 10,
    marginLeft: 3
  },
  mikeView: {
    justifyContent: "space-between",
    flexDirection: "row",
    width:60,
    alignItems: "center"
  }
});

export default styles;
