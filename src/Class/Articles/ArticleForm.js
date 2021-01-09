import React, { Component } from "react";
import { View, FlatList ,Text,Alert} from "react-native";

import styles from "./ArticleFormStyle";
import List from "./ArticleList";
import NoDataFound from "../../Global/NoDataFound";
import Loader from "../../Global/Loader";
import { Title, Button, Surface, Card } from "react-native-paper";
import AsyncStorage from '@react-native-community/async-storage';
import { Get } from "../../Service/Get";
import NetInfo from '@react-native-community/netinfo';
export default class Articles extends Component {


  constructor()
  {
    super();
        this.state = {
          articles:[],
        }
  }
 

  // componentDidMount()
  // {
  //   console.log("pppkkkkk",this.props.token)
  // }

  selectedArticle = async(item) => {
    let { navigation } = this.props;
    var token=await AsyncStorage.getItem('token');
    this.setState({loading:true})
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
      Get('wp-json/api/count-view/'+item.ID,token).then((view)=>{
        console.log(view)
      });
    Get('wp-json/wp/v2/posts/'+item.ID,token).then((posts)=>{
    console.log("posts",posts)
    var pos=posts;
    this.setState({loading:false})
    navigation.navigate("ArticleDetail", {
      articleDetails: pos
    });
    })
  }

  else
  {
      alert("Check your Connection")
  }
  })
  };

  render() {
    if(this.state.loading)
        {
            return(
                <View style={{marginTop:300,alignItems:'center',justifyContent:'center'}}>
                <Loader loaderclose={this.state.loading} />
                </View>
            )
        }
    const { data,token } = this.props;
    return (
      <View style={styles.container}>
       
       { data && data.length!=0 ? (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
               <List item={item} onSelectArticle={this.selectedArticle.bind(this)} token={token}/>
            )}
            keyExtractor={(_item, index) => index.toString()}
          />
        ) : (
          <View style={{marginTop:300}}><NoDataFound /></View>
        )}
         
      </View>
    );
  }
}

            

