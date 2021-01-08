
import React from "react";
import { Modal, Image, ScrollView ,View} from "react-native";
import { Surface, Text } from "react-native-paper";
import Images from "../Global/Images.js";
import Colors from "../Global/Color.js";

import styles from "./ImageFormStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from 'react-native-snap-carousel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const _renderItem =({item, index})=>{
    return (
        <View style={{alignItems:'center',justifyContent:'center',height: '100%',paddingVertical:5}}>
            <Image source={{uri:item.image}} style={{  height:300,width: '100%', resizeMode: 'stretch' }} />
        </View>
    );
}


const PopUp = ({ visible, close, images }) => {
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

        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Carousel
                                    data={images}
                                    renderItem={_renderItem}
                                    sliderWidth={wp('100%')}
                                    itemWidth={wp('70%')}
                                    autoplay={true}
                                    loop={true}
                                    layout='default'
                                    autoplayInterval={3000}
                                /></View>
        
      </View>
      </SafeAreaView>
    </Modal>
  
  );
};

export default PopUp;
