import React from "react";
import { View, Image, Text, TouchableOpacity,FlatList,Dimensions } from "react-native";
import styles from "../MyArticles/MyArticlesListStyle.js";
import { Card } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import Colors from "../../Global/Color.js";
import Images from "../../Global/Images.js";
import NoDataFound from "../../Global/NoDataFound";
const { width, height } = Dimensions.get('window');


const articleList = ({ item, onEditPress, categoryName, categoryId,onSelectArticle,onMark }) => {
  // console.log("lllllitem",item)
  // const arr = item.images ? JSON.parse(item.images) : null;
  // const showImage =
  //   arr && (arr !== [] || "") ? (arr.images ? arr.images[0].url : null) : null;
  return (
      <View style={styles.container}>
    {item?(
        <FlatList
    data={item}
    renderItem={({ item }) => (
    <Card onPress={()=>onSelectArticle(item)}>
      <View style={[styles.listContainer,{justifyContent:'center',alignItems:'center'}]}>
        <Image
          resizeMode="contain"
          style={[styles.imageStyle,{ width: width*0.2}]}
          source={item.featured_media ? { uri: item.featured_media } : Images.defaultImage}
        />
        <View style={[styles.innerContainer,{flexDirection:'column',paddingHorizontal:8, width: width*0.7,}]}>
          <View style={styles.textContainer}>
            <Text style={{ fontSize: 18, fontWeight: "400", color: "black" ,marginTop:3}}>
              {item.title}
            </Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: "400", color: "gray",marginTop:2 }}>Author: {item.author}</Text>
        </View>
        <TouchableOpacity style={{height:50, width: width*0.1,justifyContent:'center'}} onPress={()=>onMark(item)}>
          <MaterialIcons name="thumb-down" size={30} color={'#C0C0C0'} />
        </TouchableOpacity>
      </View>
      
    </Card>
    )}
    keyExtractor={(_item, index) => index.toString()}
  />
) : (
  <NoDataFound />
)}
</View>
  );
};

export default articleList;
