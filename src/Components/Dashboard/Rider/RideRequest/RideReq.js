import React from 'react'
import { View, Text, ImageBackground, ScrollView} from 'react-native'
import { HeaderCustom } from '../Constants/Header';
import { styles } from '../ScheduleBooking/scheduleStyling';


const RideReq = (props) => {
    return(
        <View>
            <ImageBackground style={styles.backroundImage} source={require('../../../../../assets/Splash.png')}>
                <View style={styles.container}>
                    <View style={{...styles.itemContainer, marginVertical: 10}}>
                        <HeaderCustom navigation={props.navigation} headerTxt="Ride Requests" />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default RideReq;