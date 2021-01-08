import React, { Component } from "react";
import { View, SafeAreaView ,Alert} from "react-native";
import rootStyles from "../MyArticles/MyArticlesStyle.js";
import Color from "../../Global/Color.js";
import { Tab, ScrollableTab, Tabs } from "native-base";
import Articles from "./MyFavouritesListItem";
import Loader from "../../Global/Loader.js";
import {MyHeader} from '../../Global/Header.js'
import AsyncStorage from '@react-native-community/async-storage';
import {Post} from '../../Service/Post.js'
import {UpdateData} from '../../Service/UpdateData.js'
import {Get} from '../../Service/Get.js'
import NoDataFound from "../../Global/NoDataFound";
import { displaySuccessToast, displayErrorToast } from "../../Global/SnackMessage.js";
import NetInfo from '@react-native-community/netinfo';


export default class MyArticles extends Component {
    constructor() {
        super();
        this.state = {
            articlesList:[{"cat_id": 1, "cat_name": "Live"},{"cat_id": 2, "cat_name": "Pending"}],
            myfavourites:[],
            isPendingAllArticles:true,
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

//     let formData = new FormData();
//   formData.append("author",id );
//   Post('api/get_posts_user',formData).then((myarticlescategory)=>{
//       console.log("myarticlescategory",myarticlescategory)
//       this.setState({articlesList:myarticlescategory.category,isPendingAllArticles:false})

//     })
  Get('wp-json/api/all-favourites',token).then((myfavourites)=>{
      console.log("myfavourites",myfavourites)
    this.setState({myfavourites:myfavourites.data,isPendingAllArticles:false})

    })
    
  };

  getArticlesCategory = () => {
    let formData = new FormData();
    Post('api/get_category_index',formData).then((myarticles)=>{
        console.log("myarticlesmm",myarticles)
        // this.setState({articlesList:myarticlescategory.category,isPendingAllArticles:false})
  
      })
  };

  onSelectArticle=(item)=>
{
    let { navigation } = this.props;
    navigation.navigate("MyArticleDetail", {
      articleDetails: item.id
    });
}


markFavourite=async(item)=>
{
  var token=await AsyncStorage.getItem('token');
  NetInfo.fetch().then(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  
  if(state.isConnected){
    Alert.alert(
      'Alert',
      'Do you really want to mark this story unfavourite?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () =>{
  let formData = new FormData();
      formData.append("postid", item.id)
      formData.append("action", 'efav_remove')
  UpdateData('wp-json/api/favourites',formData,token).then((marknonfavourite)=>{
        console.log("marknonfavourite",marknonfavourite)
        if(marknonfavourite.status==200)
        {
          displaySuccessToast(marknonfavourite.message)
          this.getArticles();
        }
        else
        {
          displayErrorToast(marknonfavourite.message)
        }
  })
        }
      },
        
    ],
    {cancelable: false},
  );
}

else
{
    alert("Check your Connection")
}
})
}

  render() {
    
    const { navigation} = this.props;
    return (
      // <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
        <View style={{flex:1,marginBottom:40}}>
            <MyHeader navigation={navigation} name="My Favourites Stories" skip={true}/>
            {this.state.isPendingAllArticles ? <View style={{height:'90%',alignItems:'center',justifyContent:'center'}}><Loader /></View>
            
            :
            <View style={{flex:1}}>
              {this.state.myfavourites.length!=0?
                  <Articles
                    item={this.state.myfavourites}
                    navigation={navigation}
                    onSelectArticle={this.onSelectArticle.bind(this)}
                    onMark={this.markFavourite.bind(this)}
                    />:<NoDataFound />}

                     </View>}
          
        </View>
      // </SafeAreaView>
    );
  }
}

