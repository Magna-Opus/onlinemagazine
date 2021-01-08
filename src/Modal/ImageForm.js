
import React from "react";
import { Modal, Image, ScrollView ,View} from "react-native";
import { Surface, Text } from "react-native-paper";
import Images from "../Global/Images.js";
import styles from "./ImageFormStyle";
import { SafeAreaView } from "react-native-safe-area-context";

const ImageModal = ({ visible, close, image, images }) => {
  return (
    <Modal
      animationType={"fade"}
      visible={visible}
      onRequestClose={close}
      transparent={true}
    >
      <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
      <View style={styles.container}>
        <Surface style={styles.closeContainer}>
          <Text onPress={close} style={styles.closeButton}>
            Close
          </Text>
        </Surface>

        <ScrollView
          style={styles.textContainer}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center"
          }}
          horizontal
          pagingEnabled={true}
        >
          {images.length > 0 ? (
            images.map((item, index) => (
              
              <Image
                key={index}
                style={styles.imageStyle}
                resizeMode="contain"
                source={{ uri: item }}
              />
            ))
          ) :( 
            image?
              <Image
              style={styles.imageStyle}
              resizeMode="contain"
              source={{ uri: image }}
            />:
            <Image
              style={styles.imageStyle}
              resizeMode="contain"
              source={Images.defaultImage}
            />
          )}
        </ScrollView>
        {/* <Surface style={styles.textContainer}>
        <Image style={{height:"100%", width: "100%"}} source={Images.defaultImage} resizeMode="contain" />
          
        </Surface> */}
      </View>
      </SafeAreaView>
    </Modal>
  
  );
};

export default ImageModal;
