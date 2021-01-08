import React, { Component } from "react";
import { View, Keyboard, Text, TextInput, SafeAreaView,Alert } from "react-native";
import { Button } from "react-native-paper";
import styles from "./ChangePasswordStyle";
import Colors from "../../../Global/Color.js";
import Fonts from "../../../Global/Fonts.js";
import {
  displayErrorToast,
  displaySuccessToast
} from "../../../Global/SnackMessage";
import {MyHeader} from '../../../Global/Header.js'
import {RegisterData} from '../../../Service/RegisterData.js'
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

export default class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      old_password: "",
      new_password: "",
      confirmPassword: "",
      secureTextEntry: true,
      error: {},
      user_id: ""
    };
    this.old_password = React.createRef();
    this.new_password = React.createRef();
    this.confirmPassword = React.createRef();
  }

  handleSubmit = async() => {
    Keyboard.dismiss();
    var id=await AsyncStorage.getItem('id');
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
    let formData = new FormData();
    if (this.state.old_password=='') 
    {
        displayErrorToast("Old Password is required");
    }
    else if (this.state.old_password.length<6) 
    {
        displayErrorToast("Invalid Old Password");
    }
    else if (this.state.new_password=='') 
    {
        displayErrorToast("New Password is required");
    }
    else if (this.state.new_password.length<6) 
    {
        displayErrorToast("New Password should be of min 6 characters");
    }
    else if (this.state.confirmPassword=='') 
    {
        displayErrorToast("Confirm Password is required");
    }
    else if (this.state.confirmPassword.length<6) 
    {
        displayErrorToast("New Password should be of min 6 characters");
    }
     else {
      if (this.state.new_password === this.state.confirmPassword) {
        formData.append("user_id", id)
        formData.append("old_password",this.state.old_password )
        formData.append("new_password", this.state.new_password)
        RegisterData('api/user/change_password',formData).then((changepassword)=>{
            console.log("Change Password Response",changepassword)
            if(changepassword.status=='success')
            {
                displaySuccessToast(changepassword.message);
                this.setState({old_password:'',confirmPassword:'',new_password:''})
            }
            else
            {
                displayErrorToast(changepassword.message);
            }
        })
      } else {
        displayErrorToast(
          "Password Mismatch"
        );
      }
    }
  }

  else
  {
      alert("Check your Connection")
  }
  })
  };

  focusNextField = nextField => {
    this[nextField].current.focus();
  };

  render() {
    const { isPendingChangePassword, navigation } = this.props;
    const {
      old_password,
      new_password,
      confirmPassword,
      secureTextEntry,
      error
    } = this.state;

    return (
      // <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
        <View style={{ flex: 1 }}>
          <MyHeader
            name="Change Password"
            skip={true}
            navigation={navigation}
          />

          <View style={styles.container}>
            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: error.old_password
                    ? Colors.Red
                    : Colors.Transparent
                }
              ]}
            >
              <Text style={styles.titleStyle}>Old Password</Text>

              <TextInput
                style={styles.textInputStyle}
                underlineColorAndroid="transparent"
                placeholder="***********"
                secureTextEntry={true}
                value={old_password}
                ref={this.old_password}
                error={error.old_password}
                autoCapitalize={"none"}
                onChangeText={old_password => this.setState({ old_password })}
                onSubmitEditing={() => this.focusNextField("new_password")}
                returnKeyType={"next"}
                blurOnSubmit={false}
              />
            </View>

            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: error.new_password
                    ? Colors.Red
                    : Colors.Transparent
                }
              ]}
            >
              <Text style={styles.titleStyle}>New Password</Text>

              <TextInput
                secureTextEntry={true}
                style={styles.textInputStyle}
                underlineColorAndroid="transparent"
                placeholder="***********"
                value={new_password}
                ref={this.new_password}
                error={error.new_password}
                autoCapitalize={"none"}
                onChangeText={new_password => this.setState({ new_password })}
                onSubmitEditing={() => this.focusNextField("confirmPassword")}
                returnKeyType={"next"}
                blurOnSubmit={false}
              />
            </View>

            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: error.confirmPassword
                    ? Colors.Red
                    : Colors.Transparent
                }
              ]}
            >
              <Text style={styles.titleStyle}>Confirm Password</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.textInputStyle}
                underlineColorAndroid="transparent"
                placeholder="***********"
                value={confirmPassword}
                ref={this.confirmPassword}
                error={error.confirmPassword}
                autoCapitalize={"none"}
                onChangeText={confirmPassword =>
                  this.setState({ confirmPassword })
                }
                onSubmitEditing={() => this.handleSubmit()}
                returnKeyType={"done"}
              />
            </View>

            <View style={styles.changeButtonView}>
              <Button
                // style={styles.buttonStyle}
                mode="contained"
                loading={isPendingChangePassword}
                onPress={() => this.handleSubmit()}
                color={Colors.Red}
                theme={{ roundness: 5 }}
              >
                <Text
                  style={{
                    color: Colors.White,
                    fontSize: 18,
                    fontFamily: Fonts.regular
                  }}
                >
                  Save Password
                </Text>
              </Button>
              {/* <Button title={"Save Password"} load /> */}
            </View>
          </View>
        </View>
      // </SafeAreaView>
    );
  }
}

