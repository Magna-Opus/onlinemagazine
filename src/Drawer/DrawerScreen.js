import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {ScrollView, Text, Linking,View,TouchableOpacity,Image,Alert,StyleSheet,FlatList,Platform,ImageBackground,Divider} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const url='https://onlinemagazine.org.uk/wp-content/uploads/ultimatemember/';
import {NavigationEvents} from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { StackActions } from 'react-navigation'
import {SafeAreaView} from 'react-native-safe-area-context'
import Colors from '../Global/Color.js'
import styles from '../Global/Style.js'
import Images from '../Global/Images.js'
import {Get} from '../Service/Get.js'
import NetInfo from '@react-native-community/netinfo';
import Share from 'react-native-share';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import Zocial from "react-native-vector-icons/Zocial";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

class DrawerScreen extends Component {
navigateToScreen = (route) => () => {
const navigateAction = NavigationActions.navigate({
routeName: route
});
this.setState({down:true})
this.props.navigation.dispatch(navigateAction);
// this.props.navigation.dispatch(DrawerActions.openDrawer());
this.props.navigation.dispatch(DrawerActions.closeDrawer())
}
constructor(props)
{
super(props);
this.state = {
  url:'',
  hasimage:false,
  loading:true,
  name:'',
  image:'',
  appurls:''
}

}

componentDidMount() {
  
  NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
  this.getData()
  this.getLinks()
}

else
{
    alert("Check your Connection")
}
})
}

getLinks=async()=>
{
  var token=await AsyncStorage.getItem('token');
  Get('wp-json/api/applinks',token).then((appurls)=>{
    console.log(appurls)
    this.setState({appurls:appurls.data})
   
   })
}
getData=async()=>{
  var token=await AsyncStorage.getItem('token');
  console.log(token)
  Get('wp-json/wp/v2/users/me',token).then((getprofile)=>{
      console.log("getprofile",getprofile)
      this.setState({user:getprofile.profile})
       this.setState({
      myname: getprofile.name,
      fname: getprofile.profile.user_first_name,
      lname: getprofile.profile.user_last_name,
      email: getprofile.profile.user_email,
      mobileNumber: getprofile.profile.user_phone,
      address: getprofile.profile.user_address?getprofile.profile.user_address:'',
      userImage: getprofile.meta.profile_photo!=null ? url+getprofile.profile.id+'/'+getprofile.meta.profile_photo : '',
      
  });
  AsyncStorage.setItem("id",JSON.stringify(getprofile.id))
  })
}

componentWillReceiveProps(newProps) {
  NetInfo.fetch().then(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  
  if(state.isConnected){
  this.getData()
  }

else
{
    alert("Check your Connection")
}
})
  // Here you will get the parameter every time. By checking the parameter you can achieve your need.
}

logout()
    {
        let that=this;
        Alert.alert(
            'Alert',
            'Do you really want to logout?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () =>{
                
                    AsyncStorage.removeItem('islogin');
                    AsyncStorage.removeItem('id');
                    AsyncStorage.removeItem('token');

              // Sign-out successful.
              const resetAction = StackActions.reset({
              index: 0, // <-- currect active route from actions array
              actions: [
                NavigationActions.navigate({ routeName: "AuthNavigator"}),
              ],
            });
              that.props.navigation.dispatch(resetAction);
             
        }

        
        
         },
        
            ],
            {cancelable: false},
          );
        
    }


