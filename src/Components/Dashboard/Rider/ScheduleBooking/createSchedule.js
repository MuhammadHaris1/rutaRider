import { Button, Input, Item, Label } from 'native-base'
import React, { useState } from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import { HeaderCustom } from '../Constants/Header'
import { SearchLocation } from '../Constants/locationSearch'
import { styles } from './scheduleStyling'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'

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

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (e) => {
      var time = moment(e).format('LTS')
      var date = moment(e).format('MM/DD/YYYY')
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
                            keyboardType="number-pad"
                            style={styles.whiteNormalTxt} placeholder="Price" 
                            placeholderTextColor="#fff"/>
                        </Item>
                        <Item fixedLabel style={{width:'45%'}}>
                            <Input 
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
                        <Button onPress={() => {
                            showDatePicker()
                        }} style={styles.btnStyle} full rounded>
                            <Text style={{color:'#fff'}}>
                                Continue
                            </Text>
                        </Button>
                    </View>
                </View>

                
            </ImageBackground>
        </View>
    )
}

export default CreateSchedule;