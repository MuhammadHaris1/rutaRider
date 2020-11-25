import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { Header } from 'react-native-elements'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { styles } from '../ScheduleBooking/scheduleStyling';


const Logo = require('../../../../../assets/Logo.png')
const back = require('../../../../../assets/back.png')
const sidebar = require('../../../../../assets/sidebar.png')
const add = require('../../../../../assets/add.png')


export const HeaderCustom = (props) => {

    return (
        <Header
            containerStyle={{ backgroundColor: 'transparent', borderBottomWidth: 0, width: Dimensions.get('window').width }}
            leftComponent={
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image source={back} style={{ height: 20, width: 20 }} />
            </TouchableOpacity>}

            centerComponent={
            <View>
                {props.headerTxt && <Text style={{ fontSize: 20, color: '#fff' }}>{props.headerTxt}</Text>}
                {props.logo &&  <Image source={Logo} style={{width: wp(20), height:hp(14), top:(5)}} />}
            </View>
            }   

            rightComponent={
                <View style={styles.row}>
                {props.sidebar  &&
                        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
                            <Image source={sidebar} style={styles.imgIcon} />
                        </TouchableOpacity>}
                {props.add &&
                        <TouchableOpacity onPress={() => props.navigation.navigate('CreateSchedule')}>
                            <Image source={add} style={styles.imgIcon} />
                        </TouchableOpacity>}
                </View>
            }
        />
    )
}