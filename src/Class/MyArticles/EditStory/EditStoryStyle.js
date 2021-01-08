import { StyleSheet, Dimensions } from "react-native";
import Fonts from "../../../Global/Fonts.js"
import Color from "../../../Global/Color.js"

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 15
  },
  containerStyle: {
    width: "90%",
    margin: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.BottomBorder,
    flexDirection: "row",
    justifyContent: "space-between",
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
    backgroundColor: Color.Gray
  },
  uploadText: { 
    color: Color.White, 
    fontSize: 16 
  },
  titleStyle: {
    paddingHorizontal: 5,
    fontSize: 16,
    fontFamily: Fonts.medium,
    backgroundColor: "transparent",
    // height:50,
    justifyContent: "center"
  },
  articleStyle: {
    padding: 10,
    fontSize: 14,
    fontFamily: Fonts.regular
  },
  termsContainerStyle: {
    width: "90%",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  uploadImagContainer: {
    flexDirection: "row",
    width: "90%",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: Color.BottomBorder,
    borderWidth: 1,
    borderRadius: 4
  },
  uploadImageText: {
    textAlign: "center",
    fontSize: 17,
    padding: 10,
    color: Color.PrimaryColor
  },
  termsText: {
    textAlign: "center",
    fontSize: 14
  },
  termsStyle: {
    textAlign: "center",
    color: Color.Info,
    fontSize: 14
  },
  buttonView: {
    marginTop: 10,
    width: "70%"
  },
  submitButton: {
    width: "70%",
    height: 50,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.PrimaryColor
  }
});

export default styles;
