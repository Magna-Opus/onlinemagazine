import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView ,Image, StatusBar,TouchableOpacity,Alert,ActivityIndicator,FlatList} from 'react-native';

import Colors from '../../../Global/Color.js'
import {MyHeader} from '../../../Global/Header.js'
import Loader from '../../../Global/Loader.js';
import { aboutData } from "./AboutData";
// const back = require("../../Image/about.jpg");
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {Get} from '../../../Service/Get.js'
import { Subheading, Headline } from "react-native-paper";

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            about:[],
            loading:true
        };
    }

    renderAboutUs = item => {
        return (
          // <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
            <View style={styles.renderContainer}>
              <Headline style={styles.headerTextStyle}>{item.title}</Headline>
              <Subheading style={styles.contentTextStyle}>
                {item.content}
              </Subheading>
            </View>
          // </SafeAreaView>
        );
      };

render(){
    const {navigation}= this.props;
return(
    <View style={styles.container}>
        <MyHeader
        skip={true}
        navigation={navigation}
            name="About Us"
            />
       
        <FlatList
          data={aboutData}
          renderItem={({ item, index }) => this.renderAboutUs(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
  
)
}
}
const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    innerContainer: {},
    renderContainer: {
      padding: 20,
      flex: 1
    },
    headerTextStyle: {
      // fontSize: 20,
      color: Colors.Red
      // fontFamily: Fonts.medium
    },
    contentTextStyle: {
      // fontSize: 17,
      color: Colors.LightBlack,
      padding: 20
      // fontFamily: Fonts.regular
    }
  });