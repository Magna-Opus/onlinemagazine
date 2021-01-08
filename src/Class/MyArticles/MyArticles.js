import React, { Component } from "react";
import { View, SafeAreaView ,Alert} from "react-native";
import rootStyles from "./MyArticlesStyle.js";
import Color from "../../Global/Color.js";
import { Tab, ScrollableTab, Tabs } from "native-base";
import Articles from "./MyArticlesForm";
import Loader from "../../Global/Loader.js";
import {MyHeader} from '../../Global/Header.js'
import AsyncStorage from '@react-native-community/async-storage';
import {Post} from '../../Service/Post.js'
import {Get} from '../../Service/Get.js'
import NetInfo from '@react-native-community/netinfo';

export default class MyArticles extends Component {
    constructor() {
        super();
        this.state = {
            articlesList:[{"cat_id": 1, "cat_name": "Live"},{"cat_id": 2, "cat_name": "Pending"}],
        }
    }
    
  componentDidMount() {
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
    this.getArticles();
  }

  else
  {
      alert("Check your Connection")
  }
  })
    //this.getArticlesCategory();
  }

  componentWillReceiveProps(next)
  {
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
    this.getArticles();
  }

  else
  {
      alert("Check your Connection")
  }
  })
  }
  

  getArticles = async() => {
    var id=await AsyncStorage.getItem('id');
    var token=await AsyncStorage.getItem('token');

    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
  Get('wp-json/wp/v2/posts?status=publish&author='+id,token).then((myarticles)=>{
      console.log("myarticles",myarticles)
    this.setState({articleslive:myarticles,isPendingAllArticles:false})

    })
    Get('wp-json/wp/v2/posts?status=pending&author='+id,token).then((myarticles)=>{
        console.log("myarticles",myarticles)
      this.setState({articlesdraft:myarticles,isPendingAllArticles:false})

      })
    }

    else
    {
        alert("Check your Connection")
    }
    })
  };

  getArticlesCategory = () => {
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
    let formData = new FormData();
    Post('/api/get_category_index',formData).then((myarticles)=>{
        console.log("myarticlesmm",myarticles)
        // this.setState({articlesList:myarticlescategory.category,isPendingAllArticles:false})
  
      })
    }

    else
    {
        alert("Check your Connection")
    }
    })
  };

  render() {
    const { navigation} = this.props;
    return (
      // <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
        <View style={{flex:1}}>
            <MyHeader navigation={navigation} name="My Stories" skip={true} setting={true}/>
            {this.state.isPendingAllArticles ? <View style={{height:'90%',alignItems:'center',justifyContent:'center'}}><Loader /></View>: null}
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
                  <View style={{flex:1,marginBottom:40}}>
                    {index==0?
                  <Articles
                    navigation={navigation}
                    data={this.state.articleslive}
                    getArticles={this.getArticles}
                  />:null}
                  {index==1?
                  <Articles
                    navigation={navigation}
                    data={this.state.articlesdraft}
                    getArticles={this.getArticles}
                  />:null}
                  </View>
                </Tab>
              ))}
            </Tabs>
          )}
        </View>
      // </SafeAreaView>
    );
  }
}

