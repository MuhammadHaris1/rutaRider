import React from 'react'
import { View, Text, ScrollView, ImageBackground } from 'react-native'
import { connect } from 'react-redux';
import { HeaderCustom } from '../Constants/Header';
import { styles } from './scheduleStyling';
import LinearGradient from 'react-native-linear-gradient';

const ScheduleBooking = (props) => {

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

    return(
        <View>
            <ImageBackground style={styles.backroundImage} source={require('../../../../../assets/Splash.png')}>
                <View style={styles.container}>
                    <View style={{...styles.itemContainer, marginVertical: 10}}>
                        <HeaderCustom  add logo navigation={props.navigation}/>
                    </View>
                    
                    <ScrollView>
                    {scheduleBookings.map((val, ind) => {
                        return(
                            <View key={ind} style={[styles.scheduleCard]}>
                                <LinearGradient style={[styles.round, {width:'100%'}]}
                                 colors={['#3895FC', '#16C7FE', "#01E5FE"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                                    <View style={[styles.itemContainer, styles.round]}>
                                        <Text style={styles.whiteBoldTxt}>
                                            {val.from} - {val.destination}
                                        </Text>
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
                                        {val.availableSeats}
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
	};
  };
  
  const mapDispatchToProps = {

  };


export default connect(mapStateToProps, mapDispatchToProps)(ScheduleBooking);