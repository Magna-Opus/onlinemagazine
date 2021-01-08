import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView ,Image, StatusBar,TouchableOpacity,Alert,ActivityIndicator} from 'react-native';
import styles from '../../Global/Style.js'
import color from '../../Global/Color.js'
import Loader from '../../Global/Loader'

import {MyHeader} from '../../Global/Header.js'

// const back = require("../../Image/about.jpg");
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {Get} from '../../Service/Get.js'

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            privacy:[],
            loading:true
        };
    }

    componentDidMount()
    {
        Get('api/privacy-policy').then((privacy)=>{
            console.log("Privacy Policy: ",privacy)
            this.setState({privacy:privacy.result.resultarray,loading:false})
                   
        })
    }

render(){
    const {navigation}= this.props;
return(
    <View style={{ flex: 1, backgroundColor:color.WHITE}} >
        <MyHeader
            skip={true}
            navigation={navigation}
            name="PRIVACY POLICY"
            />
        {this.state.loading?
            <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:color.WHITE}}>
                <Loader loaderclose={this.state.loading} />
            </View>:
            <View style={styles.content}>
            
                <ScrollView contentContainerStyle={{ flexGrow: 1}} scrollEnabled>
                    <Text style={styles.aboutdesp}>{this.state.privacy}</Text>
                    <View style={{height:60}}/>
                </ScrollView>
            </View>
        }
    </View>
)
}
}