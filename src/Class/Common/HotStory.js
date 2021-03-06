import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  NativeEventEmitter,
  NativeModules,
  StatusBar,
  Alert,
  Dimensions,
  Platform
} from "react-native";
import styles from "../Articles/ArticleDetailStyle";
import { Surface, Button, } from "react-native-paper";
import * as RNLocalize from "react-native-localize";
import LanguageModal from "../../Modal/Language";
import Tts from "react-native-tts";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'

import Entypo from 'react-native-vector-icons/Entypo'
import {Translate} from '../../Service/Translate.js'
import { displaySuccessToast, displayErrorToast } from "../../Global/SnackMessage.js";
import {UpdateData} from '../../Service/UpdateData.js'
import {Get} from '../../Service/Get.js'
import Carousel from 'react-native-snap-carousel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';
const height = Dimensions.get('window').height;

import Colors from "../../Global/Color.js";
import Images from "../../Global/Images.js";
import Loader from "../../Global/Loader.js";
import moment from "moment";
import Indicator from "../../Global/Loader.js";
import AsyncStorage from '@react-native-community/async-storage';

import ImageModal from "../../Modal/ImageForm";

export default class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAudio: false,
      details: null,
      change_language:false,
      obj: {},
      selectedLang: "en-US",
      languages: [
        { language: "English", isSelected: true, target: "en", code: "en-US" },
        { language: "Hindi", isSelected: false, target: "hi", code: "hi-IN" },
        { language: "Bengali", isSelected: false, target: "bn", code: "bn-IN" },
        { language: "Urdu", isSelected: false, target: "ur", code: "ur-PK" },
        { language: "Arabic", isSelected: false, target: "ar", code: "ar-SA" },
        { language: "Chinese", isSelected: false, target: "zh-CN", code: "zh-CN" }
      ],
      visible: false,
      isImageModal: false,
      images: [],
    };
  }

  componentDidMount = async() => {
    let { params } = this.props.navigation.state;
    console.log("params artilce detail ---------- ", params);
    // let images = [];
    var token=await AsyncStorage.getItem('token');
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
      Get('wp-json/api/count-view/'+params.articleDetails,token).then((view)=>{
        console.log(view)
        this.setState({change_language:view.data.language_status})
      });
    Get('wp-json/wp/v2/posts/'+params.articleDetails,token).then((mysinglearticles)=>{
      console.log("mysinglearticlesssss",mysinglearticles)
    this.setState({details:mysinglearticles,isPendingAllArticles:false})

    })
    Get('wp-json/api/hotstory',token).then((getstory)=>{
      console.log("getstory",getstory.data)
      this.setState({story:getstory.data})
      
})
  }

  else
  {
      alert("Check your Connection")
  }
  })
  };

  handleSubmit=() =>
   {
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
    console.log(this.state.obj.target,this.state.details.content.rendered)
      this.setState({visible:false})
    let formData = new FormData();
    formData.append("target", this.state.obj.target)
    formData.append("q", this.state.details.content.rendered)
    formData.append("format", "text");
    console.log("formdata",formData)
    Translate(formData).then((translateresponse)=>{
        console.log("Translate Response",translateresponse.data.translations)
        let {details}=this.state
        details.content.rendered=translateresponse.data.translations[0].translatedText
        this.setState({details})
    })
  }

  else
  {
      alert("Check your Connection")
  }
  })
  };

  onSelectedLanguage = item => {
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
    let { languages, selectedLang } = this.state;
    let tempArr = languages;
    let obj = {};
    tempArr.map(subItem => {
      if (item.target === subItem.target) {
        subItem.isSelected = true;
        obj.target = subItem.target;
        selectedLang = subItem.code;
      } else {
        subItem.isSelected = false;
      }
    });
    console.log(languages,obj,selectedLang)
    this.setState({ languages: tempArr, obj: obj, selectedLang });
  }

  else
  {
      alert("Check your Connection")
  }
  })
  };

  onAudio = () => {
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
    var flag=0;
    const ee = new NativeEventEmitter(NativeModules.TextToSpeech);
    ee.addListener('tts-start', () => {});
    ee.addListener('tts-finish', () => {});
    ee.addListener('tts-cancel', () => {});
    const { isAudio, details, selectedLang } = this.state;
    console.log("pppppp",details.content.rendered)
    let text = details && details.content.rendered
    Tts.voices().then(voices => {
      for(var i=0;i<voices.length;i++)
      {
        if(voices[i].language==this.state.selectedLang)
        {
          if(voices[i].notInstalled)
          {
            flag=0;
            alert("Language not supported")
            Tts.requestInstallData();
            break;
          }
          else
          {
            if (!isAudio) {
              Tts.getInitStatus().then(
                response => {
                
                    Tts.setDefaultLanguage(selectedLang);
                    if(Platform.OS=='android')
                  {
                    if(text.length>3999)
                    {
                      let tempstring=text.match(/.{1,3999}/g);
                      for(var j=0;j<tempstring.length;j++)
                      Tts.speak(tempstring[j])
                    }
                    else
                    {
                    Tts.speak(text)
                    }
                  }
                  else
                  Tts.speak(text)
                },
                err => {
                  if (err.code === "no_engine") {
                    Tts.requestInstallEngine();
                  }
                }
              );
            } else {
              Tts.stop();
            }
            this.setState({ isAudio: !isAudio });
            flag=0;
            break;
          }
        }
        else
        {
          flag=1;
          
        }
      }
    }).then(()=>{
      if(flag==1)
      {
        alert("Language not supported")
        Tts.requestInstallData();
      }
    })

      
  }

  else
  {
      alert("Check your Connection")
  }
  })
    
  
  };

  closeModal = () => {
    this.setState({ visible: false });
  };

  markFavourite=async()=>
{
  
  var token=await AsyncStorage.getItem('token');
  NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
  let formData = new FormData();
      formData.append("postid", this.state.details.id)
      formData.append("action", 'efav_add')
  UpdateData('wp-json/api/favourites',formData,token).then((markfavourite)=>{
        console.log("markfavourite",markfavourite)
        if(markfavourite.status==200)
        {
          displaySuccessToast(markfavourite.message)
          this.props.navigation.navigate("Home")
        }
        else
        {
          displayErrorToast(markfavourite.message)
        }
  })
}

