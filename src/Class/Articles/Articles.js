import React, { Component } from "react";
import { View, SafeAreaView,Alert ,ScrollView,RefreshControl} from "react-native";
import { Text, Title } from "react-native-paper";

import Color from "../../Global/Color.js";
import Images from "../../Global/Images.js";
import Loader from "../../Global/Loader.js";
import rootStyles from "./ArticleStyle.js";
import {Get} from '../../Service/Get.js'

import { Tab, ScrollableTab, Tabs, TabHeading } from "native-base";
import Articles from "./ArticleForm";
import {MyHeader} from '../../Global/Header.js'
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';


export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            articlesList:'',
            isPendingAllArticles:true,
            refreshing:false,
        }
    }
    componentDidMount=async()=> {
    var token=await AsyncStorage.getItem('token');
    this.setState({token:token})
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
    Get('api/get_posts',token).then((category)=>{
        console.log("get category",category)
        this.setState({articlesList:category.category,isPendingAllArticles:false})
    })
  }

  else
  {
      alert("Check your Connection")
  }
  })
    
  }
  onRefresh=async()=>
  {
    var token=await AsyncStorage.getItem('token');
    this.setState({token:token})
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
    Get('api/get_posts',token).then((category)=>{
        console.log("get category",category)
        this.setState({articlesList:category.category,isPendingAllArticles:false,refreshing:false})
    })
  }

  else
  {
      alert("Check your Connection")
  }
  })
  }

  render() {
    const { navigation} = this.props;
    const {token} = this.state;
    return (
        <View style={{flex:1}}>
         <MyHeader navigation={navigation} name="Dashboard" search={true} skip={false}/>

          {this.state.isPendingAllArticles ? <View style={{height:'90%',alignItems:'center',justifyContent:'center'}}><Loader /></View>: null}
        <View style={{flex:1}}>
          {this.state.articlesList.length > 0 && (
            <Tabs
              tabBarUnderlineStyle={{
                backgroundColor: Color.PrimaryColor,
                height: 2,
                width: 100
              }}
              tabBarBackgroundColor={Color.PrimaryColor}
              renderTabBar={() => <ScrollableTab />}
            >
              {this.state.articlesList.map((item, index) => (
                <Tab
                  key={index}
                  heading={item.cat_name}
                  activeTabStyle={{ backgroundColor: Color.PrimaryColor }}
                  tabStyle={{ backgroundColor: Color.PrimaryColor }}
                  activeTextStyle={{ color: Color.Black }}
                  textStyle={{ color: Color.Gray }}
                >
                   <ScrollView style={{flex:1}} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }>
                  <Articles navigation={navigation} data={item.posts} token={token}/>
                  <View style={{height:100}}/>
                  </ScrollView>
                </Tab>
                
              ))}
            </Tabs>
            
          )}
          </View>
            </View>
    );
  }
}