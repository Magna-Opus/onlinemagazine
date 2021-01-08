import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');
import Colors from "../../Global/Color.js";

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    width:width,
    borderBottomColor: Colors.LightBorder,
    borderBottomWidth: 1,
  },
  imageStyle: {
    width: width*0.2,
    height:50,
    alignSelf: 'center',
  },
  innerContainer: {
    flexDirection:'row',
    width: width*0.8,
  },
  textContainer:{
    width: width*0.6
  },
  postView: {
    flexDirection: "row"
  },
  postText: {
    fontSize: 10,
    marginLeft: 5
  },
  mikeView: {
    justifyContent: "space-between",
    flexDirection: "row",
    width:width*0.05,
    marginHorizontal: 10,
    alignItems: "center"
  }
});

export default styles;