else
{
    alert("Check your Connection")
}
})
}

_renderItem2 ({item, index}) {
  return (
      <View>
        
          <Image source={{uri:item}} style={{ height: 250, resizeMode: 'stretch', width: '100%', marginTop: 5 }} />
      </View>
  );
}



  render() {
    const { navigation, translatedData, isPendingTranslation } = this.props;
    const {
      languages,
      visible,
      isAudio,
      details,
      isImageModal,
      images,
      story
    } = this.state;

    // console.log("detail screen ============ ", details)
    return (
      
        <SafeAreaView>
            {details && details.featured_media?
            <View style={styles.innerContainer}>
              <View
                activeOpacity={1}
                style={{height:'100%',width:'100%',position:'absolute',justifyContent:'center',alignItems:'center',zIndex:9999 }}
                
              >
                <TouchableOpacity onPress={() => this.setState({ isImageModal: true })}>
                <Image
                  style={{ width: 150, height: 160}}
                  resizeMode="contain"
                  source={
                    details && details.featured_media? {uri:details.featured_media}
                      : Images.defaultImage
                  }
                />
              </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{ width: "100%", height: 50, justifyContent: "center",zIndex:9999999 }} onPress={() => navigation.goBack()}
              >
                <Button
                  style={{ width: 30, height: 30 }}
                  color="white"
                  icon={Images.backIcon}
                />
              </TouchableOpacity>
              {details.attachments.length>0?
             <Carousel
                ref={(c) => { this._carousel = c; }}
                data={details.attachments}
                style={styles.coverImage}
                renderItem={this._renderItem2}
                sliderWidth={wp('100%')}
                itemWidth={wp('80%')}
                autoplay={true}
                loop={true}
                layout='default'
                autoplayInterval={3000}
            />:<ImageBackground
            style={styles.coverImage}
            resizeMode="cover"
            source={
              images.length > 0 ? { uri: images[0].url } : Images.defaultImage
            }
        
          >
            <View style={{height: height*0.3,
    backgroundColor: Colors.Opacity,
    alignItems: 'center',
    justifyContent:'flex-start'}}>
                </View>
                </ImageBackground>}</View>: 
          <ImageBackground
            style={styles.coverImage}
            resizeMode="cover"
            source={
              images.length > 0 ? { uri: images[0].url } : Images.defaultImage
            }
        //   source={
        //     details && details.guid ? { uri: details.guid } : Images.cover
        //   }
          >
            <View style={styles.innerContainer}>
              <View
                style={{ width: "100%", height: 50, justifyContent: "center" }}
              >
                <Button
                  style={{ width: 30, height: 30 }}
                  color="white"
                  onPress={() => navigation.goBack()}
                  icon={Images.backIcon}
                />
              </View>
              <TouchableOpacity
                activeOpacity={1}
                style={{ flex: 1 }}
                onPress={() => this.setState({ isImageModal: true })}
              >
                <Image
                  style={{ width: 150, height: 160 }}
                  resizeMode="contain"
                  source={
                    images.length > 0
                      ? { uri: images[0].url }
                      : Images.defaultImage
                  }
                />
                {/* <ScrollView horizontal pagingEnabled={true}>
              {images.length> 0 ? images.map(item => (
                <Image
              style={{ width: 150, height: 160 }}
              resizeMode="cover"
              source={{uri: item.url}}
            />
              )) :  <Image
              style={{ width: 150, height: 160 }}
              resizeMode="cover"
              source={ Images.defaultImage}
            />}
            </ScrollView> */}
              </TouchableOpacity>
            </View>
          </ImageBackground>}

          <View style={styles.bottomContainer}>
            <Surface style={styles.detailsContainer}>
              <ScrollView
                style={styles.scrollViewStyle}
                contentContainerStyle={{ alignItems: "center" }}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.titleStyle}>
                  {details && details.title.rendered
                    ? details.title.rendered
                    : "No Title"}
                </Text>

                <View style={[styles.postView,{alignItems:'center'}]}>
                                    <View style={{ flexDirection: 'row' ,alignItems:'center'}}>
                                        <MaterialIcons name="remove-red-eye" size={20} color={'#C0C0C0'}/>
                                        <Text style={{marginHorizontal:4}}>{story && story.views
                                        ? story.views
                                        : "---"}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row',alignItems:'center' ,marginLeft:5}}>
                                        {details && details.favorite_marked?<MaterialIcons name="thumb-up" size={20} color={'#8d0000'} />:<TouchableOpacity onPress={()=>{this.markFavourite()}}><MaterialIcons name="thumb-up" size={20} color={'#C0C0C0'} /></TouchableOpacity>}
                                        <Text style={{marginHorizontal:10}}>{story && story.favorites
                                        ? story.favorites
                                        : "---"}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row',alignItems:'center' ,}}>
                                    <Entypo name="user" size={20} color={'#C0C0C0'}/>

                  <Text style={styles.postText}>
                    {details && details.authorname
                      ? details.authorname
                      : " --- "}
                  </Text>
                  </View>
                </View>
                {details && details.meta._downloadlink!=""? <Text style={{width:'100%',color:'#a9a9a9',textAlign:'left',paddingHorizontal:15,marginTop:7}}>Download link:{details.meta._downloadlink}</Text>:null}

                {isPendingTranslation ? (
                  <Indicator />
                ) : (
                    <Text style={[styles.headerTextStyle,{marginBottom:100}]}>
                      {details && details.content.rendered
                        ? details.content.rendered
                        : " --- "}
                        {this.state.changetext}
                    </Text>
                  )}
              </ScrollView>

              <View
                style={{
                    position:'absolute',
                    bottom:50,
                  width: "100%",
                  height: 50,
                  flexDirection: "row",
                  justifyContent: "flex-end"
                }}
              >
                {this.state.change_language?<TouchableOpacity
                  onPress={() => this.setState({ visible: true })}
                  style={styles.translateButtonStyle}
                >
                  <Image
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                    source={Images.translateIcon}
                  />
                </TouchableOpacity>:null}

                <TouchableOpacity
                  style={styles.audioButtonStyle}
                  onPress={() => this.onAudio()}
                >
                  {!isAudio?<Octicons
                  name={'unmute'}
                  size={30}
                  color={'#fff'}
                />:<Octicons
                name={'mute'}
                size={30}
                color={'#fff'}
              />}
                </TouchableOpacity>
              </View>
            </Surface>
          </View>

          <LanguageModal
            visible={visible}
            closeModal={this.closeModal}
            close={() => this.closeModal}
            handleSubmit={this.handleSubmit}
            loading={false}
            languages={languages}
            onSelectLanguage={this.onSelectedLanguage}
          />
          {isImageModal && (
            <ImageModal
              close={() => this.setState({ isImageModal: false })}
              visible={true}
              image={null}
              images={details&&details.attachments?details.attachments:null}
              image={details&&details.featured_media?details.featured_media:null}

            />
          )}
        </SafeAreaView>
    );
  }
}


