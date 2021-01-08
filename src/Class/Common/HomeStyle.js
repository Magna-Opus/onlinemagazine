import { StyleSheet, Platform } from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen'
module.exports = StyleSheet.create({
    cardStyle: {
        backgroundColor: '#fff8dd', shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 10,
        paddingHorizontal: 0,
        paddingVertical:0,
        borderRadius: 5,
        marginBottom:20
    },

})