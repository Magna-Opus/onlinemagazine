import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Keyboard,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-paper";
import ImagePicker from "react-native-image-picker";
import styles from "./MyProfileStyle";
import Fonts from "../../../Global/Fonts.js";
import Colors from "../../../Global/Color.js";
import Images from "../../../Global/Images.js";
import Loader from "../../../Global/Loader.js";
import {Get} from '../../../Service/Get.js'
import {UpdateData} from '../../../Service/UpdateData.js'
import {
    displaySuccessToast,
    displayErrorToast
  } from "../../../Global/SnackMessage";
import {MyHeader} from '../../../Global/Header.js'
import AsyncStorage from '@react-native-community/async-storage';
const url='https://onlinemagazine.org.uk/wp-content/uploads/ultimatemember/';
import NetInfo from '@react-native-community/netinfo';

export default class MyProfile extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname:'',
      email: "",
      mobileNumber: "",
      address: "",
      userImage: {},
      error: {},
      loading:false,
      loading1:true,
    };

    this.fname = React.createRef();
    this.lname = React.createRef();
    this.email = React.createRef();
    this.mobileNumber = React.createRef();
    this.address = React.createRef();
  }

  async componentDidMount() {
    var token=await AsyncStorage.getItem('token');
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
    Get('wp-json/wp/v2/users/me',token).then((myprofile)=>{
        console.log("myprofile",myprofile)
        this.setState({user:myprofile.profile})
         this.setState({
        myname: myprofile.name,
        fname: myprofile.profile.user_first_name,
        lname: myprofile.profile.user_last_name,
        email: myprofile.profile.user_email,
        mobileNumber: myprofile.profile.user_phone,
        address: myprofile.profile.user_address?myprofile.profile.user_address:'',
        userImage: myprofile.meta.profile_photo!=null ? url+myprofile.profile.id+'/'+myprofile.meta.profile_photo : '',

        loading1:false,
    });
    console.log(url+myprofile.profile.id+'/'+myprofile.meta.profile_photo)
    })
  }

  else
  {
      alert("Check your Connection")
  }
  })
  }
  focusNextField = nextField => {
    this[nextField].current.focus();
  };

  handleSubmit = async() => {
    Keyboard.dismiss();
    var token=await AsyncStorage.getItem('token');
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
      var charreg=/^[A-Za-z]+$/;
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
    else if(this.state.mobileNumber==='')
    {
      displayErrorToast("Mobile Number is required")
    }
    else if(this.state.mobileNumber.length<10)
      {
        displayErrorToast("Mobile Number is invalid")
      }
    else
    {
      this.setState({loading:true})
      var formData = new FormData;
      formData.append("first_name", this.state.fname)
      formData.append("last_name", this.state.lname)
        formData.append("phone_number", this.state.mobileNumber);
        this.state.userImage
        ? formData.append("profile_image",{ uri: this.state.userImage,name: Math.round(Math.random() * 100000000) +'profile_photo.jpg', type: 'image/jpg' })
        : null;
        UpdateData('wp-json/api/updateuser',formData,token).then((updateprofile)=>{
          console.log("Update Profile Response",updateprofile)
          this.setState({loading:false})
          if(updateprofile.code)
          {
            displayErrorToast(updateprofile.message)
          }
          else
          {
              displaySuccessToast("Profile updated successfully")
          }
      })
    }
  }

  else
  {
      alert("Check your Connection")
  }
  })
  };

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
          userImages: {
            uri: response.uri,
            type: response.type,
            name: response.fileName
          }
        });
        this.setState({
          userImage:response.uri
      })
      }
    });
  };

  render() {
    const { navigation, user} = this.props;
    if(this.state.loading1)
        {
            return(
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Loader loaderclose={this.state.loading1} />
                </View>
            )
        }
    return (
      <View style={[styles.container,{backgroundColor:'white'}]}>
          <MyHeader
            name="Profile"
            skip={true}
            navigation={navigation}
          />
         <ScrollView> 
        <ImageBackground
          style={styles.backgroundImageStyle}
          source={
            require("../../../Image/image.jpeg")
          }
        >
          <View style={styles.imageOverlayView}>
           

            <View style={styles.imageView}>
              <Image
                style={styles.userProfile}
                source={
                    this.state.userImage
                    ? { uri: this.state.userImage}:
                    require("../../../Image/defaultImage.png")
                }
              />

              <TouchableOpacity
                style={styles.editImageStyle}
                onPress={() => this.uploadPic()}
              >
                <Image
                  style={{ height: "100%", width: "100%" }}
                  resizeMode="contain"
                  source={Images.editImage}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>
              {this.state.myname ? this.state.myname: "No Name"}
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.bottomContainer}>
          <View style={styles.containerStyle}>
            <TextInput
              style={{width:'80%'}}
              placeholder="First Name"
              refs={this.fname}
              handleSubmitEditing={() => this.focusNextField("lname")}
              returnKey={"next"}
              onChangeText={fname => this.setState({ fname })}
              value={this.state.fname}
              returnKeyType="next"
              keyboardType={"default"}
              autoCapitalize={"none"}
              blured={false}
            />
            <Button icon={Images.editInfo} />
          </View>

          <View style={styles.containerStyle}>
            <TextInput
              style={{width:'80%'}}
              placeholder="Last Name"
              refs={this.lname}
              handleSubmitEditing={() => this.focusNextField("email")}
              returnKey={"next"}
              onChangeText={lname => this.setState({ lname })}
              value={this.state.lname}
              returnKeyType="next"
              keyboardType={"default"}
              autoCapitalize={"none"}
              blured={false}
            />
            <Button icon={Images.editInfo} />
          </View>

          <View style={styles.containerStyle}>
            <Text>{this.state.email}</Text>
          </View>

          <View style={styles.containerStyle}>
            <TextInput
              style={{width:'80%'}}
              placeholder="Mobile Number"
              refs={this.mobileNumber}
              returnKey={"next"}
              onChangeText={mobileNumber => this.setState({ mobileNumber })}
              value={this.state.mobileNumber}
              returnKeyType="next"
              maxLength={15}
              keyboardType="phone-pad"
              autoCapitalize={"none"}
              blured={false}
            />
            <Button icon={Images.editInfo} />
          </View>

          {/* <View style={styles.containerStyle}>
            <TextInput
              style={{width:'80%'}}
              placeholder="Address"
              refs={this.address}
              returnKey={"next"}
              onChangeText={address => this.setState({ address })}
              value={this.state.address}
              keyboardType={"default"}
              autoCapitalize={"none"}
            />
            <Button icon={Images.editInfo} />
          </View> */}

          <TouchableOpacity
            style={styles.changePassword}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <Text style={styles.changePasswordText}>Change Password</Text>
          </TouchableOpacity>

          <View style={styles.buttonView}>
            <Button
              style={styles.buttonStyle}
              mode="contained"
              // dark={dark}
              loading={this.state.loading}
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
                Update
              </Text>
            </Button>
          </View>
        </View>
        </ScrollView>
      </View>
    );
  }
}
