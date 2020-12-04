import React from 'react'
import { View, Text, RefreshControl, ScrollView, ImageBackground, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import { HeaderCustom } from '../Constants/Header'
import { styles } from './scheduleStyling'
const welcome2 = require('../../../../../assets/welcome2.png')
import { getScheduleDetail } from '../../../../Redux/Actions/userAction'
import { Button } from 'native-base'

const ViewScheduleDetail = (props) => {
    const { schduleDetail, userDetails } = props

    const onRefresh = () => {
        getScheduleDetail(userDetails.data.id, schduleDetaile.schedule_data.id)
    }
    
    return (
        <View style={{flex: 1}}>
            <ImageBackground source={welcome2} style={{height:"100%", width:'102%', flex: 1, justifyContent:'center',right:5}}> 
                <View style={{...styles.itemContainer, marginVertical: 10}}>
                    <HeaderCustom  headerTxt="Schedule Details" navigation={props.navigation} />
                </View>

                <ScrollView refreshControl={<RefreshControl colors={["#3A91FA"]} refreshing={props.fetching}/>} contentContainerStyle={{paddingBottom: 70}}>

                       {schduleDetail &&
                        <View>
                                {schduleDetail.user_data ?
                                <>
                                    <View style={[styles.itemContainer ,styles.row, styles.spaceBtw]}>
                                    {["Name", "No of seat", "Phone"].map((val, ind) => {
                                        return <Text key={ind} style={[styles.whiteBoldTxt, {letterSpacing: 0, textAlign:'center'}]}>{val}</Text>
                                    })}
                                    </View>
                                    <View>
                                    {schduleDetail.user_data.map((value, index) => {
                                        return(
                                            <View key={index} style={[styles.itemContainer ,styles.row, styles.spaceBtw, {borderWidth:1, borderColor:'#fff'}]}>
                                                <Text style={styles.whiteNormalTxt}>{value.first_name} {value.last_name}</Text>
                                                <Text style={styles.whiteNormalTxt}>{value.seat}</Text>
                                                <Text style={styles.whiteNormalTxt}>{value.ph_number}</Text>
                                            </View>  
                                            )                                  
                                    })}
                                    </View>
                                </>
                                :
                                <View style={{borderWidth: 1, borderColor: '#fff', ...styles.itemContainer}}>
                                    <Text style={[styles.whiteNormalTxt, {textAlign: 'center'}]}>
                                        No any user booked you!
                                    </Text>
                                </View>
                                }
                                
                                <View style={styles.itemContainer}>
                                    <View style={[styles.itemContainer, styles.row, styles.spaceBtw]}>
                                        <Text style={styles.whiteNormalTxt}>Total Seats</Text>
                                        <Text style={styles.whiteNormalTxt}>{schduleDetail.schedule_data.seat}</Text>
                                    </View>
                                    <View style={[styles.itemContainer, styles.row, styles.spaceBtw]}>
                                        <Text style={styles.whiteNormalTxt}>Remaining Seats</Text>
                                        <Text style={styles.whiteNormalTxt}>{schduleDetail.schedule_data.seat_available}</Text>
                                    </View>
                                    <View style={[styles.itemContainer, styles.row, styles.spaceBtw]}>
                                        <Text style={styles.whiteNormalTxt}>Price per seat</Text>
                                        <Text style={styles.whiteNormalTxt}>${schduleDetail.schedule_data.price}</Text>
                                    </View>
                                    <View style={[styles.itemContainer, styles.row, styles.spaceBtw]}>
                                        <Text style={styles.whiteNormalTxt}>Departure date</Text>
                                        <Text style={styles.whiteNormalTxt}>{schduleDetail.schedule_data.schedule_date}</Text>
                                    </View>
                                    <View style={[styles.itemContainer, styles.row, styles.spaceBtw]}>
                                        <Text style={styles.whiteNormalTxt}>Departure time</Text>
                                        <Text style={styles.whiteNormalTxt}>{schduleDetail.schedule_data.timing}</Text>
                                    </View>

                                    <View style={styles.itemContainer}>
                                        {!props.fetching ? 
                                            <Button onPress={() => {
                                                // onSubmit()
                                            }} style={styles.btnStyle} full rounded>
                                                <Text style={{color:'#fff'}}>
                                                    Start Ride in 30 min
                                                </Text>
                                            </Button> :
                                            <ActivityIndicator size="large" color="#3A91FA" />
                                            }
                                        
                                        {/* {!props.fetching ?
                                        <Button rounded full  onPress={() => {
                                        }} style={{width:'90%', alignSelf:'center', backgroundColor:'#fff',
                                        marginVertical: 10, borderRadius: 100 }} >
                                            <Text style={{color:'#3A91FA', textAlign:'center'}}>
                                                Send Reminder to all
                                            </Text>
                                        </Button>
                                        :
                                        <ActivityIndicator size="large" color="#fff" />
                                        } */}
                                    </View>
                                </View>
                        </View>} 

                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        schduleDetail: state.user.schduleDetail
    };
};

const mapDispatchToProps = {
    getScheduleDetail
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewScheduleDetail);