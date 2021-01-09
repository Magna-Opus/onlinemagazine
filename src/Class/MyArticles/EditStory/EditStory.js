import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Alert
} from "react-native";
import styles from "./EditStoryStyle.js";
import Entypo from "react-native-vector-icons/Entypo";
import {MyHeader} from "../../../Global/Header.js";
import rootStyles from "../../../Global/Style.js";
import { Button } from "react-native-paper";
import Fonts from "../../../Global/Fonts.js"
import Colors from "../../../Global/Color.js"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePicker from "react-native-image-crop-picker";
import {Get} from '../../../Service/Get.js'
import {RegisterData} from '../../../Service/RegisterData.js'
import AsyncStorage from '@react-native-community/async-storage';
import Loader from "../../../Global/Loader.js";
import { displaySuccessToast,displayErrorToast } from "../../../Global/SnackMessage.js";
import CategoriesModal from "../../../Modal/CategoriesModal";
import singleImagePicker from "react-native-image-picker";
import {UpdateData} from '../../../Service/UpdateData.js'
import NetInfo from '@react-native-community/netinfo';
import TermsModal from "../../../Modal/TermsModal";
export default class EditStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedCategory: "",
      title: "",
      content: "",
      categoryId: null,
      attachment: [],
      updatedTitle: "",
      status: "draft",
      test: "0",
      author: '',
      downloadlink:'',
      articleId: null,
      isLoading: true,
      updatedTitle: "",
      updatedCategory: null,
      updatedContent: "",
      updatedAttachment: [],
      selectedSlug: [],
      image_url: "",
      selectedCategorys:[],
      featured_image:{uri:''},
      isPendingAllArticles:false,
      showTermsModal: false,
      changedprofile:false,
    };
  }

  componentDidMount = async() => {
    var id=await AsyncStorage.getItem('id')
    this.setState({author:id})
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
    this.getCategories()
    this.getUser()
  }

  else
  {
      alert("Check your Connection")
  }
  })
  };

  closeTermsModal = () => {
    this.setState({ showTermsModal: false });
  };

  getUser=async()=>{
    var token=await AsyncStorage.getItem('token');
    Get('wp-json/wp/v2/users/me',token).then((getprofile)=>{
        console.log("getprofile",getprofile)
        this.setState({user:getprofile.profile})
  })
  }
  
  getdata=async()=>{
    let { params } = this.props.navigation.state;
    let image_url = [];
    console.log("Navigation Story Update dataaaa", params);

    var token=await AsyncStorage.getItem('token');
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
    var attachment=[];
    
    Get('wp-json/wp/v2/posts/'+params.storyDetails,token).then((mysinglearticles)=>{
        console.log("editmysinglearticles",mysinglearticles)
      this.setState({singlearticle:mysinglearticles,isPendingAllArticles:false})
      mysinglearticles.attachments.length > 0
      ? mysinglearticles.attachments.map(item => {
      let obj = {
        url: item,
        previous:true
      }
      attachment.push(obj);
    }):null;
    this.state.categories.map(subItem => {
      for(var i=0;i<mysinglearticles.categories.length;i++)
      if (mysinglearticles.categories[i] === subItem.id) {
        subItem.isSelected = true;
      }
      
    })
      this.setState({
        title: (mysinglearticles.title.rendered).trim(),
        content: (mysinglearticles.content.rendered).trim(),
        downloadlink:(mysinglearticles.meta._downloadlink).trim(),
        categoryId: mysinglearticles.categories,
        // selectedCategory:mysinglearticles.categories,
        selectedCategory:mysinglearticles.categories,
        selectedCategorys:mysinglearticles.categoryname.length>0 ? mysinglearticles.categoryname : "Select Category",
        featured_image:{uri: mysinglearticles.featured_media},
        attachment:attachment,
        image_url:attachment,
      },()=>{this.setState({isLoading: false})})
      
    })
  }

  else
  {
      alert("Check your Connection")
  }
  })
  }

  uploadPic = () => {
    let { attachment } = this.state;
    ImagePicker.openPicker({
      multiple: true,
      maxFiles:3,
      compressImageQuality:0.8,
    }).then(images => {
      // attachment.push(...images);
      images.length > 0
      ? images.map(item => {
      let obj = {
        url: item.path,
        uri:item.path,
        type: item.mime,
        name: `image-${Math.random()}.jpg`,
      }
      attachment.push(obj);
    }):null;
    this.setState({ attachment: attachment },(()=>{
      console.log("attachment array",attachment)
    }));
  });
  
    
  };

  uploadsinglePic = () => {
    singleImagePicker.showImagePicker(response => {
      // console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          featured_image: {
            uri: response.uri,
            type: response.type,
            name: response.fileName
            
          },
          changedprofile:true
        });
      }
    });
  };

  deleteImage = item => {
    let { attachment, image_url, updatedAttachment } = this.state;
    let tempArr = attachment;
    let temp = updatedAttachment;
    let urls = image_url;

    tempArr.map((subItem, index) => {
      if (item.path) {
        item.path === subItem.path && tempArr.splice(index, 1);
      } else {
        item.url === subItem.url && tempArr.splice(index, 1);
      }
    });

    temp.map((subItem, index) => {
      item.path === subItem.path && temp.splice(index, 1);
    });

    urls.map((url, urlIndex) => {
      item.url && item.url === url ? urls.splice(urlIndex, 1) : null;
    });

    this.setState({
      attachment: tempArr,
      updatedAttachment: temp,
      image_url: urls
    });
  };

  closeModal = () => {
    this.setState({ visible: false });
  };

  // selectCategory = item => {
  //   let { selectedCategory, categoryId, selectedSlug } = this.state;
  //   let { categories } = this.state;
  //   categories.map(subItem => {
  //     if (item.id === subItem.id) {
  //       subItem.isSelected = true;
  //       selectedCategory = subItem.cat_name;
  //       categoryId = subItem.id;
  //       selectedSlug = subItem.slug;
  //     } else {
  //       subItem.isSelected = false;
  //     }
  //   });
  //   this.setState({
  //     selectedCategory: selectedCategory,
  //     categoryId: categoryId,
  //     updatedCategory: categoryId,
  //     selectedSlug
  //   });
  // };

  selectCategory = item => {
    
    let { categoryId, selectedSlug,selectedCategorys } = this.state;
    let { categories } = this.state;
    categories.map(subItem => {
      if (item.id === subItem.id) {
        if(subItem.isSelected)
        {
          subItem.isSelected = false;
          // selectedCategory.splice(0,subItem.name);
          // selectedSlug.splice(0,subItem.slug);
          // categoryId.splice(0,subItem.id);
          // categoryId.removeA(subItem.id);
          // selectedCategory.removeA(subItem.name);
          // selectedSlug.removeA(subItem.slug);
          var index = categoryId.indexOf(subItem.id)
          if (index !== -1) {
            categoryId.splice(index, 1);
          }

          var index = selectedCategorys.indexOf(subItem.name)
          if (index !== -1) {
            selectedCategorys.splice(index, 1);
          }

          var index = selectedSlug.indexOf(subItem.slug)
          if (index !== -1) {
            selectedSlug.splice(index, 1);
          }
        }
        else
        {
        subItem.isSelected = true;
        selectedCategorys.push(subItem.name);
        // selectCategorys.push(subItem.name);
        selectedSlug.push(subItem.slug);
        categoryId.push(subItem.id);
        }
      } 
      
      
    });
    this.setState({
      selectedCategorys: selectedCategorys,
      // selectCategorys:selectCategorys,
      categoryId: categoryId,
      selectedSlug: selectedSlug
    });
  };

  getCategories= async() =>{
    var token=await AsyncStorage.getItem('token')
    Get('wp-json/wp/v2/categories',token).then((getcategory)=>{
      console.log("getcategory",getcategory)
    this.setState({categories:getcategory},()=>{
     this.getdata()
    })

    })

  }

  onUploadArticle = async() => {
    let { params } = this.props.navigation.state;
    const { title, content, categoryId, attachment,selectedSlug,downloadlink,featured_image } = this.state;

    console.log("category array",categoryId)
    var token=await AsyncStorage.getItem('token')
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    
    if(state.isConnected){
    const { uploadArticle, navigation } = this.props;
    if (title.length < 1) {
      // alert("Please fill title field");
      displayErrorToast("Please fill title field")
      
    } else if (content.length < 1) {
      // alert("Please fill content field");
      displayErrorToast("Please fill content field")
    } else if (categoryId == null) {
      // alert("Please Select Category");
      displayErrorToast("Please Select Category")
    } 
    else if(downloadlink=='')
  {
      this.setState({isPendingAllArticles:true})
      let formData = new FormData();
      formData.append("post_title", title)
      formData.append("post_content", content)
      categoryId.length > 0
      ?
      categoryId.map((item)=>{
        formData.append("category[]", item)
      })
        
      
    : null;
      
      // formData.append("status", "draft");
      // formData.append("author", id)
      formData.append("_downloadlink", downloadlink)
      {this.state.changedprofile?formData.append("featured_image", { uri: featured_image.uri,name: Math.round(Math.random() * 100000000) +'profile_photo.jpg', type: 'image/jpg' }):null}
      {this.state.changedprofile?formData.append("uploadfeature",'1'):formData.append("uploadfeature",'0')}
      attachment.length > 0
      ?
      attachment.map((item,index)=>{
        if(item.previous)
        {
        formData.append('previousimages[]', item.url)
        }
        else
        {
          console.log(item)
        formData.append('attachments-'+index, item)
        }
      })
        
      
    : null;
    UpdateData('wp-json/api/updatepost/'+params.storyDetails,formData,token).then((writestory)=>{
      console.log("Story Response",writestory)
      this.setState({isPendingAllArticles:false})
      if(writestory.status==200)
      {
        displaySuccessToast(writestory.message);
          this.setState({
            title: "",
            content: "",
            attachment: [],
            selectCategory: ""
          });
          navigation.navigate("MyArticles",{refresh:'yes'});
      }
      else
      {
        displayErrorToast(writestory.error)
        
      }
  })
    } 
    else if(downloadlink!='')
    {
      var res = downloadlink.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
      if(res == null)
      displayErrorToast("Please fill valid url")
     else {
      // console.log("this.state....", this.state);
      this.setState({isPendingAllArticles:true})
      let formData = new FormData();
      formData.append("post_title", title)
      formData.append("post_content", content)
      categoryId.length > 0
      ?
      categoryId.map((item)=>{
        formData.append("category[]", item)
      })
        
      
    : null;
      // formData.append("status", "draft");
      // formData.append("author", id)
      formData.append("_downloadlink", downloadlink)
      {this.state.changedprofile?formData.append("featured_image", { uri: featured_image.uri,name: Math.round(Math.random() * 100000000) +'profile_photo.jpg', type: 'image/jpg' }):null}
      {this.state.changedprofile?formData.append("uploadfeature",'1'):formData.append("uploadfeature",'0')}
      attachment.length > 0
      ?
      attachment.map((item,index)=>{
        if(item.previous)
        {
          formData.append('previousimages[]', item.url)
        }
        else
        {console.log(item)
        formData.append('attachments-'+index, item)
        }
      })
        
    : null;

    UpdateData('wp-json/api/updatepost/'+params.storyDetails,formData,token).then((writestory)=>{
      console.log("Story Response",writestory)
      this.setState({isPendingAllArticles:false})
      if(writestory.status==200)
      {
        displaySuccessToast(writestory.message);
          this.setState({
            title: "",
            content: "",
            attachment: [],
            selectCategory: ""
          });
          navigation.navigate("MyArticles",{refresh:'yes'});
      }
      else
      {
        displayErrorToast(writestory.error)
        
      }
  })
    }
  }
}

else
{
    alert("Check your Connection")
}
})
  };

  render() {
    let { navigation, isUploadingArticle } = this.props;
    let {
      visible,
      selectedCategory,
      title,
      content,
      attachment,
      isLoading,
      downloadlink,
      featured_image,
      selectedCategorys,
      isPendingAllArticles,
      showTermsModal
    } = this.state;

    return (
      // <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
      <View style={{flex:1}}>
      <MyHeader navigation={navigation} name="Edit Story" skip={true} />
      {isLoading ? (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Loader loaderclose={this.state.isPendingAllArticles} />
            </View>
          ) : (
        <KeyboardAwareScrollView style={rootStyles.flex1}>
          
            <View style={styles.container}>
            <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            resizeMode="cover"
            source={featured_image.uri ? { uri: featured_image.uri } : null}
          />

          <TouchableOpacity
            onPress={() => this.uploadsinglePic()}
            style={styles.uploadButton}
          >
            <Text style={styles.uploadText}>
              Upload Featured Pic
            </Text>
          </TouchableOpacity>
        </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.setState({ visible: true })}
                style={[styles.containerStyle, { height: 60, paddingLeft: 15 }]}
              >
                <Text style={styles.titleStyle}>
                  {selectedCategorys 
                    ? selectedCategorys+','
                    : "Select Category"}
                </Text>
                <Button
                  icon={({ size, color }) => (
                    <Entypo
                      name="select-arrows"
                      size={20}
                      color={Colors.LightGray}
                    />
                  )}
                />
              </TouchableOpacity>

              <View style={styles.containerStyle}>
                <TextInput
                  style={[styles.titleStyle,{width:'100%'}]}
                  underlineColorAndroid="transparent"
                  placeholder="Story Title"
                  multiline={true}
                  onChangeText={text =>
                    this.setState({ title: text, updatedTitle: text })
                  }
                  value={title}
                />
              </View>

              <View
                style={{
                  width: "90%",
                  margin: 2,
                  height: 300,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: Colors.BottomBorder
                }}
              >
                <TextInput
                  style={styles.titleStyle}
                  underlineColorAndroid="transparent"
                  placeholder="Write here ..."
                  multiline={true}
                  onChangeText={text =>
                    this.setState({ content: text, updatedContent: text })
                  }
                  value={content}
                />
              </View>

              <View style={styles.uploadImagContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {attachment.length > 0 ? (
                    attachment.map((item, index) => {
                      return (
                        <View
                          style={{ width: 100, height: 60, margin: 5 }}
                          key={index}
                        >
                          <Image
                            style={{ width: "100%", height: "100%" }}
                            resizeMode="cover"
                            source={
                              item.url ? { uri: item.url } : { uri: item.path }
                            }
                          />
                          <Entypo
                            name="circle-with-cross"
                            size={19}
                            style={{ position: "absolute", right: -5, top: -5 }}
                            color={Colors.Yellow}
                            onPress={() => this.deleteImage(item)}
                          />
                        </View>
                      );
                    })
                  ) : (
                    <Image
                      style={{ width: 100, height: 60, margin: 10 }}
                      resizeMode="cover"
                      source={require("../../../Image/img_default.jpg")}
                    />
                  )}
                </ScrollView>

                <Button
                  dark
                  loading={false}
                  color={Colors.Transparent}
                  mode="text"
                  onPress={() => this.uploadPic()}
                >
                  <Text
                    style={{
                      color: Colors.Yellow,
                      fontSize: 16,
                      fontFamily: Fonts.regular
                    }}
                  >
                    Upload Image
                  </Text>
                </Button>
              </View>
              <View style={styles.containerStyle}>
              <TextInput
                style={[styles.titleStyle,{width:'100%',paddingVertical:10}]}
                underlineColorAndroid="transparent"
                placeholder="Download Link"
                multiline={true}
                onChangeText={text => this.setState({ downloadlink: text })}
                value={downloadlink}
              />
            </View>
              <View style={styles.termsContainerStyle}>
                <Text style={styles.termsText}>
                  By click on submit you will be agree with our
                </Text>
                <Text style={styles.termsStyle} onPress={() => this.setState({ showTermsModal: true })}>terms and conditions</Text>
              </View>

              <View style={styles.buttonView}>
                <Button
                  dark
                  loading={isPendingAllArticles}
                  color={Colors.Red}
                  mode="contained"
                  onPress={()=>this.onUploadArticle()}
                >
                  <Text
                    style={{
                      color: Colors.White,
                      fontSize: 18,
                      fontFamily: Fonts.regular
                    }}
                  >
                    Submit
                  </Text>
                </Button>
              </View>

              {visible && (
                <CategoriesModal
                  categories={this.state.categories}
                  handleSubmit={this.closeModal}
                  changeCategory={this.selectCategory}
                  visible={visible}
                  close={this.closeModal}
                />
              )}
              {showTermsModal && (
              <TermsModal
                visible={showTermsModal}
                close={this.closeTermsModal}
                user={this.state.user}
              />
            )}
            </View>
          
        </KeyboardAwareScrollView>)}
        </View>
      // </SafeAreaView>
    );
  }
}

