import React,{Component} from "react";
import { View, Image, Text, TouchableOpacity,FlatList,Dimensions ,ScrollView} from "react-native";
import styles from "../MyArticles/MyArticlesListStyle.js";
import { Card } from "react-native-paper";
import {MyHeader} from '../../Global/Header.js'
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import Colors from "../../Global/Color.js";
import Images from "../../Global/Images.js";
import NoDataFound from "../../Global/NoDataFound";
const { width, height } = Dimensions.get('window');


// const articleList = ({ item, onEditPress, categoryName, categoryId,onSelectArticle,onMark }) => {
//   console.log("lllllitem",this.props.navigation.state.params.item)
//   const arr = item.images ? JSON.parse(item.images) : null;
//   const showImage =
//     arr && (arr !== [] || "") ? (arr.images ? arr.images[0].url : null) : null;
export default class SearchResult extends Component {

    componentDidMount()
    {
        console.log("found item:",this.props.navigation.state.params.item)
    }

    selectedArticle = (item) => {
        let { navigation } = this.props;
        navigation.navigate("MyArticleDetail", {
          articleDetails: item.id
        });
      };

    render(){
        const item=this.props.navigation.state.params.item;
        
        const { navigation} = this.props;
  return (
      <View style={[styles.container,{marginBottom:40}]}>
    <MyHeader
                    name="SEARCH RESULT"
                    skip={true}
                    navigation={navigation}
                    />
                    <ScrollView>
        <FlatList
    data={item}
    renderItem={({ item }) => (
    <Card onPress={()=>this.selectedArticle(item)}>
      <View style={[styles.listContainer,{justifyContent:'center',alignItems:'center'}]}>
        <Image
          resizeMode="contain"
          style={[styles.imageStyle,{ width: width*0.2}]}
          source={item.featured_media? { uri: item.featured_media } : Images.defaultImage}
        />
        <View style={[styles.innerContainer,{flexDirection:'column',paddingHorizontal:8, width: width*0.7,}]}>
          <View style={styles.textContainer}>
            <Text style={{ fontSize: 18, fontWeight: "400", color: "black" ,marginTop:3}}>
              {item.title.rendered}
            </Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: "400", color: "gray",marginTop:2 }}>Author: {item.authorname}</Text>
        </View>
        {/* <TouchableOpacity style={{height:50, width: width*0.1,justifyContent:'center'}} onPress={()=>onMark(item)}>
          <MaterialIcons name="thumb-down" size={30} color={'#C0C0C0'} />
        </TouchableOpacity> */}
      </View>
      
    </Card>
    )}
    keyExtractor={(_item, index) => index.toString()}
  />
<View style={{height:100}}/>
</ScrollView>
</View>
  );
};
 }
// export default articleList;

