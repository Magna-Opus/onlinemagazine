import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Fonts from "../../../Global/Fonts.js";
import Colors from "../../../Global/Color.js";
import {MyHeader} from '../../../Global/Header.js'


export default class OnlineAdvertisement extends Component {
  render() {
    const { navigation } = this.props;
    return (
      // <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
        <View style={styles.container}>
          <MyHeader navigation={navigation} name="Online Advertisement" skip={true}/>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginTop: 8
              // justifyContent: "center"
            }}
          >
            <Text
              style={{
                paddingHorizontal: 20,
                fontSize: 18,
                padding: 20,
                color: Colors.LightBlack,
              }}
            >
              To publish your add on the application please write to us
              admin@onlinemagazine.org.uk or mystory@onlinemagazine.org.uk along
              with the time duration you want to publish your add on our
              application. We will write back to you the availability of slot &
              price estimate. Happy Publishing !!
            </Text>
          </View>
        </View>
      // </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {},
  renderContainer: {
    padding: 12,
    flex: 1
  },
  headerTextStyle: {
    // fontSize: 20,
    color: Colors.Red
    // fontFamily: Fonts.medium
  },
  contentTextStyle: {
    // fontSize: 17,
    color: Colors.LightBlack
    // fontFamily: Fonts.regular
  }
});
