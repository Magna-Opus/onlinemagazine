import { StyleSheet, Platform ,Dimensions} from 'react-native'
import Colors from '../../../Global/Color.js'

const { width, height } = Dimensions.get("window");

module.exports = StyleSheet.create({ 
    container:{ 
        padding: 15, 
        backgroundColor: "transparent", 
        alignItems:'center' 
      },
      inputContainer:{
        flexDirection: "row",
        margin: 8,
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(1,1,1,0.06)",
        borderRadius: 4
      },
      inputIcon:{ 
        width: '15%', 
        height: 25,
      },
      loginText: {
        color: Colors.White, 
        fontSize: 18
      },
      forgotTextStyle: {
        color: Colors.Red
      },
      buttonView: {
        marginTop: 10,
        width:'95%'
      },
      forgotTouch: {
        alignSelf: "flex-end",
        margin: 15,
        marginVertical:5
      }
})