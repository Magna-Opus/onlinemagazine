import React, { Component } from 'react';
import { View, ImageBackground, ScrollView, Image,TouchableOpacity, TextInput,KeyboardAvoidingView,keyboard } from 'react-native';
import styles from './LoginStyle.js'
import Colors from '../../../Global/Color.js'
import LoginForm from "./LoginForm";
import LoginBottomText from "./LoginBottomText";

import { Text, Surface,Button } from "react-native-paper";
import Images from '../../../Global/Images.js'
import { SafeAreaView } from 'react-native-safe-area-context';


export default class SignIn1 extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
      }

    render() {
      const {navigation} =this.props;
        return (
          <View style={[styles.rootContainer, styles.container]}>
          <ImageBackground
            style={styles.backgroundImageStyle}
            source={Images.bgImage}
          >
            <View style={styles.innerContainer}>
              <View style={styles.loginContainer}>
                <Image
                  style={styles.logoStyle}
                  resizeMode="contain"
                  source={Images.logo}
                />
              </View>
              <LoginForm
                onSubmit={this.handleSubmit}
                navigation={navigation}
              />
              <LoginBottomText navigation={navigation}/>
            </View>
            <View style={styles.copyrightView}>
              <Text style={styles.copyright}>© 2021, onlinemagazine</Text>
            </View>
          </ImageBackground>
        </View>
        );
    }
}


