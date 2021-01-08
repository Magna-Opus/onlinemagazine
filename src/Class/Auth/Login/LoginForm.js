import React, { Component } from 'react';
import { View, ImageBackground, ScrollView, Image,TouchableOpacity, TextInput,KeyboardAvoidingView,keyboard ,Alert} from 'react-native';
import styles from './LoginFormStyle.js'
import Colors from '../../../Global/Color.js'
import {LoginData} from '../../../Service/LoginData.js'
import Loader from '../../../Global/Loader.js';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {
  displaySuccessToast,
  displayErrorToast
} from "../../../Global/SnackMessage";
import { Text, Surface,Button } from "react-native-paper";
import Images from '../../../Global/Images.js'
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';


export default class SignIn1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username:'',
          password:'',
          secureTextEntry: true,
          error:{},    
          loading:false,

        };
    }

    showText = () => {
      this.setState({ secureTextEntry: !this.state.secureTextEntry });
    };

    handleLogin()
    {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
      
      if(state.isConnected){
      if(this.state.username==='')
      {
        displayErrorToast("Email is required")
      }
      else if(this.state.password==='')
      {
        displayErrorToast("Password is required")
      }
      else if(reg.test(this.state.username) == false)
      {
        displayErrorToast("Email is invalid");
      }
      else
      {
        this.setState({loading:true})
        LoginData('wp-json/jwt-auth/v1/token',{username:this.state.username,password:this.state.password}).then((login)=>{
          console.log("Login Response",login)
          this.setState({loading:false})
          if(login.code)
          {
            displayErrorToast(login.message)
          }
          else
          {
            AsyncStorage.setItem("islogin","true")
            AsyncStorage.setItem("token",login.token)

            const resetAction = StackActions.reset({
              index: 0, // <-- currect active route from actions array
              actions: [
                NavigationActions.navigate({ routeName: "homeDrawer"}),
              ],
            });
            
             this.props.navigation.dispatch(resetAction);
          }
      })
      }
      }

else
{
    alert("Check your Connection")
}
})
    }

    render() {
      const { username, password, secureTextEntry,error} = this.state;
        return (
            <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Image
                style={styles.inputIcon}
                resizeMode="contain"
                source={Images.emailIcon}
              />
              <TextInput
              style={{paddingVertical:15,width:'85%',fontSize:16}}
                placeholder="Email ID"
                mode="flat"
                handleSubmitEditing={() => this.focusNextField("password")}
                returnKey={"next"}
                onChangeText={username => this.setState({ username })}
                keyboardType={"email-address"}
                autoCapitalize={"none"}
                blured={false}
              />
            </View>
    
            <View style={styles.inputContainer}>
              <Image
                style={styles.inputIcon}
                resizeMode="contain"
                source={Images.passwordIcon}
              />
              <TextInput
              style={{paddingVertical:15,width:'85%',fontSize:16}}
                placeholder="Password"
                sideText={secureTextEntry ? "Show" : "Hide"}
                returnKey={"done"}
                onChangeText={password => this.setState({ password })}
                secureTextEntry={secureTextEntry}
                handleAccessoryPress={this.showText}
                handleSubmitEditing={this.handleLogin}
              />
            </View>
    
            <TouchableOpacity
              style={styles.forgotTouch}
              onPress={() => this.props.navigation.navigate("Forgot")}
            >
              <Text style={styles.forgotTextStyle}>Forgot Password?</Text>
            </TouchableOpacity>
    
            <View style={styles.buttonView}>
              <Button
                dark
                loading={this.state.loading}
                color={Colors.Red}
                mode="contained"
                onPress={()=>this.handleLogin()}
              >
                <Text style={styles.loginText}>Sign In</Text>
              </Button>
            </View>
    
          </View> 
        )
    }

}