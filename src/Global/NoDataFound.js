import React from "react";
import { Text, View } from "react-native";
import Colors from './Color';

const NoDataFound = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.Red }}>
      Empty
    </Text>
  </View>
);

export default NoDataFound;
