import React, { useContext } from 'react'
import { View, Image, Text, RefreshControl, ScrollView, ImageBackground, ActivityIndicator, Linking, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { HeaderCustom } from '../Constants/Header'
import { styles } from './scheduleStyling'
const welcome2 = require('../../../../../assets/welcome2.png')
import { getScheduleDetail, startSchduleRide, startSchduleRideReminder, completeSchduleRide, deleteSchdule, getUserDetail, getReviewStatus, getSchedule } from '../../../../Redux/Actions/userAction'
import { Button, Icon } from 'native-base'
import moment from 'moment'
import CountDown from 'react-native-countdown-component';
import { LocalizationContext } from '../../../../Localization/LocalizationContext'
import Axios from 'axios'
import { API_ENDPOINT } from '../../../../Constant/constant'
import OptionsMenu from "react-native-option-menu";

const phoneImg = require('../../../../../assets/phone.png')
const whatsapp = require('../../../../../assets/whatsapp.png')


const ViewScheduleDetail = (props) => {

    const myIcon = (<Icon name="ellipsis-vertical" type='Ionicons' size={30} color="#fff" style={{ color: "#fff" }} />)

    const { schduleDetail, userDetails, startSchduleRide, startSchduleRideReminder, completeSchduleRide, deleteSchdule, getUserDetail, getReviewStatus, getSchedule, getScheduleDetail } = props
    const contextType = useContext(LocalizationContext)
    const { translations } = contextType
    const onRefresh = () => {
        getScheduleDetail(userDetails.data.id, schduleDetail.schedule_data.id)
    }
    var startTime = schduleDetail ? new Date().getTime() : null
    var endTime = schduleDetail ? "13:00" : null
    console.log("schduleDetail schduleDetail", schduleDetail)

    if (schduleDetail && (schduleDetail.schedule_data.ride_status == 1 && startTime)) {
        var startTimeConverted = moment(startTime).format("LTS")
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

    // generate transaction
    const generateTransaction = async (id) => {
        const formData = new FormData();
        formData.append("action", "performTransaction")
        formData.append("schedule_id", id)
        try {
            let response = await Axios.post(`${API_ENDPOINT}transactions.php`, formData)

            console.log("perform transaction", response)
            onRefresh()
            if (response.status == 200) {
            }
        } catch (error) {
            console.log(error)
        }
    }

    // check transaction
    const checkTransaction = async (id) => {
        console.log(id)
        const formData = new FormData();
        formData.append("action", "checkTransaction")
        formData.append("transaction_id", id)
        try {
            let response = await Axios.post(`${API_ENDPOINT}transactions.php`, formData)

            console.log("check transaction", response)
            // onRefresh()
            if (response.status == 200) {
                Alert.alert("message", response.data.transactions[0].transaction.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    let filterdUserOfGenratedTransaction = schduleDetail?.user_data ? schduleDetail.user_data.filter(x => x.txn_id == null) : []
    console.log("filterdUserOfGenratedTransaction", filterdUserOfGenratedTransaction, Array.isArray(filterdUserOfGenratedTransaction), filterdUserOfGenratedTransaction.length == 0)
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={welcome2} style={{ height: "100%", width: '102%', flex: 1, justifyContent: 'center', right: 5 }}>
                <View style={{ ...styles.itemContainer, marginVertical: 10 }}>
                    <HeaderCustom headerTxt={translations.SCHEDULE_DETAIL} navigation={props.navigation} />
                </View>

                <ScrollView refreshControl={<RefreshControl colors={["#3A91FA"]} refreshing={props.fetching} />} contentContainerStyle={{ paddingBottom: 70 }}>

                    {schduleDetail &&
                        <View>
                            {schduleDetail.user_data ?
                                <>
                                    <View style={[styles.itemContainer, styles.row, styles.spaceBtw]}>
                                        {[translations.NAME, translations.NO_OF_SEATS, ""].map((val, ind) => {
                                            return <Text key={ind} style={[styles.whiteBoldTxt, { letterSpacing: 0, textAlign: 'center' }]}>{val}</Text>
                                        })}
                                    </View>
                                    <View>
                                        {schduleDetail.user_data.map((value, index) => {
                                            var phone = value.ph_number.slice(1, value.ph_number.length);
                                            var converted = `+593${phone}`
                                            return (
                                                <View key={index} style={[styles.itemContainer, styles.row, styles.spaceBtw, { borderWidth: 1, borderColor: '#fff' }]}>
                                                    <Text style={styles.whiteNormalTxt}>{value.first_name} {value.last_name}</Text>
                                                    <Text style={styles.whiteNormalTxt}>{value.seat}</Text>
                                                    <View style={[styles.row, styles.spaceBtw]}>
                                                        {/* <TouchableOpacity onPress={() => {
                                                            Linking.openURL(`tel:${converted}`)
                                                        }} style={{ height: 35, width: 35, borderRadius: 100, alignItems: 'center' }}>
                                                            <Image source={phoneImg} style={{ height: 18, width: 18, top: 5 }} />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => {
                                                            Linking.openURL(`whatsapp://send?text=hello&phone=${converted}`)
                                                        }} style={{ height: 35, width: 35, borderRadius: 100, alignItems: 'center' }}>
                                                            <Image source={whatsapp} style={{ height: 20, width: 20, top: 5 }} />
                                                        </TouchableOpacity> */}
                                                        <OptionsMenu
                                                            customButton={myIcon}
                                                            destructiveIndex={1}
                                                            customButtonStyle={{ marginLeft: 30 }}
                                                            options={["Phone Call", "Whatsapp", "Check Payment", "Cancel"]}
                                                            actions={
                                                                [
                                                                    () => {
                                                                        Linking.openURL(`tel:${converted}`)
                                                                    },
                                                                    () => {
                                                                        Linking.openURL(`whatsapp://send?text=hello&phone=${converted}`)
                                                                    },
                                                                    () => {
                                                                        checkTransaction(value.txn_id)
                                                                    }
                                                                ]}
                                                        />
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </View>
                                </>
                                :
                                <View style={{ borderWidth: 1, borderColor: '#fff', ...styles.itemContainer }}>
                                    <Text style={[styles.whiteNormalTxt, { textAlign: 'center' }]}>
                                        {translations.NO_ANY_USER_BOOKED_YOU}
                                    </Text>
                                </View>
                            }

                            <View style={styles.itemContainer}>
                                <View style={[styles.itemContainer, styles.row, styles.spaceBtw]}>
                                    <Text style={styles.whiteNormalTxt}>{translations.TOTAL_SEATS}</Text>
                                    <Text style={styles.whiteNormalTxt}>{schduleDetail.schedule_data.seat}</Text>
                                </View>
                                <View style={[styles.itemContainer, styles.row, styles.spaceBtw]}>
                                    <Text style={styles.whiteNormalTxt}>{translations.REMAINING_SEATS}</Text>
                                    <Text style={styles.whiteNormalTxt}>{schduleDetail.schedule_data.seat_available}</Text>
                                </View>
                                <View style={[styles.itemContainer, styles.row, styles.spaceBtw]}>
                                    <Text style={styles.whiteNormalTxt}>{translations.PRICE_PER_SEAT}</Text>
                                    <Text style={styles.whiteNormalTxt}>${schduleDetail.schedule_data.price}</Text>
                                </View>
                                <View style={[styles.itemContainer, styles.row, styles.spaceBtw]}>
                                    <Text style={styles.whiteNormalTxt}>{translations.DEPARTURE_DATE}</Text>
                                    <Text style={styles.whiteNormalTxt}>{schduleDetail.schedule_data.schedule_date}</Text>
                                </View>
                                <View style={[styles.itemContainer, styles.row, styles.spaceBtw]}>
                                    <Text style={styles.whiteNormalTxt}>{translations.DEPARTURE_TIME}</Text>
                                    <Text style={styles.whiteNormalTxt}>{schduleDetail.schedule_data.timing}</Text>
                                </View>
                                <View style={[styles.itemContainer, styles.row, styles.spaceBtw]}>
                                    <Text style={styles.whiteNormalTxt}>{translations.STATUS}</Text>
                                    {schduleDetail.schedule_data.ride_status == 0 && <Text style={styles.redTxt}>{translations.PENDING}</Text>}
                                    {schduleDetail.schedule_data.ride_status == 1 && <Text style={styles.yellowTxt}>{translations.IN_PROCESS}</Text>}
                                    {schduleDetail.schedule_data.ride_status == 2 && <Text style={styles.blueTxt}>{translations.STARTED}</Text>}
                                    {schduleDetail.schedule_data.ride_status == 3 && <Text style={styles.greenTxt}>{translations.COMPLETED}</Text>}

                                </View>

                                {schduleDetail.schedule_data.ride_status == 1 && duration > 0 && <View>
                                    <CountDown
                                        until={duration}
                                        onFinish={() => duration = -1}
                                        size={30}
                                        digitStyle={{ backgroundColor: 'transparent' }}
                                        digitTxtStyle={{ color: '#3A91FA' }}
                                        timeToShow={["H", 'M', 'S']}
                                        // timeLabels={{h:"HH", m: 'MM', s: 'SS'}}
                                        timeLabelStyle={{ paddingVertical: 10, color: '#FFF' }}
                                    />
                                </View>}

                                {schduleDetail.user_data && schduleDetail.schedule_data.ride_status == 0 &&
                                    <View style={styles.itemContainer}>
                                        {!props.fetching ?
                                            <Button onPress={() => {
                                                startSchduleRideReminder(schduleDetail.schedule_data.id)
                                            }} style={styles.btnStyle} full rounded>
                                                <Text style={{ color: '#fff' }}>
                                                    30 {translations.MIN_REMINDER}
                                                </Text>
                                            </Button> :
                                            <ActivityIndicator size="large" color="#3A91FA" />
                                        }
                                    </View>}

                                {!schduleDetail.user_data &&
                                    <View style={styles.itemContainer}>
                                        {!props.fetching ?
                                            <Button onPress={() => {
                                                deleteSchdule(schduleDetail.schedule_data.id, userDetails.data.id)
                                            }} style={[styles.btnStyle, { backgroundColor: '#fc0f03' }]} full rounded>
                                                <Text style={{ color: '#fff' }}>
                                                    {translations.DELETE}
                                                </Text>
                                            </Button> :
                                            <ActivityIndicator size="large" color="#3A91FA" />
                                        }
                                    </View>}

                                {schduleDetail.user_data && schduleDetail.schedule_data.ride_status == 1 && duration < 0 &&
                                    <View style={styles.itemContainer}>
                                        {!props.fetching ?
                                            <>
                                                <Button
                                                    disabled
                                                    onPress={() => {
                                                        startSchduleRide(schduleDetail.schedule_data.id)
                                                    }} style={styles.btnStyle} full rounded>
                                                    <Text style={{ color: '#fff' }}>
                                                        {translations.START_RIDE}
                                                    </Text>
                                                </Button>
                                                <Button
                                                    disabled={(Array.isArray(filterdUserOfGenratedTransaction) && filterdUserOfGenratedTransaction.length == 0) ? true : false}
                                                    onPress={() => {
                                                        generateTransaction(schduleDetail.schedule_data.id)
                                                    }} style={styles.btnStyle} full rounded>
                                                    <Text style={{ color: '#fff' }}>
                                                        Get Payment
                                                        {/* {translations.START_RIDE} */}
                                                    </Text>
                                                </Button>
                                            </>
                                            :
                                            <ActivityIndicator size="large" color="#3A91FA" />
                                        }
                                    </View>}


                                {schduleDetail.user_data && schduleDetail.schedule_data.ride_status == 2 &&
                                    <View style={styles.itemContainer}>
                                        {!props.fetching ?
                                            <Button onPress={() => {
                                                props.completeSchduleRide(schduleDetail.schedule_data.id)
                                                    .then((res) => {
                                                        getUserDetail(userDetails.data.id)
                                                        getReviewStatus(userDetails.data.id)
                                                        getSchedule(userDetails.data.id)
                                                        props.navigation.navigate("Main")
                                                    })
                                                    .catch((err) => {

                                                    })
                                            }} style={styles.btnStyle} full rounded>
                                                <Text style={{ color: '#fff' }}>
                                                    {translations.COMPLETE_RIDE}
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
    getScheduleDetail, startSchduleRide, startSchduleRideReminder, completeSchduleRide, deleteSchdule, getUserDetail, getReviewStatus, getSchedule
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewScheduleDetail);