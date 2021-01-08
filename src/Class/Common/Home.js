import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground ,FlatList,Alert} from 'react-native';
import styles from './HomeStyle.js'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const bgc = require("../../Image/main_bg.jpg");
const bg3 = require("../../Image/bg3.png");
const slider = require("../../Image/slider.png");
import {MyHeader} from '../../Global/Header.js'
import Loader from '../../Global/Loader.js'
import {Get} from '../../Service/Get.js'
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { StackActions, NavigationActions } from 'react-navigation';

import Carousel from 'react-native-snap-carousel';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
        }
    }

    async componentDidMount()
    {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
          
          if(state.isConnected){
        this.getStory()
    }

    else
    {
        alert("Check your Connection")
    }
    })
        
    }

    getStory=async()=>{
        var token=await AsyncStorage.getItem('token')
        Get('wp-json/api/hotstory',token).then((getstory)=>{
            console.log("getstory",getstory.data)
            this.setState({story:getstory.data})
            this.getBanners()
      })
      }

      getBanners=async()=>{
        var token=await AsyncStorage.getItem('token');
        Get('wp-json/api/banners',token).then((getbanners)=>{
            console.log("getbanners",getbanners)
            this.setState({banners:getbanners.data.data,loading:false})
      })
      }
      
      _renderItem ({item, index}) {
        return (
            <View>
                <Image source={{uri:item.image}} style={{ height: 250, resizeMode: 'stretch', width: '100%', marginTop: 5 }} />
            </View>
        );
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
           
          
                <ImageBackground source={bgc} style={{ resizeMode: 'contain', height: '100%', width: '100%' }}>
                    {/* <MyHeader
                    name="DASHBOARD"
                    skip={true}
                    
                    navigation={navigation}
                    /> */}
                    <ScrollView contentContainerStyle={{ flexGrow: 1, }}
                scrollEnabled>
                    <View style={{ flex:1}}>
                        <Image source={bg3} style={{ height: hp('30%'), resizeMode: 'cover', width: '100%' }} />
                        <View style={{ position:'absolute',paddingHorizontal: 30, top:120,alignSelf:'center',zIndex:999}}>
                            <View style={[styles.cardStyle, { width: '100%', paddingHorizontal: 10, paddingVertical: 15 }]}>
                                <Animatable.Text animation="bounce" iterationDelay={5} easing="ease-out" iterationCount="1" style={{ textAlign: 'center', fontSize: hp('3%'), color: '#8c0000', fontWeight: 'bold', paddingVertical: 2, }}>Hot Story on Online Magazine</Animatable.Text>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate("HotStory",{articleDetails:this.state.story.id})}><Text style={{ color: '#033011', fontSize: hp('2%'), textAlign: 'center', paddingVertical: 10, fontWeight: 'bold' }}>{this.state.story.title}</Text></TouchableOpacity>
                                <Text style={{ textAlign: 'right', color: '#000', fontSize: 14, marginBottom: 5 }}>Author: {this.state.story.author} </Text>
                                {/* <Text style={{ color: '#555', fontSize: hp('2%') }}>
                                {this.state.story.description}</Text> */}
                                <View style={{borderTopWidth:1, borderColor:'#ff6666',paddingVertical:5,marginTop:8,justifyContent:'space-between',flexDirection:'row'}}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <MaterialIcons name="remove-red-eye" size={20} />
                                        <Text style={{marginHorizontal:4}}>{this.state.story.views}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <MaterialIcons name="thumb-up" size={20} />
                                        <Text style={{marginHorizontal:10}}>{this.state.story.favorites}</Text>
                                    </View>
                                </View>
                                <Carousel
                                    ref={(c) => { this._carousel = c; }}
                                    data={this.state.banners}
                                    renderItem={this._renderItem}
                                    sliderWidth={wp('80%')}
                                    itemWidth={wp('80%')}
                                    autoplay={true}
                                    loop={true}
                                    layout='default'
                                    autoplayInterval={3000}
                                />
                                {/* <FlatList
                                data={this.state.banners}
                                horizontal={true}
                                renderItem={({ item }) => (<Image source={{uri:item.image}} style={{ height: '100%', resizeMode: 'cover', width: 200, marginTop: 5 }} />)}
                                keyExtractor={(_item, index) => index.toString()}
                                />*/}
                                
                            </View>
                            
                      
                         
                        </View>
                      
                    </View>
                
                    <View style={{height:450}}/>
                   
                    </ScrollView>
                    <TouchableOpacity style={{paddingHorizontal: 10,  paddingVertical: 10,backgroundColor: '#855221', borderRadius: 20,position:'absolute',zIndex:99999,bottom:30,width:'90%',alignSelf:'center'}} onPress={()=>{const resetAction = StackActions.reset({
                    index: 0, // <-- currect active route from actions array
                    actions: [
                        NavigationActions.navigate({ routeName: "homeDrawer"}),
                    ],
                });
                this.props.navigation.dispatch(resetAction);}}>
                                <Text style={{ textAlign: 'center', color: '#fff' }}>Read/Write Stories</Text>
                            </TouchableOpacity>
                </ImageBackground>
            
        );
    }
}