render () {
  const {navigation}= this.props;
  var url
  if(Platform.OS==='android'){
    url= this.state.appurls.android_link
    }
    else if(Platform.OS==='ios')
    {
     url= this.state.appurls.ios_link
    }

    let shareOptions = {
          title: "Online Magazine",
          message: "Link to the Online Magazine app",
          url: url,
          subject: "Online Magazine App Link" //  for email
        };
return (
  

<View style={{flex:1, backgroundColor: Colors.PrimaryColor }}>
  
    <View style={styles.topContainer}>
      <ImageBackground
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require("../Image/image.jpeg")
        }
      >
        <SafeAreaView style={styles.imageOverlayView}>
          <Image
            style={styles.userImageStyle}
            resizeMode="cover"
            source={
              this.state.userImage
                ? { uri: this.state.userImage }
                : require("../Image/defaultImage.png")
            }
          />
          {console.log(this.state.userImage)}
          <Text style={styles.userName}>
            {this.state.myname ? this.state.myname  : "No Name"}
          </Text>
        </SafeAreaView>
      </ImageBackground>
    </View>

    
<View style={styles.bottomContainer}>
<ScrollView>
    <TouchableOpacity
      style={styles.touchView}
      onPress={() =>{ navigation.navigate("Articles"),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
    >
      <FontAwesome
                  name={'list-alt'}
                  size={15}
                  color={Colors.LightBlack}
                />

      <View style={styles.lineStyle} />
      <Text style={styles.myProfile}>All Stories</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.touchView}
      onPress={() => {navigation.navigate("MyArticles"),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
    >
      <FontAwesome5
                  name={'list-alt'}
                  size={15}
                  color={Colors.LightBlack}
                />

      <View style={styles.lineStyle} />
      <Text style={styles.myProfile}>My Stories</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.touchView}
      onPress={() => {navigation.navigate("MyFavourites"),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
    >
      <Fontisto
                  name={'nav-icon-list-a'}
                  size={15}
                  color={Colors.LightBlack}
                />

      <View style={styles.lineStyle} />
      <Text style={styles.myProfile}>My Favourite Stories</Text>
    </TouchableOpacity>


    <TouchableOpacity
      style={styles.touchView}
      onPress={() =>
        Linking.openURL("mailto:admin@onlinemagazine.org.uk?subject=My Story")
      }
    >
      <Zocial
                  name={'email'}
                  size={15}
                  color={Colors.LightBlack}
                />

      <View style={styles.lineStyle} />
      <Text style={styles.myProfile}>Send Email</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.touchView}
      onPress={() => {navigation.navigate("MyProfile"),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
    >
      <FontAwesome
                  name={'user'}
                  size={15}
                  color={Colors.LightBlack}
                />

      <View style={styles.lineStyle} />
      <Text style={styles.myProfile}>My Profile</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.touchView}
      onPress={() => {navigation.navigate("OnlineAdvertisement"),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
    >
      <FontAwesome5
                  name={'adversal'}
                  size={15}
                  color={Colors.LightBlack}
                />

      <View style={styles.lineStyle} />
      <Text style={styles.myProfile}>Online Advertisement</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.touchView}
      onPress={() => {navigation.navigate("About"),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
    >
      <Entypo
                  name={'info-with-circle'}
                  size={15}
                  color={Colors.LightBlack}
                />

      <View style={styles.lineStyle} />
      <Text style={styles.myProfile}>About Us</Text>
    </TouchableOpacity>
    
    <TouchableOpacity
      style={[styles.touchView, { marginLeft: 3 }]}
      onPress={() =>Share.open(shareOptions)}
    >
      <Entypo name="share" size={18} color={Colors.LightBlack} />
      <View style={styles.lineStyle} />
      <Text style={styles.myProfile}>Share</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.touchView}
      onPress={() => {navigation.navigate("Contact"),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
    >
      <MaterialCommunityIcons
                  name={'contacts'}
                  size={15}
                  color={Colors.LightBlack}
                />

      <View style={styles.lineStyle} />
      <Text style={styles.myProfile}>Contact Us</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.touchView}
      onPress={() => {navigation.navigate("Help"),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
    >
      <AntDesign
                  name={'questioncircle'}
                  size={15}
                  color={Colors.LightBlack}
                />

      <View style={styles.lineStyle} />
      <Text style={styles.myProfile}>Help</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.touchView} onPress={()=>this.logout()}>
    <MaterialCommunityIcons
                  name={'logout'}
                  size={15}
                  color={Colors.LightBlack}
                />

      <View style={styles.lineStyle} />
      <Text style={styles.myProfile}>Logout</Text>
    </TouchableOpacity>
      </ScrollView>

  </View>
</View>
);
}
}

DrawerScreen.propTypes = {
navigation: PropTypes.object
};

export default DrawerScreen;
