import React, { Component } from 'react';
import { Text, View, Image, StyleSheet,TextInput, ScrollView, TouchableOpacity, ImageBackground ,FlatList,Alert,KeyboardAvoidingView} from 'react-native';
// import styles from './HomeStyle.js'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import Entypo from 'react-native-vector-icons/Entypo'
const bgc = require("../../Image/main_bg.jpg");
const bg3 = require("../../Image/bg3.png");
const slider = require("../../Image/slider.png");
import {MyHeader} from '../../Global/Header.js'
import Loader from '../../Global/Loader.js'
import Fonts from '../../Global/Fonts.js'
import Colors from '../../Global/Color.js'
import { displaySuccessToast, displayErrorToast } from "../../Global/SnackMessage.js";
import styles from "../MyArticles/WriteStory/WriteStoryStyle.js";
import {Get} from '../../Service/Get.js'
import { Button } from "react-native-paper";
import AsyncStorage from '@react-native-community/async-storage';
import AuthorModal from "../../Modal/AuthorModal";
import CategoriesModal from "../../Modal/CategoriesModal";
import NetInfo from '@react-native-community/netinfo';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Carousel from 'react-native-snap-carousel';
// import { TextInput } from 'react-native-paper';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          style1:{width:'40%',backgroundColor:'#aee8c0',marginBottom:0,shadowColor: '#696969',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 2,elevation: 4,paddingHorizontal: 10,paddingVertical: 10},
          style2:{width:'40%',backgroundColor:'#fff8dd',marginBottom:15,shadowColor: '#696969',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 2,elevation: 4,paddingHorizontal: 10,paddingVertical: 10},
          touch1:{width:'40%',backgroundColor:'#fff8dd',marginBottom:15,shadowColor: '#696969',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 2,elevation: 4,paddingHorizontal: 10,paddingVertical: 10},
          touch2:{width:'40%',backgroundColor:'#aee8c0',marginBottom:0,shadowColor: '#696969',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 2,elevation: 4,paddingHorizontal: 10,paddingVertical: 10},
          touch3:{width:'40%',backgroundColor:'#aee8c0',marginBottom:0,shadowColor: '#696969',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 2,elevation: 4,paddingHorizontal: 10,paddingVertical: 10},
          touch4:{width:'40%',backgroundColor:'#aee8c0',marginBottom:0,shadowColor: '#696969',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 2,elevation: 4,paddingHorizontal: 10,paddingVertical: 10},
          tstyle1:{fontWeight:'800',color:'#8D0000'},
          tstyle2:{fontWeight:'600',color:'#696969'},
          t1:{fontWeight:'800',color:'#8D0000'},
          t2:{fontWeight:'600',color:'#696969'},
          t3:{fontWeight:'600',color:'#696969'},
          t4:{fontWeight:'600',color:'#696969'},
          check:'1', 
          title:'',
          keyword:'',
          authorname:'',
          selectedCategory:[],
          categoryId:[], 
          selectedSlug:[],
          visible:false

        }
    }

    componentDidMount()
    {
      NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
      
      if(state.isConnected){
        this.getAuthor()
      }

      else
      {
          alert("Check your Connection")
      }
      })
    }
    closeModal = () => {
        this.setState({ visible: false });
      };

    getAuthor=async()=>{
        var token=await AsyncStorage.getItem('token');
        NetInfo.fetch().then(state => {
          console.log("Connection type", state.type);
          console.log("Is connected?", state.isConnected);
        
        if(state.isConnected){
        Get('wp-json/api/authors/',token).then((getauthor)=>{
            console.log("getauthor",getauthor)
            this.setState({author:getauthor.data})
            this.getCategory()
      })
    }

    else
    {
        alert("Check your Connection")
    }
    })
      }

      getCategory=async()=>{
        var token=await AsyncStorage.getItem('token');NetInfo.fetch().then(state => {
          console.log("Connection type", state.type);
          console.log("Is connected?", state.isConnected);
        
        if(state.isConnected){
        Get('wp-json/wp/v2/categories',token).then((getcategories)=>{
            console.log("getcategories",getcategories)
            this.setState({getcategories:getcategories,loading:false})
      })
    }

    else
    {
        alert("Check your Connection")
    }
    })
      }
      
      _renderItem ({item, index}) {
        return (
            <View>
                <Image source={{uri:item.image}} style={{ height: 250, resizeMode: 'stretch', width: '100%', marginTop: 5 }} />
            </View>
        );
    }

    setFunction(item)
    {
        if(item=='1')
        {
            this.setState({touch1:this.state.style2,touch2:this.state.style1,touch3:this.state.style1,touch4:this.state.style1,
            t1:this.state.tstyle1,t2:this.state.tstyle2,t3:this.state.tstyle2,t4:this.state.tstyle2,authorid:'',title:'',categoryId:[]})
        }
        else if(item=='2')
        {
            this.setState({touch2:this.state.style2,touch3:this.state.style1,touch4:this.state.style1,touch1:this.state.style1,
                t2:this.state.tstyle1,t3:this.state.tstyle2,t4:this.state.tstyle2,t1:this.state.tstyle2,keyword:'',title:'',categoryId:[]})
        }
        else if(item=='3')
        {
            this.setState({touch3:this.state.style2,touch4:this.state.style1,touch1:this.state.style1,touch2:this.state.style1,
                t3:this.state.tstyle1,t4:this.state.tstyle2,t1:this.state.tstyle2,t2:this.state.tstyle2,authorid:'',keyword:'',categoryId:[]})
        }
        else
        {
            this.setState({touch4:this.state.style2,touch1:this.state.style1,touch2:this.state.style1,touch3:this.state.style1,
                t4:this.state.tstyle1,t1:this.state.tstyle2,t2:this.state.tstyle2,t3:this.state.tstyle2,authorid:'',keyword:'',tite:''})
        }
    }

    selectCategory = item => {
    
        let { selectedCategory, categoryId, selectedSlug } = this.state;
        let { getcategories } = this.state;
        getcategories.map(subItem => {
          if (item.id === subItem.id) {
            if(subItem.isSelected)
            {
              subItem.isSelected = false;
              var index = categoryId.indexOf(subItem.id)
              if (index !== -1) {
                categoryId.splice(index, 1);
              }
    
              var index = selectedCategory.indexOf(subItem.name)
              if (index !== -1) {
                selectedCategory.splice(index, 1);
              }
    
              var index = selectedSlug.indexOf(subItem.slug)
              if (index !== -1) {
                selectedSlug.splice(index, 1);
              }
            }
            else
            {
            subItem.isSelected = true;
            selectedCategory.push(subItem.name);
            selectedSlug.push(subItem.slug);
            categoryId.push(subItem.id);
            }
          } 
          
          
        });
        this.setState({
          selectedCategory: selectedCategory,
          categoryId: categoryId,
          selectedSlug: selectedSlug
        });
      };
     
      selectauthor=(item)=>
      {
        let {author}=this.state;
        author.map(subItem => {
        if (item.value === subItem.value) {
            subItem.isSelected=true
        }
        else
        {
            subItem.isSelected=false
        }
    })
            this.setState({authorid:item.value,authorname:item.label})
            this.setState({author})
      }
    
    renderView()
    {
        let {check}=this.state;
        let {authorname,selectedCategory}=this.state;
        if(check=='1')
        {
            return(
            <View style={{flex:1,width:'100%',marginTop:100,alignItems:'center'}}>
                <View style={styles.containerStyle}>
              <TextInput
                style={[styles.titleStyle,{width:'100%',paddingVertical:10}]}
                underlineColorAndroid="transparent"
                placeholder="Enter Keyword"
                multiline={true}
                onChangeText={text => this.setState({ keyword: text })}
                value={this.state.keyword}
              />
            </View>
            </View>
            )
        }
        else if(check=='2')
        {
            return(
            <View style={{flex:1,width:'100%',marginTop:100,alignItems:'center'}}>
                <TouchableOpacity
              onPress={() => this.setState({ visible: true })}
              activeOpacity={0.7}
              style={[styles.containerStyle, { height: 60, paddingLeft: 15 }]}
            >
              <Text style={styles.titleStyle}>
                {authorname != "" ? authorname: "Select Author"}
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
                <AuthorModal
                categories={this.state.author}
                handleSubmit={this.closeModal}
                changeCategory={this.selectauthor}
                visible={this.state.visible}
                close={this.closeModal}
              />
            </View>
            )
        }
        else if(check=='3')
        {
            return(
            <View style={{flex:1,width:'100%',marginTop:100,alignItems:'center'}}>
                <View style={styles.containerStyle}>
              <TextInput
                style={[styles.titleStyle,{width:'100%',paddingVertical:10}]}
                underlineColorAndroid="transparent"
                placeholder="Story Title"
                multiline={true}
                onChangeText={text => this.setState({ title: text })}
                value={this.state.title}
              />
            </View>
            </View>
                )
        }
        else
        {

            return(
                <View style={{flex:1,width:'100%',marginTop:100,alignItems:'center'}}>
                <TouchableOpacity
              onPress={() => this.setState({ visible: true })}
              activeOpacity={0.7}
              style={[styles.containerStyle, { height: 60, paddingLeft: 15 }]}
            >
              <Text style={styles.titleStyle}>
                {selectedCategory != "" ? selectedCategory+",": "Select Categories"}
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
                <CategoriesModal
                categories={this.state.getcategories}
                handleSubmit={this.closeModal}
                changeCategory={this.selectCategory}
                visible={this.state.visible}
                close={this.closeModal}
              />
            </View>
            )
        }
    }

    applyfilter=async()=>
    {
        var token=await AsyncStorage.getItem('token');
        let {check}=this.state;
       
        NetInfo.fetch().then(state => {
          console.log("Connection type", state.type);
          console.log("Is connected?", state.isConnected);
        
        if(state.isConnected){
        if(check=='1')
        {
        if(this.state.keyword=='')
        displayErrorToast("Enter Keyword")
        else
        {
          this.setState({loading:true})
            Get('wp-json/wp/v2/posts?search='+this.state.keyword+'',token).then((getresult)=>{
                console.log("getresult",getresult)
                this.setState({loading:false,keyword:''})
                if(getresult.length!=0)
                {
                  this.props.navigation.navigate("SearchResult",{item:getresult})
                }
                else
                {
                  displayErrorToast("No results found")
                }
            })
          }
        }
        else if(check=='2')
        {
          if(this.state.authorid=='')
        displayErrorToast("Select author")
        else
        {
          this.setState({loading:true})
            Get('wp-json/wp/v2/posts?author='+this.state.authorid+'',token).then((getresult)=>{
                console.log("getresult",getresult)
                this.setState({loading:false,authorid:'',authorname:''})
                if(getresult.length!=0)
                {
                  this.props.navigation.navigate("SearchResult",{item:getresult})
                }
                else
                {
                  displayErrorToast("No results found")
                }
            })
          }
        }
        else if(check=='3')
        {
          if(this.state.title=='')
        displayErrorToast("Enter Title")
        else
        {
          this.setState({loading:true})
            Get('wp-json/wp/v2/posts?order=asc&search='+this.state.title+'',token).then((getresult)=>{
                console.log("getresult",getresult)
                this.setState({loading:false,title:''})
                if(getresult.length!=0)
                {
                  this.props.navigation.navigate("SearchResult",{item:getresult})
                }
                else
                {
                  displayErrorToast("No results found")
                }
            })
          }
        }
        else
        {      
          if(this.state.categoryId=='')
        displayErrorToast("Select Category")
        else
        {   
          this.setState({loading:true}) 
                Get('wp-json/wp/v2/posts?categories='+this.state.categoryId+'',token).then((getresult)=>{
                console.log("getresult",getresult)
                this.setState({loading:false,categoryId:[],selectedCategory:[],selectedSlug:[]})
                if(getresult.length!=0)
                {
                  this.props.navigation.navigate("SearchResult",{item:getresult})
                }
                else
                {
                  displayErrorToast("No results found")
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
    }


    reset()
    {
      this.setState({categoryId:[],selectedCategory:[],selectedSlug:[],title:'',keyword:'',authorid:'',authorname:''})
    }
 

    render() {
        if(this.state.loading)
        {
            return(
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Loader loaderclose={this.state.loading} />
                </View>
            )
        }
        const { navigation} = this.props;
        return (
           
          
                <View style={{ resizeMode: 'contain', flex:1, width: '100%' }}>
                    <MyHeader
                    name="SEARCH"
                    skip={true}
                    navigation={navigation}
                    />
                    <KeyboardAwareScrollView style={styles.keyboardView}
              contentContainerStyle={styles.containers} >
                    <View style={{width:'100%',flexDirection:'row',marginTop:40,alignItems:'center',justifyContent:'space-evenly'}}>
                        <TouchableOpacity style={this.state.touch1} onPress={()=> {this.setFunction("1"),this.setState({check:"1"})}}>
                            <Text style={[this.state.t1,{textAlign:'center',fontSize:16,paddingVertical:5,fontFamily:Fonts.medium}]}>Keyword</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.touch2} onPress={()=> {this.setFunction("2"),this.setState({check:"2"})}}>
                            <Text style={[this.state.t2,{textAlign:'center',fontSize:16,paddingVertical:5,fontFamily:Fonts.medium}]}>Author</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'100%',flexDirection:'row',marginTop:20,alignItems:'center',justifyContent:'space-evenly'}}>
                        <TouchableOpacity style={this.state.touch3} onPress={()=> {this.setFunction("3"),this.setState({check:"3"})}}>
                            <Text style={[this.state.t3,{textAlign:'center',fontSize:16,paddingVertical:5,fontFamily:Fonts.medium}]}>Title</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.touch4} onPress={()=> {this.setFunction("4"),this.setState({check:"4"})}}>
                            <Text style={[this.state.t4,{textAlign:'center',fontSize:16,paddingVertical:5,fontFamily:Fonts.medium}]}>Category</Text>
                        </TouchableOpacity>
                    </View>
                    {this.renderView(this.state.check)}
                    
                    </KeyboardAwareScrollView>
                    <View style={{flexDirection:'row',marginBottom:40,justifyContent:'center'}}>
                        <TouchableOpacity style={{width:'45%',backgroundColor:'#fff',borderWidth:1,borderColor:'#8d0000'}} onPress={()=>this.reset()}><Text style={{paddingVertical:12,textAlign:'center',fontSize:18,color:'#8d0000'}}>Reset</Text></TouchableOpacity>
                        <TouchableOpacity style={{width:'45%',backgroundColor:'#8d0000',marginLeft:10}} onPress={()=>this.applyfilter()}><Text style={{paddingVertical:12,textAlign:'center',fontSize:18,color:'#fff'}}>Apply</Text></TouchableOpacity>
                    </View>
                </View>
            
        );
    }
}