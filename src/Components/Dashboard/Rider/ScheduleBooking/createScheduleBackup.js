import { Button, Input, Item, Label } from 'native-base'
import React, { useState } from 'react'
import { View, Text, Image, ImageBackground, ActivityIndicator, Alert } from 'react-native'
import { HeaderCustom } from '../Constants/Header'
import { SearchLocation } from '../Constants/locationSearch'
import { styles } from './scheduleStyling'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { connect } from 'react-redux'
import { createSchedule, getSchedule } from '../../../../Redux/Actions/userAction'
const CreateSchedule = (props) => {

    const [type, setType] = useState('')
    const [fromCordinate, setfromCordinate] = useState('')
    const [toCordinate, settoCordinate] = useState('')
    const [fromAddress, setfromAddress] = useState('')
    const [toAddress, settoAddress] = useState('')
    const [visible, setVisible] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [mode, setMode] = useState('date')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [price, setPrice] = useState('')
    const [seat, setSeat] = useState('')


    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (e) => {
      var time = moment(e).format('HH:mm')
      var date = moment(e).format('YYYY-MM-DD')
      if(mode == "time") {
        setTime(time)
      }else{
          setDate(date)
      }
      console.log("A date has been picked: ", date, "time", time);
      hideDatePicker();
    };

    const onClosed = () => {
        setVisible(false)
        setType('')
    }

    const onSelect = (data, description) => {
        setVisible(false)
        if(description !== "Current location") {
            if(type == "from") {
                setfromCordinate(
                    {
                        latitude: data.result.geometry.location.lat,
                        longitude: data.result.geometry.location.lng
                    }
                )
                setfromAddress(data.result.formatted_address)
            }else {
                settoCordinate(
                    {
                        latitude: data.result.geometry.location.lat,
                        longitude: data.result.geometry.location.lng
                    }
                )
                settoAddress(data.result.formatted_address)
            }
        }else {

            if(type == "from") {
                setfromCordinate(
                    {
                        latitude: data.geometry.location.lat,
                        longitude: data.geometry.location.lng
                    }
                )
                setfromAddress(data.description)
            }else {
                settoCordinate(
                    {
                        latitude: data.geometry.location.lat,
                        longitude: data.geometry.location.lng
                    }
                )
                settoAddress(data.description)
            }
        }

    }

    const onSubmit = () => {
        const {getSchedule, userDetails, createSchedule} = props
        var data = {
           'action': 'addSchedule',
           'rider_id': userDetails.data.id,
           'pickup_longitude': fromCordinate.lat,
           'pickup_latitude': fromCordinate.lng,
           'drop_longitude': toCordinate.lat,
           'drop_latitude': toCordinate.lng,
           'pick_location_name': fromAddress,
           'drop_location_name': toAddress,
           'timing': time,
           'price': price,
           'seat': seat,
           'date': date 
           }; 

           var formData = new FormData()
            formData.append("action", "addSchedule");
            formData.append("rider_id", userDetails.data.id);
            formData.append("pickup_longitude", fromCordinate.longitude);
            formData.append("pickup_latitude", fromCordinate.latitude);
            formData.append("drop_longitude", toCordinate.longitude);
            formData.append("drop_latitude", toCordinate.latitude);
            formData.append("pick_location_name", fromAddress);
            formData.append("drop_location_name", toAddress);
            formData.append("timing", time);
            formData.append("price", price);
            formData.append("seat", seat);
            formData.append("date", date);
           createSchedule(formData)
           .then((res) => {
               Alert.alert("Alert", res.message)
               getSchedule(userDetails.data.id)
               console.log(" onSubmit res", res, data)
               props.navigation.goBack()
           })       
           .catch((err) => {
            Alert.alert("Alert", err.message)
           })
    }
    return(
        <View style={{flex:1}}>
            {<SearchLocation visible={visible} closed={onClosed} onSelect={onSelect} />}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={mode}
                onConfirm={handleConfirm}
                // onChange={(e) => console.log("e e e", e)}
                onCancel={hideDatePicker}
            />
            
            <ImageBackground style={styles.backroundImage} source={require('../../../../../assets/Splash.png')}>
                <View style={styles.container}>
                    <View style={{...styles.itemContainer, marginVertical: 10}}>
                        <HeaderCustom navigation={props.navigation} headerTxt="Create New Schedule" />
                    </View>

                    <View style={[styles.row, styles.spaceBtw, styles.itemContainer, {width:'90%', alignSelf:'center'}]}>
                        <Item fixedLabel style={{width:'45%'}}>
                            <Input onFocus={() => {
                                setVisible(true);
                                setType('from');
                            }}  
                            style={styles.whiteNormalTxt}
                            value={fromAddress} placeholder="From" placeholderTextColor="#fff"/>
                        </Item>
                        <Item fixedLabel style={{width:'45%'}}>
                            <Input onFocus={() => {
                                setVisible(true);
                                setType('to');
                            }} 
                            style={styles.whiteNormalTxt}
                            value={toAddress} 
                            placeholder="To" placeholderTextColor="#fff" />
                        </Item>
                    </View>
                    <View style={styles.itemContainer, {width:'95%', alignSelf:'center'}}>
                        <Item onPress={() => {
                            setMode('time')
                            showDatePicker()
                        }} fixedLabel style={{width:'90%', alignSelf:'center'}}>
                            <Input  value={time} disabled style={styles.whiteNormalTxt} placeholder="Timing" placeholderTextColor="#fff" />
                        </Item>
                    </View>
                    <View style={[styles.row, styles.spaceBtw, styles.itemContainer, {width:'90%', alignSelf:'center'}]}>
                        <Item fixedLabel style={{width:'45%'}}>
                            <Input 
                            onChangeText={(e) => setPrice(e)}
                            keyboardType="phone-pad"
                            style={styles.whiteNormalTxt} placeholder="Price" 
                            placeholderTextColor="#fff"/>
                        </Item>
                        <Item fixedLabel style={{width:'45%'}}>
                            <Input 
                             onChangeText={(e) => setSeat(e)}
                             keyboardType="number-pad"
                             style={styles.whiteNormalTxt} placeholder="Seat" placeholderTextColor="#fff" />
                        </Item>
                    </View>
                    <View style={styles.itemContainer, {width:'95%', alignSelf:'center'}}>
                        <Item onPress={() => {
                            setMode('date')
                            showDatePicker()
                        }} fixedLabel style={{width:'90%', alignSelf:'center'}}>
                            <Input disabled value={date} style={styles.whiteNormalTxt} placeholder="Date" placeholderTextColor="#fff" />
                        </Item>
                    </View>

                    <View style={styles.itemContainer}>
                       {!props.fetching ? <Button onPress={() => {
                            onSubmit()
                        }} style={styles.btnStyle} full rounded>
                            <Text style={{color:'#fff'}}>
                                Continue
                            </Text>
                        </Button> :
                        <ActivityIndicator size="large" color="#3A91FA" />
                        }
                    </View>
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
    createSchedule, getSchedule
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateSchedule);