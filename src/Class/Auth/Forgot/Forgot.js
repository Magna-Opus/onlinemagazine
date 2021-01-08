import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from "react-native";
import rootStyles from "../../../Global/Style.js";
import {
  displaySuccessToast,
  displayErrorToast
} from "../../../Global/SnackMessage";
import styles from "./ForgotStyle.js";
import { Surface } from "react-native-paper";
import Images from "../../../Global/Images.js";
import Color from "../../../Global/Color.js";
import Fonts from "../../../Global/Fonts.js";
import {  Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Get} from '../../../Service/Get.js'
import Loader from '../../../Global/Loader.js';
import NetInfo from '@react-native-community/netinfo';

export default class Forgot extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      error: {},
      loading:false,
    };
    this.email = React.createRef();
  }
  
  handleForgot()
    {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
      
      if(state.isConnected){
      if(this.state.email==='')
      {
        displayErrorToast("Email is required")
      }
      else if(reg.test(this.state.email) == false)
      {
        displayErrorToast("Email is invalid");
      }
      else
      {
        this.setState({loading:true})
        Get(`api/user/retrieve_password/?user_login=${this.state.email}`).then((forgot)=>{
          console.log("Forgot Response",forgot)
          this.setState({loading:false})
          if(forgot.status=='error')
          {
            displayErrorToast(forgot.error)
          }
          else if(forgot.status=='ok')
          {
            displaySuccessToast(forgot.msg)
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
    
    const { email, error } = this.state;
    const { navigation } = this.props;

    return (
      // <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
        <View style={[rootStyles.rootContainer, styles.container]}>
          <ImageBackground
            style={styles.backgroundImageStyle}
            source={Images.bgImage}
          >
              <SafeAreaView style={{flex:1}}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 15,
                marginTop: 15
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="ios-arrow-back"
                  size={30}
                  color={Color.White}
                />
              </TouchableOpacity>

              <Text style={styles.headerTextStyle}>Forgot Password</Text>
            </View>

            <View style={styles.innerContainer}>
              <View style={styles.loginContainer}>
                <Image
                  style={styles.logoStyle}
                  resizeMode="contain"
                  source={Images.logo}
                />

                <Text style={styles.textStyle}>
                  {"Please enter your registered E-Mail ID" +
                    "\n" +
                    "in below box to get link to change" +
                    "\n" +
                    "your password"}
                </Text>

                <View style={styles.inputContainer}>
                  <Image
                    style={styles.inputIcons}
                    resizeMode="contain"
                    source={Images.emailIcon}
                  />
                  <TextInput
                   style={{paddingVertical:15,width:'85%',fontSize:16}}
                    placeholder="Email ID"
                    refs={this.email}
                    returnKey={"done"}
                    error={error.email}
                    keyboardType={"email-address"}
                    onChangeText={email => this.setState({ email })}
                    handleSubmitEditing={() => this.handleForgot}
                    autoCapitalize={false}
                  />
                </View>

                <View style={styles.buttonView}>
                  <Button
                    dark
                    loading={this.state.loading}
                    color={Color.Red}
                    mode="contained"
                    onPress={()=>this.handleForgot()}
                  >
                    <Text style={styles.loginText}>Submit</Text>
                  </Button>
                </View>
              </View>
            </View>
            <View style={styles.copyrightView}>
              <Text style={styles.copyright}>© 2021, onlinemagazine</Text>
            </View>
            </SafeAreaView>
          </ImageBackground>
        </View>
      // </SafeAreaView>
    );
  }
}

