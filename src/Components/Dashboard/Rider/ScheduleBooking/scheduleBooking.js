import React, { useContext } from 'react'
import { View, Text, ScrollView, ImageBackground, RefreshControl } from 'react-native'
import { connect } from 'react-redux';
import { HeaderCustom } from '../Constants/Header';
import { styles } from './scheduleStyling';
import LinearGradient from 'react-native-linear-gradient';
import { Accordion } from 'native-base';
import { getSchedule, getScheduleDetail } from '../../../../Redux/Actions/userAction';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LocalizationContext } from '../../../../Localization/LocalizationContext';

const ScheduleBooking = (props) => {
    const contextType = useContext(LocalizationContext)
    const { translations, appLanguage } = contextType
    const { schedule, fetching, getSchedule, userDetails, getScheduleDetail } = props
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

    const onRefresh = () => {
        getSchedule(userDetails.data.id, translations, appLanguage)
    }
    let arrow = "<----->"
    return(
        <View>
            <ImageBackground style={styles.backroundImage} source={require('../../../../../assets/Splash.png')}>
                <View style={styles.container}>
                    <View style={{...styles.itemContainer, marginVertical: 10}}>
                        <HeaderCustom  add logo navigation={props.navigation}/>
                    </View>
                    
                    <ScrollView refreshControl={<RefreshControl colors={["#3A91FA"]} refreshing={fetching} onRefresh={onRefresh} />}>
                     {schedule ?
                        <View>
                            {schedule.map((val, ind) => (
                                <View key={ind} style={[styles.scheduleCard]}>
                                    <LinearGradient style={[styles.round, { width: '100%' }]}
                                        colors={['#3895FC', '#16C7FE', "#01E5FE"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                                        <View style={[styles.itemContainer, styles.round]}>
                                            <Accordion
                                                expandedIcon
                                                style={{ borderWidth: 0 }}
                                                headerStyle={{ backgroundColor: 'transparent' }}
                                                renderHeader={(e) => {
                                                    return (
                                                        <Text
                                                            numberOfLines={1}
                                                            style={{ ...styles.whiteBoldTxt, width: '70%' }}>
                                                            {val.pickup_name}
                                                            {val.destination_name}
                                                        </Text>
                                                    );
                                                } }
                                                dataArray={[val]} renderContent={(e) => {
                                                    return (
                                                        <Text style={[styles.whiteNormalTxt, {borderTopWidth: 2, borderTopColor: '#fff', paddingVertical: 5}]}>
                                                            <Text style={styles.whiteBoldTxt}>{translations.FROM}</Text> : {val.pickup_name} {'\n'}
                                                            <Text style={styles.whiteBoldTxt}>{translations.TO}</Text> : {val.destination_name}
                                                        </Text>
                                                    );
                                                } } expanded={ind} />
                                        </View>
                                    </LinearGradient>

                                    <TouchableOpacity onPress={() => {
                                        getScheduleDetail(userDetails.data.id, val.schedule_id, translations,appLanguage);
                                        // props.navigation.navigate("ViewScheduleDetails")
                                    } }>
                                        <View style={[styles.row, styles.spaceBtw, styles.itemContainer]}>
                                            <Text style={styles.whiteNormalTxt}>
                                                {translations.TIMING}
                                            </Text>
                                            <Text style={styles.whiteNormalTxt}>
                                                {val.timing}
                                            </Text>
                                        </View>
                                        <View style={[styles.row, styles.spaceBtw, styles.itemContainer]}>
                                            <Text style={styles.whiteNormalTxt}>
                                                            {translations.DATE}
                                            </Text>
                                            <Text style={styles.whiteNormalTxt}>
                                                {val.date}
                                            </Text>
                                        </View>
                                        <View style={[styles.row, styles.spaceBtw, styles.itemContainer]}>
                                            <Text style={styles.whiteNormalTxt}>
                                                {translations.AVAILABLE_SEATS}
                                            </Text>
                                            <Text style={styles.whiteNormalTxt}>
                                                {val.seat_available}
                                            </Text>
                                        </View>
                                        <View style={[styles.row, styles.spaceBtw, styles.itemContainer]}>
                                            <Text style={styles.whiteNormalTxt}>
                                                {translations.TOTAL_SEATS}
                                            </Text>
                                            <Text style={styles.whiteNormalTxt}>
                                                {val.seat}
                                            </Text>
                                        </View>
                                        <View style={[styles.row, styles.spaceBtw, styles.itemContainer]}>
                                            <Text style={styles.whiteNormalTxt}>
                                                                           {translations.PRICE}
                                            </Text>
                                            <Text style={styles.whiteNormalTxt}>
                                                    ${val.price}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View> 
                        
                    : 
                    
                    <View style={{justifyContent: 'center', alignContent:'center', marginTop: '60%'}}>
                        <Text style={{color:"#fff", alignSelf:'center', fontSize: 20}}>
                            {translations.YOU_HAVE_NOT_CREATED_ANY_SCHEDULE}
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
    getSchedule, getScheduleDetail
  };


export default connect(mapStateToProps, mapDispatchToProps)(ScheduleBooking);