import React from 'react'
import { View, Text, ScrollView, ImageBackground } from 'react-native'
import { connect } from 'react-redux';
import { HeaderCustom } from '../Constants/Header';
import { styles } from './scheduleStyling';
import LinearGradient from 'react-native-linear-gradient';
import { Accordion } from 'native-base';

const ScheduleBooking = (props) => {
    const { schedule } = props
    const scheduleBookings = [
        {
            from: 'Karachi',
            destination: 'Lahore',
            timing: '03:00 AM',
            date: '27-Nov-2020',
            availableSeats : 3,
            price: '1450'
        },
        {
            from: 'Karachi',
            destination: 'Lahore',
            timing: '03:00 AM',
            date: '27-Nov-2020',
            availableSeats : 3,
            price: '1450'
        },
        {
            from: 'Karachi',
            destination: 'Lahore',
            timing: '03:00 AM',
            date: '27-Nov-2020',
            availableSeats : 3,
            price: '1450'
        },
        {
            from: 'Karachi',
            destination: 'Lahore',
            timing: '03:00 AM',
            date: '27-Nov-2020',
            availableSeats : 3,
            price: '1450'
        },
    ]
    let arrow = "<----->"
    return(
        <View>
            <ImageBackground style={styles.backroundImage} source={require('../../../../../assets/Splash.png')}>
                <View style={styles.container}>
                    <View style={{...styles.itemContainer, marginVertical: 10}}>
                        <HeaderCustom  add logo navigation={props.navigation}/>
                    </View>
                    
                    <ScrollView>
                     {schedule ?
                        <View>
                            {schedule.map((val, ind) => {
                                return(
                                    <View key={ind} style={[styles.scheduleCard]}>
                                        <LinearGradient style={[styles.round, {width:'100%'}]}
                                        colors={['#3895FC', '#16C7FE', "#01E5FE"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                                            <View style={[styles.itemContainer, styles.round]}>
                                                {/* <Text style={styles.whiteNormalTxt}>
                                                    {val.pickup_name} - {val.destination_name}
                                                </Text> */}
                                                <Accordion 
                                                expandedIcon
                                                style={{borderWidth: 0}}
                                                headerStyle={{backgroundColor:'transparent'}}
                                                renderHeader={(e) => {
                                                    return(
                                                        <Text
                                                        numberOfLines={1}
                                                        style={{...styles.whiteBoldTxt, width: '70%'}}>
                                                             {val.pickup_name} - {val.destination_name}
                                                        </Text>
                                                    )
                                                }}
                                                dataArray={[val]} renderContent={(e) => {
                                                    return(
                                                        <Text style={styles.whiteNormalTxt}>
                                                            {val.pickup_name} - {val.destination_name}
                                                        </Text>
                                                    )
                                                }} expanded={ind}/>
                                            </View>
                                        </LinearGradient>

                                        <View style={[styles.row, styles.spaceBtw, styles.itemContainer]}>
                                            <Text style={styles.whiteNormalTxt}>
                                            Timing 
                                            </Text>
                                            <Text style={styles.whiteNormalTxt}>
                                                {val.timing}
                                            </Text>
                                        </View>
                                        <View style={[styles.row, styles.spaceBtw, styles.itemContainer]}>
                                            <Text style={styles.whiteNormalTxt}>
                                            Date 
                                            </Text>
                                            <Text style={styles.whiteNormalTxt}>
                                                {val.date}
                                            </Text>
                                        </View>
                                        <View style={[styles.row, styles.spaceBtw, styles.itemContainer]}>
                                            <Text style={styles.whiteNormalTxt}>
                                                Available Seats 
                                            </Text>
                                            <Text style={styles.whiteNormalTxt}>
                                                {val.seat}
                                            </Text>
                                        </View>
                                        <View style={[styles.row, styles.spaceBtw, styles.itemContainer]}>
                                            <Text style={styles.whiteNormalTxt}>
                                            Price 
                                            </Text>
                                            <Text style={styles.whiteNormalTxt}>
                                                Rs: {val.price}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View> 
                        
                    : 
                    
                    <View style={{justifyContent: 'center', alignContent:'center', top: '60%'}}>
                        <Text style={{color:"#fff", alignSelf:'center', fontSize: 20}}>
                            You have't create any Schedule!
                        </Text>
                    </View>
                    }
                    
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>
    )
}


const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        schedule: state.user.schedule,
	};
  };
  
  const mapDispatchToProps = {

  };


export default connect(mapStateToProps, mapDispatchToProps)(ScheduleBooking);