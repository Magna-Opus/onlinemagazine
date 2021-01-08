import React from "react"
import { Text } from "react-native-paper"
import { View,TouchableOpacity ,Linking
} from "react-native"
import Colors from '../../../Global/Color.js'
const LoginBottomText = ({ navigation }) => (
  <View style={{justifyContent:'center', alignItems:'center'}}>
    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
    <Text style={{ textAlign: "center", margin: 8, color: Colors.Black }}>
      Already have an Account?
    </Text>
    <TouchableOpacity
      onPress={() => navigation.goBack()}
    >
    <Text  style={{ textDecorationLine: "underline", color: Colors.Red, paddingHorizontal:3 }} >
        Sign In
      </Text>
    </TouchableOpacity>
    
    
    </View>
    <View style={{width:'100%',flexDirection:'row',alignItem:'center',justifyContent:'space-evenly',marginTop:20}}>
        <TouchableOpacity style={{zIndex:9999}} onPress={()=>Linking.openURL('https://onlinemagazine.org.uk/privacy-policy-app/')}>
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
    <View style={{marginVertical:20}}>
            <Text style={{color:Colors.Green, fontSize:15,}}>© 2021, onlinemagazine</Text>
    </View>
  </View>
  
)

export default LoginBottomText
