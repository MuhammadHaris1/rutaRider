import React from 'react'
import { View, Text, RefreshControl, ScrollView, ImageBackground, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import { HeaderCustom } from '../Constants/Header'
import { styles } from './scheduleStyling'
const welcome2 = require('../../../../../assets/welcome2.png')
import { getScheduleDetail, startSchduleRide, startSchduleRideReminder } from '../../../../Redux/Actions/userAction'
import { Button } from 'native-base'
import moment from 'moment'
import CountDown from 'react-native-countdown-component';

const ViewScheduleDetail = (props) => {
    const { schduleDetail, userDetails, startSchduleRide, startSchduleRideReminder } = props

    const onRefresh = () => {
        getScheduleDetail(userDetails.data.id, schduleDetaile.schedule_data.id)
    }
    var startTime = schduleDetail ? new Date().getTime() : null
    var endTime = schduleDetail ? schduleDetail.schedule_data.ride_start_after_time : null

    if(schduleDetail && (schduleDetail.schedule_data.ride_status == 1 && startTime )) {
            var startTimeConverted =  moment(startTime).format("LTS")
            var endTimeConverted = moment(endTime, "hh:mm:ss").format("LTS")
            
            var sTime = moment(startTimeConverted, "hh:mm:ss");
            var eTime = moment(endTimeConverted, "hh:mm:ss");
        
            // calculate total duration
            var diffr = moment.duration(eTime.diff(sTime));
        
            // console.log("diffr", diffr, "startTime", startTime, "endTime", endTime)
            var hours = parseInt(diffr.asHours());
            var minutes = parseInt(diffr.minutes());
            var seconds = parseInt(diffr.seconds());
            var duration = (hours * 60 * 60) + (minutes * 60) + seconds;
            console.log("duration duration", duration, "hours", hours, "minutes", minutes, "seconds", seconds, "startTime", sTime, "endTime", eTime, "Current Time", new Date().getTime())
            // var d = hours * 60 * 60 + minutes * 60 + seconds;
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
                                    <View style={[styles.itemContainer, styles.row, styles.spaceBtw]}>
                                        <Text style={styles.whiteNormalTxt}>Status</Text>
                                        {schduleDetail.schedule_data.ride_status == 0 && <Text style={styles.redTxt}>Pending</Text>}
                                        {schduleDetail.schedule_data.ride_status == 1 && <Text style={styles.yellowTxt}>In Process</Text>}
                                        {schduleDetail.schedule_data.ride_status == 2 && <Text style={styles.blueTxt}>Started</Text>}
                                        {schduleDetail.schedule_data.ride_status == 3 && <Text style={styles.greenTxt}>Compeletd</Text>}
                    
                                    </View>

                                  {schduleDetail.schedule_data.ride_status == 1 &&  duration > 0 &&  <View>
                                    <CountDown
                                            until={duration}
                                            onFinish={() => duration = -1}
                                            size={30}
                                            digitStyle={{backgroundColor: 'transparent'}}
                                            digitTxtStyle={{color: '#3A91FA'}}
                                            timeToShow={["H",'M', 'S']}
                                            // timeLabels={{h:"HH", m: 'MM', s: 'SS'}}
                                            timeLabelStyle={{paddingVertical:10, color: '#FFF'}}
                                        />
                                    </View>}

                                    {schduleDetail.user_data && schduleDetail.schedule_data.ride_status == 0 && 
                                        <View style={styles.itemContainer}>
                                            {!props.fetching ? 
                                                <Button onPress={() => {
                                                    startSchduleRideReminder(schduleDetail.schedule_data.id)
                                                }} style={styles.btnStyle} full rounded>
                                                    <Text style={{color:'#fff'}}>
                                                        30 min reminder
                                                    </Text>
                                                </Button> :
                                                <ActivityIndicator size="large" color="#3A91FA" />
                                                }
                                        </View>}

                                        {schduleDetail.user_data && schduleDetail.schedule_data.ride_status == 1 && duration < 0 &&
                                        <View style={styles.itemContainer}>
                                            {!props.fetching ? 
                                                <Button onPress={() => {
                                                    startSchduleRide(schduleDetail.schedule_data.id)
                                                }} style={styles.btnStyle} full rounded>
                                                    <Text style={{color:'#fff'}}>
                                                        Start Ride
                                                    </Text>
                                                </Button> :
                                                <ActivityIndicator size="large" color="#3A91FA" />
                                                }
                                        </View>}


                                        {schduleDetail.user_data && schduleDetail.schedule_data.ride_status == 2 && duration < 0 &&
                                        <View style={styles.itemContainer}>
                                            {!props.fetching ? 
                                                <Button onPress={() => {
                                                    startSchduleRide(schduleDetail.schedule_data.id)
                                                }} style={styles.btnStyle} full rounded>
                                                    <Text style={{color:'#fff'}}>
                                                        Complete Ride
                                                    </Text>
                                                </Button> :
                                                <ActivityIndicator size="large" color="#3A91FA" />
                                                }
                                        </View>}
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
    getScheduleDetail, startSchduleRide, startSchduleRideReminder
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewScheduleDetail);