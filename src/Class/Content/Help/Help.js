
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { Paragraph, Subheading, Title } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";
import Colors from "../../../Global/Color.js";
import Fonts from "../../../Global/Fonts.js";
// import styles from './style'
import { dataHelp } from "./HelpData";
import {MyHeader} from '../../../Global/Header.js'

class Help extends Component {
  constructor() {
    super();
    this.state = {
      value: false
    };
  }

  selectedBox = item => {
    // let tempArr = dataHelp;
    dataHelp.map((subItem, subIndex) => {
      item.id === subItem.id
        ? (subItem.isSelected = !subItem.isSelected)
        : (subItem.isSelected = false);
    });
    this.setState({ value: !this.state.value });
  };

  renderHelp = item => {
    return (
      <TouchableOpacity
        onPress={() => this.selectedBox(item)}
        style={styles.renderContainer}
      >
        <View style={styles.innerRenderContainer}>
          <Subheading style={styles.headerTextStyle}>{item.title}</Subheading>
          <Entypo
            name={item.isSelected ? "chevron-small-up" : "chevron-small-down"}
            size={30}
            color={Colors.Red}
          />
        </View>

        {item.isSelected && (
          <View style={styles.descriptionStyle}>
            {item.points.map((subItem, index) => (
              <View key={index} style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Fonts.medium
                  }}
                >
                  {index + 1}
                  {"."}{" "}
                </Text>
                <Text style={{ fontSize: 14, fontFamily: Fonts.regular }}>
                  {subItem}
                </Text>
              </View>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  render() {
    const { navigation } = this.props;
    const { data } = this.state;
    return (
      // <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
        <View style={styles.container}>
          <MyHeader navigation={navigation} name="Help" skip={true}/>

          <View style={styles.innerContainer}>
            <FlatList
              data={dataHelp}
              extraData={this.state}
              renderItem={({ item, index }) => this.renderHelp(item, index)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      // </SafeAreaView>
    );
  }
}

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    flex: 1,
    padding: 15
  },
  renderContainer: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    borderRadius: 5,
    marginVertical: 3
  },
  innerRenderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5
  },
  headerTextStyle: {
    fontSize: 17,
    fontFamily: Fonts.medium,
    color: Colors.Red
  },
  descriptionStyle: {}
});
