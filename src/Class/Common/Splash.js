import React, { Component } from 'react';
import { View, Text, ImageBackground, ScrollView, Image, TouchableOpacity, TextInput,StatusBar } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import styles from '../../Global/Style.js'
const splash = require("../../Image/splashscreen.jpg");
import AsyncStorage from '@react-native-community/async-storage';

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async componentDidMount()
    {

        setTimeout(
           ()=>{ 
            const resetAction = StackActions.reset({
                index: 0, // <-- currect active route from actions array
                actions: [
                    NavigationActions.navigate({ routeName: "Home"}),
                ],
            });
            this.props.navigation.dispatch(resetAction);
            
        },2000)
    }

    render() {
        return (
                <ImageBackground source={splash} style={{flex:1}} >
                    <StatusBar barStyle="dark-content" />
                </ImageBackground>
        );
    }
}


