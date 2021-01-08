
import React from 'react';
import {View,TouchableOpacity,Text} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { Appbar,Badge } from "react-native-paper";
import color from './Color';

export const MyHeader = ({
navigation,
name,
goBack,
skip,
webdata,
filter,
showFilterModal,
onSearch,
search,
done,
onDone,
chatno,
chats,
onChat,
onSetting,
setting

}) => (
<Appbar.Header style={{ backgroundColor: skip ? color.PrimaryColor:color.PrimaryColor}}>
{skip?(<Appbar.Action
size={35}
color={color.WHITE}
icon='keyboard-backspace'
onPress={() => navigation.goBack()}
/>):<View>{webdata?(
<Appbar.Action
size={30}
color={color.WHITE}
icon="home"
onPress={() => navigation.goBack()}
/>
):
<Appbar.Action
size={40}
color={color.WHITE}
icon="menu"
onPress={() => navigation.openDrawer()}
/>
}
</View>
}
<Appbar.Content
title={name}
titleStyle={{fontSize: 19}} 
color={color.Red} 
/>
{filter && (
<TouchableOpacity onPress={onChat}
style={{marginRight:9}}>
<View

>
<Ionicons name={'ios-send'} size={28} color={color.WHITE}/>
</View>
{chats?(
<View style={{position:'absolute',right:-1,top:0,height:16,width:16,backgroundColor:color.RED,borderRadius:8,alignItems:'center'}}>
<Text style={{alignSelf:'center',color:color.WHITE,fontSize:10,fontWeight:'bold',marginTop:1}}>{chatno}</Text>
</View>
):(<View></View>)}
</TouchableOpacity>
)}

{setting && (
<TouchableOpacity onPress={() => navigation.navigate("WriteStory")} 
style={{marginRight:9}}>
        <Appbar.Action size={30} color='black' icon={require('../Image/add_article.png')} />

</TouchableOpacity>
)}
{search && (
        <TouchableOpacity onPress={()=>navigation.navigate("Searchscreen")}
style={{marginRight:9}}>
<View

>
<MaterialIcons name={'search'} size={28} color={color.WHITE}/>
</View>
</TouchableOpacity>
)}

</Appbar.Header>
)
