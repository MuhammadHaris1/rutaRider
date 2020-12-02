import { Button } from 'native-base';
import React from 'react'
import { View, Text, ImageBackground, ScrollView, FlatList, Alert, RefreshControl} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { request } from 'react-native-permissions';
import { connect } from 'react-redux';
import { acceptBooking, getBookingReq, rejectBooking } from '../../../../Redux/Actions/userAction';
import { HeaderCustom } from '../Constants/Header';
import { styles } from '../ScheduleBooking/scheduleStyling';

const renderReq = (item, index, acceptBooking, userDetails, getBookingReq, rejectBooking) => {
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
                       {item.first_name} {item.last_name}
                    </Text>
                </View>
                <View style={[styles.row, styles.spaceBtw]}>
                    <Text style={styles.whiteBoldTxt}>
                        Seats:
                    </Text>
                    <Text style={styles.whiteBoldTxt}>
                        {item.seat}
                    </Text>
                </View>
                <View style={[styles.row, styles.spaceBtw, {paddingVertical:10}]}>
                        <Button transparent onPress={() => {
                            acceptBooking(userDetails.data.id, userDetails.role_id, item.booking_schedule_id)
                            .then((res) => {
                                getBookingReq(userDetails.data.id)
                                Alert.alert("Alert", res.message)
                            })
                            .catch((err) => {
                                Alert.alert("Alert", err.message)
                            })
                        }} style={{width:'45%', alignSelf:'center',backgroundColor:'#fff',
                        borderRadius: 10, borderColor:'#3A91FA', borderWidth: 4}} full>
                            <Text style={{color:'#3A91FA', textAlign:'center'}}>
                                Accept
                            </Text>
                        </Button>

                        <Button transparent onPress={() => {
                            rejectBooking(userDetails.data.id, userDetails.role_id, item.booking_schedule_id)
                            .then((res) => {
                                getBookingReq(userDetails.data.id)
                                Alert.alert("Alert", res.message)
                            })
                            .catch((err) => {
                                Alert.alert("Alert", err.message)
                            })
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
const {fetching, requests, acceptBooking, userDetails, getBookingReq, rejectBooking} = props
    console.log("requests requests", requests)

    const onRefresh = () => {
        getBookingReq(userDetails.data.id)
    }
    return(
        <View>
            <ImageBackground style={styles.backroundImage} source={require('../../../../../assets/Splash.png')}>
                <View style={styles.container}>
                    <View style={{...styles.itemContainer, marginVertical: 10}}>
                        <HeaderCustom navigation={props.navigation} headerTxt="Ride Requests" />
                    </View>

                    {requests ?
                        <FlatList
                            data={requests}
                            refreshControl={<RefreshControl colors={["#3A91FA"]} refreshing={fetching} onRefresh={onRefresh} />} contentContainerStyle={{paddingBottom: 70}}
                            renderItem={({item, index}) => {
                                return(
                                    renderReq(item, index, acceptBooking, userDetails, getBookingReq, rejectBooking)
                                )
                            }}
                        /> 
                    
                    :
                    
                    <ScrollView refreshControl={<RefreshControl colors={["#3A91FA"]} refreshing={fetching} onRefresh={onRefresh} />} >
                        <View style={{justifyContent: 'center', alignContent:'center', marginTop: '50%'}}>
                            <Text style={{color:"#fff", alignSelf:'center', fontSize: 20}}>
                                You Have't any Request!
                            </Text>
                        </View>
                    </ScrollView>
                    }

                </View>
            </ImageBackground>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        requests: state.user.requests

    };
};

const mapDispatchToProps = {
    acceptBooking, getBookingReq, rejectBooking
};


export default connect(mapStateToProps, mapDispatchToProps)(RideReq);