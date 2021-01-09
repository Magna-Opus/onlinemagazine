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
  Platform
} from "react-native";
import styles from "./ArticleDetailStyle";
import { Surface, Button, } from "react-native-paper";
import * as RNLocalize from "react-native-localize";
import LanguageModal from "../../Modal/Language";
import Tts from "react-native-tts";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { displaySuccessToast, displayErrorToast } from "../../Global/SnackMessage.js";
import {Translate} from '../../Service/Translate.js'
import Carousel from 'react-native-snap-carousel';
import Colors from "../../Global/Color.js";
import Images from "../../Global/Images.js";
import Loader from "../../Global/Loader.js";
import moment from "moment";
import {Get} from '../../Service/Get.js'
import {UpdateData} from '../../Service/UpdateData.js'
import Indicator from "../../Global/Loader.js";
import AsyncStorage from '@react-native-community/async-storage';
import ImageModal from "../../Modal/ImageForm";
import PopUp from "../../Modal/PopUp";

import NetInfo from '@react-native-community/netinfo';

export default class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAudio: false,
      details: null,
      obj: {},
      popupadds:[],
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
      isPopModal: false,
      images: []
    };
  }

  componentDidMount = () => {
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
    this.getBanners();
    this.getdata();
    }

else
{
    alert("Check your Connection")
}
})
  };

  getdata()
  {
    let { params } = this.props.navigation.state;
    console.log("params artilce detailvaa ---------- ", params);
    // let images = [];
    if (params && params.articleDetails) {
      const arr =
        params.articleDetails.images 
          ? JSON.parse(params.articleDetails.images)
          : null;
      let images =
        arr && (arr !== [] || "") ? (arr.images ? arr.images : []) : [];
      console.log("images ============ ", images);
      this.setState({
        details: params.articleDetails,
        images: images
      });
    }
  }
  getBanners=async()=>{
    var token=await AsyncStorage.getItem('token');
    Get('wp-json/api/popupadds',token).then((popupadds)=>{
        console.log("popupadds",popupadds)
        this.setState({popupadds:popupadds.data.data,loading:false,visiblecarousel:true,isPopModal:true})
  })
  }

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
    const ee = new NativeEventEmitter(NativeModules.TextToSpeech);
    ee.addListener('tts-start', () => {});
    ee.addListener('tts-finish', () => {});
    ee.addListener('tts-cancel', () => {});
    const { isAudio, details, selectedLang } = this.state;
    var flag=0;
    let text = details && details.content.rendered;
    Tts.voices().then(voices => {
      for(var i=0;i<voices.length;i++)
      {
        console.log("before if",voices[i].language,this.state.selectedLang)
        if(voices[i].language==this.state.selectedLang)
        {
          if(voices[i].notInstalled)
          {
            flag=0
            console.log("inside if",voices[i].language,this.state.selectedLang)
            alert("Language not supported")
            Tts.requestInstallData();
            break;
          }
          else
          {
            flag=0
            if (!isAudio) {
              Tts.getInitStatus().then(
                response => {
                    Tts.setDefaultLanguage(selectedLang);
                    Tts.speak(text);
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
            break;
          }
        }
        else
        {
          flag=1
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

  _renderItem2({item, index})
{
    return (
        <View>
          
            <Image source={{uri:item}} style={{ height: 250, resizeMode: 'stretch', width: '100%', marginTop: 5 }} />
        </View>
    );
  }

  

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
          this.props.navigation.navigate("Articles")
        }
        else
        {
          displayErrorToast(markfavourite.message)
        }
  })}

  else
  {
      alert("Check your Connection")
  }
  })
  
}



  render() {
    const { navigation, translatedData, isPendingTranslation } = this.props;
    const {
      languages,
      visible,
      isAudio,
      details,
      isImageModal,
      isPopModal,
      images
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
                style={{ width: "100%", height: 50, justifyContent: "center",zIndex:9999999 }} onPress={() => {navigation.goBack()}}
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
                </ImageBackground>}</View>: <ImageBackground
            style={styles.coverImage}
            resizeMode="cover"
            source={
              details && details.attachments.length > 0
              ? null  : Images.defaultImage
            }>
            <View style={styles.innerContainer}>
              <View
                style={{ width: "100%", height: 50, justifyContent: "center" }}
              >
                <Button
                  style={{ width: 30, height: 30 }}
                  color="white"
                  onPress={() => {navigation.goBack()}}
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
                    details && details.featured_media? {uri:details.featured_media}
                      : Images.defaultImage
                  }
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          }
          <View style={styles.bottomContainer}>
          
            <Surface style={styles.detailsContainer}>
            
              <ScrollView
                style={styles.scrollViewStyle}
                contentContainerStyle={{ alignItems: "center" }}
                showsVerticalScrollIndicator={false}
              >
                
                <Text style={styles.titleStyle}>
                  {details && details.title
                    ? details.title.rendered
                    : "No Title"}
                </Text>
               
                <View style={[styles.postView,{flexWrap:'wrap'}]}>
                  <Image
                    style={{ width: 12, height: 12 }}
                    resizeMode="contain"
                    source={require("../../Image/Allarticle/calendar_small.png")}
                  />

                  <Text style={styles.postText}>
                    {details && details.date
                      ? moment(details.date).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )
                      : " --- "}
                  </Text>
                  <Image
                    style={{ width: 12, height: 12 }}
                    resizeMode="contain"
                    source={require("../../Image/Allarticle/posted_by.png")}
                  />

                  <Text style={styles.postText}>
                    {details && details.authorname
                      ? details.authorname
                      : " --- "}
                  </Text>
                 
                </View>
                <View style={{alignItems:'center',flexDirection:'row',marginTop:5,alignSelf:'flex-start',marginLeft:15}}>
                  {details && details.favorite_marked?<MaterialIcons name="thumb-up" size={25} color={'#8d0000'}/>:<TouchableOpacity onPress={()=>{this.markFavourite()}}><MaterialIcons name="thumb-up" size={25} color={'#a9a9a9'}/></TouchableOpacity>}
                  <Text style={styles.postText}>
                    {details && details.meta.efav_posts
                      ? details.meta.efav_posts
                      : " --- "}
                  </Text>
                  </View>
                  {details && details.meta._downloadlink!=""? <Text style={{width:'100%',color:'#a9a9a9',textAlign:'left',paddingHorizontal:15,marginTop:7}}>Download link:{details.meta._downloadlink}</Text>:null}
                

                
                {isPendingTranslation ? (
                  <Indicator />
                ) : (
                    <Text style={[styles.headerTextStyle,{marginBottom:100}]}>
                      {details && details.content
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
                <TouchableOpacity
                  onPress={() => this.setState({ visible: true })}
                  style={styles.translateButtonStyle}
                >
                  <Image
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                    source={Images.translateIcon}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.audioButtonStyle}
                  onPress={() => this.onAudio()}
                >
                  <Image
                    style={{ width: 25, height: 25 }}
                    resizeMode="contain"
                    source={Images.audioIcon}
                  />
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
              images={details&&details.attachments?details.attachments:null}
              image={details&&details.featured_media?details.featured_media:null}
            />
          )}

{isPopModal && (
            <PopUp
              close={() => this.setState({ isPopModal: false })}
              visible={true}
              images={this.state.popupadds?this.state.popupadds:null}
              
            />
          )}
        </SafeAreaView>
    );
  }
}


