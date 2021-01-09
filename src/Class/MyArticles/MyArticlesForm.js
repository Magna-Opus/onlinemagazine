import React, { Component } from "react";
import { View, FlatList, SafeAreaView ,Alert} from "react-native";
import styles from "./MyArticlesFormStyle.js";
import List from "./MyArticlesList";
import NoDataFound from "../../Global/NoDataFound";
import {DeletePost} from '../../Service/DeletePost.js'
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

class Myarticle extends Component {
  onEditPress = (item, selectedCategory, categoryId) => {
    const { getArticles, navigation, data } = this.props;

    navigation.navigate("EditStory", {
      storyDetails: item.id,
      // selectedCategory: selectedCategory,
      // categoryId: categoryId,
      // onGoBack: getArticles
    });
  };

  deletepost=async(id)=>
  {
    const { getArticles, navigation, data } = this.props;
    var token=await AsyncStorage.getItem('token');
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
      
    DeletePost(`wp-json/wp/v2/posts/${id}`,token).then((delarticles)=>{
      console.log("delarticles",delarticles)
      getArticles()
      // this.setState({articlesList:myarticlescategory.category,isPendingAllArticles:false})

    })
  }

  else
  {
      alert("Check your Connection")
  }
  })
  }

  onDelPress = (item, selectedCategory, categoryId) => {
    const { getArticles, navigation, data } = this.props;

    console.log("delete item",item)
    Alert.alert(
      'Alert',
      'Do you really want to delete this post?',
      [
        
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.deletepost(item.id)},
      ],
      {cancelable: false},
    );
  }

  selectedArticle = (item) => {
    let { navigation } = this.props;
    navigation.navigate("MyArticleDetail", {
      articleDetails: item.id
    });
  };

  

  render() {
    const { data } = this.props;
    console.log("Data My Articless------------->", data);
    return (
      // <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
        <View style={styles.container}>
          {data && data.length!=0?(
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <List
                  item={item}
                  onEditPress={this.onEditPress.bind(this)}
                  onDelPress={this.onDelPress.bind(this)}
                  categoryName={data.cat_name}
                  categoryId={data.cat_id}
                  onSelectArticle={this.selectedArticle.bind(this)}
                  // onLongPressArticle={this.longpressitem.bind(this)}

                />
              )}
              keyExtractor={(_item, index) => index.toString()}
            />
          ) : (
            <NoDataFound />
          )}
        </View>
      // </SafeAreaView>
    );
  }
}

export default Myarticle;
