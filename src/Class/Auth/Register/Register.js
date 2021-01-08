import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  
} from "react-native";
import rootStyles from "../../../Global/Style.js";
import styles from "./RegisterStyle";
import { Surface } from "react-native-paper";
import Images from "../../../Global/Images.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "./RegisterForm";
import RegisterBottomText from "./RegisterBottomText";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      error: {}
    };
    this.email = React.createRef();
  }


render() {
    const { navigation } = this.props;
    return (
      // <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
        <View style={[rootStyles.rootContainer, styles.container]}>
          <ImageBackground
            style={styles.backgroundImage}
            source={Images.bgImage}
          >
              <SafeAreaView style={{flex:1}}>
            <KeyboardAwareScrollView
              style={styles.keyboardView}
              contentContainerStyle={styles.container}
            >
              <View style={styles.registerForm}>
                <View style={styles.logoContainer}>
                  <Image
                    style={styles.logoStyle}
                    resizeMode="contain"
                    source={Images.logo}
                  />
                </View>
                <RegisterForm
                  onSubmit={this.handleSubmit}
                  navigation={navigation}
                /> 
              </View>
              <RegisterBottomText navigation={navigation} />
            </KeyboardAwareScrollView>
            </SafeAreaView>
          </ImageBackground>
        </View>
      // </SafeAreaView>
    );
  }
}