import { ListItem } from 'native-base'
import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import { Divider } from 'react-native-elements'
import { HeaderCustom } from '../Constants/Header'
import { styles } from '../ScheduleBooking/scheduleStyling'


const Notification = (props) => {

    const renderItem = (item, index) => {
        return(
            <View style={{backgroundColor:"transparent", width:'100%'}}>
                <TouchableOpacity style={[styles.row, styles.itemContainer]}>
                    <View>
                        <Image source={{uri: 'https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'}} style={{height: 50, width: 50, borderRadius: 10}}/>
                    </View>  
                    <View style={{alignSelf:'center', width:'80%', paddingHorizontal: 10}}>
                        <Text style={styles.whiteNormalTxt}>
                            You have a new booking request for  3 seats for 3 seats 
                        </Text>    
                    </View>                  
                </TouchableOpacity>   
                <Divider style={{backgroundColor:'#fff'}} />             
            </View>
        )
    }

    return(
        <View>
             <ImageBackground style={styles.backroundImage} source={require('../../../../../assets/Splash.png')}>
                 <View style={styles.container}>
                    <View style={{left: 15}}>
                        <HeaderCustom navigation={props.navigation} headerTxt="Notification" />
                        <FlatList
                            data={[1,2,3,4,5,6,7,8,9,10]}
                            renderItem={({item, index}) => {
                                return(
                                    renderItem(item, index)
                                )
                            }}
                        />
                    </View>
                 </View>
             </ImageBackground>
        </View>
    )
}


export default Notification;