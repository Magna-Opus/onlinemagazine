import React from "react"
import { View, ActivityIndicator } from "react-native"
import styles from "./Style"
import Colors from "./Color"
import { Text } from "react-native-paper"

const Indicator = () => (
  <View>
    <ActivityIndicator size="large" color={Colors.CategoryOn} />
    <Text style={{ margin: 4 }}>Loading...</Text>
  </View>
)
export default Indicator
