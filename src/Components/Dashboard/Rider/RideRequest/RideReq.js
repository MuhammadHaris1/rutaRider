import { Button } from 'native-base';
import React from 'react'
import { View, Text, ImageBackground, ScrollView, FlatList} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { HeaderCustom } from '../Constants/Header';
import { styles } from '../ScheduleBooking/scheduleStyling';

const renderReq = (item, index) => {
    return(
        <View key={index} style={[styles.scheduleCard]}>
            <LinearGradient style={[styles.round, {width:'100%'}]}
                colors={['#3895FC', '#16C7FE', "#01E5FE"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
            <View style={[styles.itemContainer, styles.round]}>
                <View style={[styles.row, styles.spaceBtw]}>
                    <Text style={styles.whiteBoldTxt}>
                        Name:
                    </Text>
                    <Text style={styles.whiteBoldTxt}>
                       Mudassir Raza
                    </Text>
                </View>
                <View style={[styles.row, styles.spaceBtw]}>
                    <Text style={styles.whiteBoldTxt}>
                        Seats:
                    </Text>
                    <Text style={styles.whiteBoldTxt}>
                        2
                    </Text>
                </View>
                <View style={[styles.row, styles.spaceBtw, {paddingVertical:10}]}>
                        <Button transparent onPress={() => {
                        }} style={{width:'45%', alignSelf:'center',backgroundColor:'#fff',
                        borderRadius: 10, borderColor:'#3A91FA', borderWidth: 4}} full>
                            <Text style={{color:'#3A91FA', textAlign:'center'}}>
                                Accept
                            </Text>
                        </Button>

                        <Button transparent onPress={() => {
                        }} style={{width:'45%', alignSelf:'center', backgroundColor:'#fff',
                        borderRadius: 10}} full>
                            <Text style={{color:'#3A91FA', textAlign:'center'}}>
                                Reject
                            </Text>
                        </Button>
                </View>
           </View>
        </LinearGradient>
        </View>
    )
}

const RideReq = (props) => {
    return(
        <View>
            <ImageBackground style={styles.backroundImage} source={require('../../../../../assets/Splash.png')}>
                <View style={styles.container}>
                    <View style={{...styles.itemContainer, marginVertical: 10}}>
                        <HeaderCustom navigation={props.navigation} headerTxt="Ride Requests" />
                    </View>

                    <FlatList
                        data={[1,2,3,4,5,6,7,8,9,10]}
                        renderItem={({item, index}) => {
                            return(
                                renderReq(item, index)
                            )
                        }}
                    />

                </View>
            </ImageBackground>
        </View>
    )
}

export default RideReq;