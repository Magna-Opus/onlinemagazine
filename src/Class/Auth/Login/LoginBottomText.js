import React from "react"
import { Text } from "react-native-paper"
import { View,TouchableOpacity,Linking } from "react-native"
import Colors from '../../../Global/Color.js'

const LoginBottomText = ({ navigation: { navigate } }) => (
  <View>
    <Text style={{ textAlign: "center", margin: 8, color: Colors.Black }}>
      Don't have an Account?{" "}
      <Text
        onPress={() => navigate("Register")}
        style={{ textDecorationLine: "underline", color: Colors.Red }}
      >
        Sign Up
      </Text>
      </Text>
      <View style={{flexDirection:'row',alignItem:'center',justifyContent:'space-evenly',marginTop:20}}>
        <TouchableOpacity onPress={()=>Linking.openURL('https://onlinemagazine.org.uk/privacy-policy-app/')}>
      <Text style={{ textDecorationLine: "underline", color: Colors.Red }}>
      Privacy Policy
      </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>Linking.openURL('https://onlinemagazine.org.uk/terms-conditions-app/')}>
      <Text
        style={{ textDecorationLine: "underline", color: Colors.Red }}
      >
        Terms and Conditions
      </Text>
      </TouchableOpacity>
    </View>
  </View>
)

export default LoginBottomText
