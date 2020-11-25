import React from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import { HeaderCustom } from '../Constants/Header'
import { styles } from './scheduleStyling'

const CreateSchedule = () => {

    return(
        <View>
            <ImageBackground style={styles.backroundImage} source={require('../../../../../assets/Splash.png')}>
                <View style={styles.container}>
                    <View style={{...styles.itemContainer, marginVertical: 10}}>
                        <HeaderCustom headerTxt="Create New Schedule" />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default CreateSchedule;