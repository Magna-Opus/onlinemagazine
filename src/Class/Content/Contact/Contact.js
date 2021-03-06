
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Linking,
  Platform,
  Dimensions,
  SafeAreaView
} from "react-native";
import { Subheading, Paragraph } from "react-native-paper";
import Fonts from "../../../Global/Fonts.js";
import Color from "../../../Global/Color.js";
import Images from "../../../Global/Images.js";
import {MyHeader} from '../../../Global/Header.js'
import Entypo from "react-native-vector-icons/Entypo";

import { contactData } from "./ContactData";
const { height, width } = Dimensions.get("window");

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
        contact:{address:'lamaid 153 Boleyn Road, London E7 9QH, United Kingdom',postcode:'Post Code: E7 9QH',country:'United Kingdom',email:'support@docaid.online',phone:'+440 7440304828'},
        loading:false
    };
}
  renderContactUs = item => {
    return (
      // <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
        <View style={styles.renderContainer}>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <Entypo
                  name={item.image}
                  size={30}
                  color={Color.Red}
                />

            <View style={{ marginLeft: 12 }}>
              <Subheading style={styles.headerTextStyle}>
                {item.title}
              </Subheading>
              <Paragraph style={styles.contentTextStyle}>
                {item.content}
              </Paragraph>
            </View>
          </View>
        </View>
      // </SafeAreaView>
    );
  };

  linkMap()
    {
        if(Platform.OS=='android')
        var url='https://www.google.com/maps/search/?api=1&query='+this.state.contact.address;
        else
        var url='http://maps.apple.com/?address='+this.state.contact.address;
        Linking.canOpenURL(url)
  .then((supported) => {
    if (!supported) {
      console.log("Can't handle url: " + url);
    } else {
      return Linking.openURL(url);
    }
  })
  .catch((err) => console.error('An error occurred', err));
    }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
 <MyHeader
            skip={true}
            navigation={navigation}
            name="Contact Us"
            />
        <TouchableOpacity onPress={()=>this.linkMap()}>
          <Image
          source={Images.map}
          style={{ height: height / 2.5, width: width }}
          resizeMode="cover"
        />
        </TouchableOpacity>

        <FlatList
          data={contactData}
          renderItem={({ item, index }) => this.renderContactUs(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default ContactUs;

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
    // fontSize: 17,
    color: Color.Red
    // fontFamily: Fonts.medium
  },
  contentTextStyle: {
    // fontSize: 16,
    color: Color.LightBlack
    // fontFamily: Fonts.regular
  }
});
