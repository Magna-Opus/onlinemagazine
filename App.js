import React, { Component } from 'react';
import
{
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  View,
  ScrollView,
  PixelRatio,
  Dimensions,
  TouchableHighlight,

} from 'react-native';
import  {createStackNavigator}  from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { DrawerActions ,NavigationActions,StackActions} from 'react-navigation';
import drawerScreen from './src/Drawer/DrawerScreen.js'
import Splash from './src/Class/Common/Splash.js'
import Home from './src/Class/Common/Home.js'
import Searchscreen from './src/Class/Common/Searchscreen.js'
import SearchResult from './src/Class/Common/SearchResult.js'
import HotStory from './src/Class/Common/HotStory.js'
import MyFavourites from './src/Class/Common/MyFavourites.js'
import ArticleDetail from './src/Class/Articles/ArticleDetail.js'
import MyArticleDetail from './src/Class/MyArticles/MyArticleDetail.js'
import WriteStory from './src/Class/MyArticles/WriteStory/WriteStory.js'
import EditStory from './src/Class/MyArticles/EditStory/EditStory.js'
import Articles from './src/Class/Articles/Articles.js'
import MyArticles from './src/Class/MyArticles/MyArticles.js'
import Login from './src/Class/Auth/Login/Login.js'
import Forgot from './src/Class/Auth/Forgot/Forgot.js'
import Register from './src/Class/Auth/Register/Register.js'
import About from './src/Class/Content/About/About.js'
import PrivacyPolicy from './src/Class/Content/PrivacyPolicy.js'
import Contact from './src/Class/Content/Contact/Contact.js'
import Help from './src/Class/Content/Help/Help.js'
import OnlineAdvertisement from './src/Class/Content/OnlineAdvertisement/OnlineAdvertisement.js'
import MyProfile from './src/Class/Profile/MyProfile/MyProfile.js'
import ChangePassword from './src/Class/Profile/ChangePassword/ChangePassword.js'
import Colors from './src/Global/Color';




const homeDrawer = createDrawerNavigator({  // set createAppContainer here
    
    Articles: { screen: Articles },
        },{
        initialRouteName: 'Articles',
        headerMode:'none',
        
            drawerPosition: 'left',
            contentComponent: drawerScreen,
            drawerWidth: '70%',
            drawerBackgroundColor: Colors.PrimaryColor,
        });


const AuthNavigator  = createStackNavigator({

  Login:{screen:Login,
    navigationOptions: {
      headerShown: false
  }},

  Forgot:{screen:Forgot,
    navigationOptions: {
      headerShown: false
  }},

  Register:{screen:Register,
    navigationOptions: {
      headerShown: false
  }},


})


const MainNavigator  = createStackNavigator({
  Splash:{screen:Splash,
      navigationOptions: {
          headerShown: false
                }},  

  AuthNavigator:{screen:AuthNavigator,
      navigationOptions: {
        headerShown: false
    }},

  homeDrawer:{screen:homeDrawer,
      navigationOptions: {
        headerShown: false
    }},
  
    MyProfile:{screen:MyProfile,
      navigationOptions: {
          headerShown: false
    }},

    ArticleDetail:{screen:ArticleDetail,
      navigationOptions: {
          headerShown: false
    }},

    MyArticleDetail:{screen:MyArticleDetail,
      navigationOptions: {
          headerShown: false
    }},

    ChangePassword:{screen:ChangePassword,
      navigationOptions: {
          headerShown: false
    }},
    Articles: { screen: Articles,navigationOptions: {
      headerShown: false
  } },
    MyArticles: { screen: MyArticles ,navigationOptions: {
      headerShown: false
  }},
    About: { screen: About,navigationOptions: {
      headerShown: false
  } },
    Contact: { screen: Contact,navigationOptions: {
      headerShown: false
  } },
    Help: { screen: Help ,navigationOptions: {
      headerShown: false
  }},
   WriteStory: { screen: WriteStory ,navigationOptions: {
      headerShown: false
  }},
  EditStory: { screen: EditStory ,navigationOptions: {
    headerShown: false
}},
HotStory: { screen: HotStory ,navigationOptions: {
  headerShown: false
}},
MyFavourites: { screen: MyFavourites ,navigationOptions: {
  headerShown: false
}},
Searchscreen: { screen: Searchscreen ,navigationOptions: {
  headerShown: false
}},
SearchResult: { screen: SearchResult ,navigationOptions: {
  headerShown: false
}},
OnlineAdvertisement: { screen: OnlineAdvertisement ,navigationOptions: {
  headerShown: false
}},
Home: { screen: Home,navigationOptions: {
  headerShown: false
} },       

              })

              
              

const App = createAppContainer(MainNavigator);

export default App;