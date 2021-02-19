import { Input, Item } from 'native-base'
import React, { useContext, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Modal,BackHandler, ActivityIndicator, Image, Alert } from 'react-native'
import { AirbnbRating } from 'react-native-elements'
import { connect } from 'react-redux'
import { styles } from '../ScheduleBooking/scheduleStyling';
import { getReviewStatus, submitScheduleReview, dismissSchedule } from "../../../../Redux/Actions/userAction"
import { LocalizationContext } from '../../../../Localization/LocalizationContext'

const RenderReviewModal = (props) => {
    
    const { fetching, userDetails, getReviewStatus, submitScheduleReview, dismissSchedule} = props
    const [ratingDescription, setRatingDescription] = useState('')
    const [ratingCount, setRatingCount] = useState(0)
        const contextType = useContext(LocalizationContext)
        const { translations } = contextType

        return (
            <View style={inPageStyles.mainContainer}>
                <Modal
                    transparent={true}
                    visible={props.reviewModal === true}
                    onRequestClose={() => {
                        BackHandler.exitApp()
                    }}
                >
                    <View style={inPageStyles.backgroundContainer}>
                        <View style={[styles.row, styles.spaceBtw]}>
                            <View style={{width:'35%'}} />

                            <View style={[inPageStyles.heading, inPageStyles.itemContainer]}>
                                <Text style={inPageStyles.heading}>
                                    {translations.REVIEW_RATING}
                                </Text>
                            </View>
                            
                            <TouchableOpacity onPress={() => {
                                dismissSchedule(props.data.schedule_id)
                                .then((res) => {
                                    Alert.alert("Alert", res.message)
                                    getReviewStatus(userDetails.data.id)
                                })
                                .catch((err) => {
                                    Alert.alert("Alert", err.message)
                                    getReviewStatus(userDetails.data.id)
                                })
                            }} style={{width:'35%', alignSelf:'center', left: '100%'}} >
                                <Image style={styles.imgIcon} source={require('../../../../../assets/close.png')} />
                            </TouchableOpacity>
                        </View>


                        <ScrollView style={{ width: '100%' }}>

                            <View style={{flex: 1}}>

                                <View style={styles.itemContainer}>
                                    <View style={[styles.row, styles.spaceBtw, {width:'100%'}]}>
                                        <Text style={[styles.whiteBoldTxt]}>
                                            {translations.TOTAL_SEATS}:
                                        </Text>
                                        <Text style={[styles.whiteNormalTxt]}>
                                            {props.data.seat}
                                            {/* {props.data.first_name} {props.data.last_name}  */}
                                        </Text>
                                    </View>
                                    <View style={[styles.row, styles.spaceBtw, {width:'100%'}]}>
                                        <Text style={[styles.whiteBoldTxt]}>
                                            {translations.BOOKED_SEATS}:
                                        </Text>
                                        <Text style={[styles.whiteNormalTxt]}>
                                            {props.data.seat - props.data.seat_available}
                                        </Text>
                                    </View>
                                    <View style={[styles.row, styles.spaceBtw, {width:'100%'}]}>
                                        <Text style={[styles.whiteBoldTxt]}>
                                            {translations.PICKUP}:
                                        </Text>
                                        <Text style={[styles.whiteNormalTxt, {width:'60%', textAlign:'right'}]}>
                                            {props.data.pickup_location_name}
                                        </Text>
                                    </View>
                                    <View style={[styles.row, styles.spaceBtw, {width:'100%'}]}>
                                        <Text style={[styles.whiteBoldTxt]}>
                                            {translations.DESTINATION}:
                                        </Text>
                                        <Text style={[styles.whiteNormalTxt, {width:'60%', textAlign:'right'}]}>
                                            {props.data.destination_location_name}
                                        </Text>
                                    </View>
                                    <View style={[styles.row, styles.spaceBtw, {width:'100%'}]}>
                                        <Text style={[styles.whiteBoldTxt]}>
                                            {translations.DATE}:
                                        </Text>
                                        <Text style={[styles.whiteNormalTxt]}>
                                            {props.data.schedule_date}
                                        </Text>
                                    </View>
                                </View>

                                <AirbnbRating
                                    defaultRating={ratingCount}
                                    count={5}
                                    onFinishRating={(rating) => setRatingCount(rating)}
                                    size={20}
                                    />
                                
                                <View style={{alignSelf:'center', paddingVertical: 30}}> 
                                    <Item regular style={{ width: '90%', marginTop: '2%', borderColor:'#3A91FA', borderRadius: 10 }}>
                                        <Input
                                        multiline
                                        value={ratingDescription}
                                        style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => {
                                            if(e.length <= 30 ) {
                                                setRatingDescription(e)
                                            }else {
                                                Alert.alert("Alert", "You Reached Review limit")
                                            }
                                        }} placeholder={translations.ENTER_YOUR_REVIEW} />
                                    </Item>
                                    <Text style={{color:'red', textAlign:'right'}}>{translations.MAX_30_LETTERS}, {30 - ratingDescription.length} {translations.REMAINING} 
                                    </Text>
                                </View>


                                {!fetching ? 
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log( userDetails.data.id, ratingCount, ratingDescription)
                                        submitScheduleReview(props.data.schedule_id, userDetails.data.id, ratingCount, ratingDescription)
                                        .then((res) => {
                                            Alert.alert("Alert", res.message)
                                            getReviewStatus(userDetails.data.id)
                                        })
                                        .catch((err) => {
                                            Alert.alert("Alert", err.message)
                                            getReviewStatus(userDetails.data.id)
                                        })
                                    }}
                                    style={{backgroundColor:'#3A91FA', width:'60%', alignSelf:'center', flexDirection:'row',  justifyContent:'space-around', padding: 10, borderRadius: 20, marginTop: 20}}>
                                        <Text style={{color:'#fff' ,}}>{translations.SEND_FEEDBACK}</Text>
                                </TouchableOpacity> 
                                    :
                                <ActivityIndicator color="#3A91FA" />}
                                

                            </View>
                        
                        </ScrollView>
                    </View>
                </Modal>
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
   getReviewStatus, submitScheduleReview, dismissSchedule
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderReviewModal);

const inPageStyles = StyleSheet.create({
    mainContainer: { 
        flex: 1, 
        position: 'absolute', 
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0 
    },
    backgroundContainer: { 
        backgroundColor: 'rgb(41, 46, 66)', 
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center', 
        height: '100%' 
    },
    heading: {
        color:"#fff",
        fontSize: 18
    },
    centerComponent: {
        alignItems:'center',
        justifyContent:'center'
    },
    itemContainer: {
        padding: 20
    },
    row: {
        flexDirection:'row'
    },
    spaceBtw: {
        justifyContent:'space-between'
    },
})
