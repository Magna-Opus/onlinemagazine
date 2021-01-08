import React, { Component } from "react";
import { View, Text, Keyboard, TouchableOpacity, Image,TextInput,Alert } from "react-native";
import { Button,Surface } from "react-native-paper";
import styles from "./RegisterFormStyle";
import ImagePicker from "react-native-image-picker";
import Colors from "../../../Global/Color.js";
import Images from "../../../Global/Images.js";
import {RegisterData} from '../../../Service/RegisterData.js'
import NetInfo from '@react-native-community/netinfo';

import {
  displaySuccessToast,
  displayErrorToast
} from "../../../Global/SnackMessage";
class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname:"",
      userName: "",
      email: "",
      password: "",
      mobileNumber: "",
      userImage: {},
      error: {},
      cpassword:'',
      loading:false,
    };
    this.fname = React.createRef();
    this.lname = React.createRef();
    this.userName = React.createRef();
    this.email = React.createRef();
    this.mobileNumber = React.createRef();
    this.password = React.createRef();
    this.cpassword = React.createRef();
  }

  focusNextField = nextField => {
    this[nextField].current.focus();
  };


  
  handleRegister()
    {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      var charreg=/^[A-Za-z]+$/;
      NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
      
      if(state.isConnected){
      if(this.state.fname==='')
      {
        displayErrorToast("First Name is required")
        if (this.state.lname!='')
        {
          if(charreg.test(this.state.lname) == false)
          displayErrorToast("LastName is invalid");
        }
      }
      else if(charreg.test(this.state.fname) == false)
      {
        displayErrorToast("FirstName is invalid");
      }
      else if(this.state.userName==='')
      {
        displayErrorToast("User Name is required")
      }
      else if(this.state.email==='')
      {
        displayErrorToast("Email is required")
      }
      else if(reg.test(this.state.email) == false)
      {
        displayErrorToast("Email is invalid");
      }
      else if(this.state.mobileNumber==='')
      {
        displayErrorToast("Mobile Number is required")
      }
      else if(this.state.mobileNumber.length<10)
      {
        displayErrorToast("Mobile Number is invalid")
      }
      else if(this.state.password==='')
      {
        displayErrorToast("Password is required")
      }
      else if(this.state.password.length<6) 
      {
        displayErrorToast("Password should be of min 6 characters");
      }
      else if(this.state.cpassword==='')
      {
        displayErrorToast("Confirm Password is required")
      }
      else if(this.state.cpassword.length<6) 
      {
        displayErrorToast("Password Mismatch")
      }
      else if(this.state.password!==this.state.cpassword)
      {
        displayErrorToast("Password Mismatch");
      }
      else
      {
        this.setState({loading:true})
        var formData = new FormData;
        formData.append("username", this.state.userName)
        formData.append("display_name", this.state.userName)
        formData.append("email", this.state.email);
        formData.append("first_name", this.state.fname);
        formData.append("last_name", this.state.lname);
        formData.append("user_pass", this.state.password);
        formData.append("meta[phone_number]", this.state.mobileNumber);
        formData.append("notify", "no");
        this.state.userImage && this.state.userImage.uri
        ? formData.append("user_image",{ uri: this.state.userImage.uri,name: Math.round(Math.random() * 100000000) +'profile_photo.jpg', type: 'image/jpg' })
        : null;
        RegisterData('wp-json/api/register',formData).then((register)=>{
          console.log("Register Response",register)
          this.setState({loading:false})
          if(register.status=='success')
          {
            displaySuccessToast(register.message)
            this.setState({userName:'',email:'',fname:'',lname:'',mobileNumber:'',userImage:'',cpassword:'',password:''})
          }
          else
          {
            displayErrorToast(register.error)
            
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

  uploadPic = () => {
    ImagePicker.showImagePicker(response => {
      // console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          userImage: {
            uri: response.uri,
            type: response.type,
            name: response.fileName
          }
        });
      }
    });
  };

  render() {
    const {
      name,
      userName,
      email,
      password,
      mobileNumber,
      error,
      userImage
    } = this.state;
    return (
      <View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            resizeMode="cover"
            source={userImage.uri ? { uri: userImage.uri } : null}
          />

          <TouchableOpacity
            onPress={() => this.uploadPic()}
            style={styles.uploadButton}
          >
            <Text style={styles.uploadText}>
              Upload Profile Pic
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcons}
            resizeMode="contain"
            source={Images.userIcon}
          />
          <TextInput
          style={{paddingVertical:15,width:'85%',fontSize:16}}
          placeholder="First Name"
            refs={this.fname}
            handleSubmitEditing={() => this.focusNextField("lname")}
            blured={false}
            error={error.fname}
            returnKey={"next"}
            onChangeText={fname => this.setState({ fname })}
            keyboardType={'default'}
            autoCapitalize={"none"}
            blured={false}
            value={this.state.fname}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcons}
            resizeMode="contain"
            source={Images.userIcon}
          />
          <TextInput
          style={{paddingVertical:15,width:'85%',fontSize:16}}
          placeholder="Last Name"
            refs={this.lname}
            handleSubmitEditing={() => this.focusNextField("userName")}
            blured={false}
            error={error.lname}
            returnKey={"next"}
            onChangeText={lname => this.setState({ lname })}
            keyboardType={'default'}
            autoCapitalize={"none"}
            blured={false}
            value={this.state.lname}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcons}
            resizeMode="contain"
            source={Images.userIcon}
          />
          <TextInput
          style={{paddingVertical:15,width:'85%',fontSize:16}}
          placeholder="User name"
            refs={this.userName}
            error={error.userName}
            onChangeText={userName => this.setState({ userName })}
            handleSubmitEditing={() => this.focusNextField("email")}
            returnKey={"next"}
            keyboardType={'default'}
            autoCapitalize={"none"}
            blured={false}
            value={this.state.userImage}

          />
        </View>

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
            keyboardType={'email-address'}
            onChangeText={email => this.setState({ email })}
            handleSubmitEditing={() => this.focusNextField("mobileNumber")}
            returnKey={"next"}
            autoCapitalize={"none"}
            blured={false}
            value={this.state.email}

          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcons}
            resizeMode="contain"
            source={Images.phoneIcon}
          />
          <TextInput
          style={{paddingVertical:15,width:'85%',fontSize:16}}
          placeholder="Mobile Number"
            refs={this.mobileNumber}
            returnKey={"done"}
            error={error.mobileNumber}
            keyboardType={"phone-pad"}
            onChangeText={mobileNumber => this.setState({ mobileNumber })}
            handleSubmitEditing={() => this.focusNextField("password")}
            returnKey={"next"}
            maxLength={15}
            blured={false}
            value={this.state.mobileNumber}

          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcons}
            resizeMode="contain"
            source={Images.passwordIcon}
          />
          <TextInput
          style={{paddingVertical:15,width:'85%',fontSize:16}}
            placeholder="Password"
            refs={this.password}
            returnKey={"done"}
            error={error.password}
            onChangeText={password => this.setState({ password })}
            secureTextEntry={true}
            handleAccessoryPress={this.showText}
            handleSubmitEditing={()=>this.focusNextField("cpassword")}
            keyboardType={'default'}
            blured={false}
            value={this.state.password}

          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcons}
            resizeMode="contain"
            source={Images.passwordIcon}
          />
          <TextInput
          style={{paddingVertical:15,width:'85%',fontSize:16}}
            placeholder="Confirm Password"
            refs={this.cpassword}
            returnKey={"done"}
            error={error.cpassword}
            onChangeText={cpassword => this.setState({ cpassword })}
            secureTextEntry={true}
            handleAccessoryPress={this.showText}
            handleSubmitEditing={this.handleRegister}
            keyboardType={'default'}
            blured={false}
            value={this.state.cpassword}

          />
        </View>

        <View style={styles.buttonView}>
          <Button
            dark
            loading={this.state.loading}
            color={Colors.Red}
            mode="contained"
            onPress={()=>this.handleRegister()}
          >
            <Text style={styles.signUpText}>Sign Up</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default RegisterForm;
