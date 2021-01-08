import React,{Component} from "react";
import { View, Image, Text } from "react-native";
import styles from "./ArticleListStyle";
import { Title, Button, Surface, Card } from "react-native-paper";
import Images from "../../Global/Images.js";
import Loader from "../../Global/Loader.js";
import {Post} from '../../Service/Post.js'
import AsyncStorage from '@react-native-community/async-storage';





// export default class articleList extends Component {

//     constructor() {
//         super();
//         this.state = {
//             loading:true,

//         }
//     }

//     componentDidMount()
//     {
//         console.log(this.props.item)
//         this.setState({item:this.props.item})
//         const arr = this.props.item.images != "" ? JSON.parse(this.props.item.images) : null;
//         this.setState({arr:arr})
//         const showImage =
//     arr && (arr !== [] || "") ? (arr.images ? arr.images[0].url : null) : null;
//     this.setState({showImage:showImage,loading:false})
//     }

const ArticleList = ({ item, onSelectArticle,token}) => {
  console.log("All Articles in Item777---------->", item);
  
  // const arr = item.images ? JSON.parse(item.images) : null;
  // console.log("ppp",arr)
  // // let showImage = arr && arr.length>0 ? arr.images[0].url : null
  // const showImage =
  //   arr && (arr !== [] || "") ? (arr.images ? arr.images[0].url : null) : null;
  //   console.log(showImage)
  const feature_image =
    item && item.faetured_image ?  item.faetured_image: null;
  return (
    <Card onPress={() => {console.log("hello"),onSelectArticle(item)}}>
     {/* {this.state.loading?<Loader/>:null}   */}
      <Surface style={styles.listContainer}>
          
          <Image
            resizeMode="contain"
            style={styles.imageStyle}
            source={feature_image ? { uri: feature_image } : Images.defaultImage}
          />
          <View style={[styles.innerContainer,{marginLeft:7}]}>
            <View style={styles.textContainer}>
              <Title>{item.post_title}</Title>
              <View style={styles.postView}>
                <View style={[styles.postView, { alignItems: "center" }]}>
                  <Image
                    style={{ width: 12, height: 12 }}
                    resizeMode="contain"
                    source={require("../../Image/Allarticle/calendar_small.png")}
                  />
                  <Text style={styles.postText}>{item.post_modified}</Text>
                </View>
                <View
                  style={[
                    styles.postView,
                    { alignItems: "center", marginLeft: 5, marginVertical: 10 }
                  ]}
                >
                  <Image
                    style={{ width: 12, height: 12 }}
                    resizeMode="contain"
                    source={require("../../Image/Allarticle/posted_by.png")}
                  />
  
                  <Text style={styles.postText}>
                    posted by: {item.authorname}
                  </Text>
                </View>
              </View>
            </View>
  
            <View style={styles.mikeView}>
              <Image
                style={{ width: 22, height: 22, marginHorizontal: 5 }}
                resizeMode="contain"
                source={require("../../Image/Allarticle/audio_Translator.png")}
              />
  
              <Image
                style={{ width: 22, height: 22 }}
                resizeMode="contain"
                source={require("../../Image/Allarticle/audio_ico.png")}
              />
            </View>
          </View>
        </Surface>
    </Card>
    
  );

};

export default ArticleList;
