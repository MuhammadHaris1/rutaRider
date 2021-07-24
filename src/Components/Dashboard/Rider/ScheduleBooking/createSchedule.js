import { Button, Input, Item, Label } from 'native-base'
import React, { createRef, useContext, useEffect, useRef, useState } from 'react'
import { View, Text, Image, ImageBackground, ActivityIndicator, Dimensions, Alert } from 'react-native'
import { HeaderCustom } from '../Constants/Header'
import { SearchLocation } from '../Constants/locationSearch'
import { styles } from './scheduleStyling'
import { filterSchedule, removeParams, createSchedule, getSchedule } from '../../../../Redux/Actions/userAction'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { connect } from 'react-redux'
import MapView, { MarkerAnimated, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import Geolocation from '@react-native-community/geolocation'
import LinearGradient from 'react-native-linear-gradient'
import { ScrollView } from 'react-native-gesture-handler'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { LocalizationContext } from '../../../../Localization/LocalizationContext'
import { Keyboard } from 'react-native'
const GOOGLE_MAPS_APIKEY = 'AIzaSyChHCc-8IkHyZIeHzhGomiY7sBo3fLlzak';


import { getDistance } from 'geolib';
import { TouchableOpacity } from 'react-native'
import { darkMapStyle } from '../Constants/mapStyles'


const CreateSchedule = (props) => {
    const { filterParam, filterSchedule } = props
    const [type, setType] = useState('')
    const [fromCordinate, setfromCordinate] = useState(null)
    const [toCordinate, settoCordinate] = useState(null)
    const [fromAddress, setfromAddress] = useState('')
    const [toAddress, settoAddress] = useState('')
    const [visible, setVisible] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [mode, setMode] = useState('date')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [price, setPrice] = useState('')
    const [seat, setSeat] = useState('')
    const [keyboardOpen, setKeyboardOpen] = useState(false)
    // const [mapRef, setMapRef] = useState(null)


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardOpen(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardOpen(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const [focusedlocation, setFocusLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0122,
        longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
    })
    const mapRef = useRef(null);
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;


    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            setFocusLocation({
                ...focusedlocation,
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            })
            console.log(info)
        });
    }, []);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (e) => {
        var time = moment(e).format('HH:mm')
        var date = moment(e).format('YYYY-MM-DD')
        if (mode == "time") {
            setTime(time)
        } else {
            setDate(date)
        }
        console.log("A date has been picked: ", date, "time", time);
        hideDatePicker();
    };

    const onClosed = () => {
        setVisible(false)
        setType('')
        Keyboard.dismiss()
    }


    const onSelect = (data, description) => {
        setVisible(false)
        if (description !== "Current location") {
            if (type == "from") {
                setfromCordinate(
                    {
                        latitude: data.result.geometry.location.lat,
                        longitude: data.result.geometry.location.lng
                    }
                )
                setfromAddress(data.result.formatted_address)
            } else {
                settoCordinate(
                    {
                        latitude: data.result.geometry.location.lat,
                        longitude: data.result.geometry.location.lng
                    }
                )
                settoAddress(data.result.formatted_address)
            }
        } else {

            if (type == "from") {
                setfromCordinate(
                    {
                        latitude: data.geometry.location.lat,
                        longitude: data.geometry.location.lng
                    }
                )
                setfromAddress(data.description)
            } else {
                settoCordinate(
                    {
                        latitude: data.geometry.location.lat,
                        longitude: data.geometry.location.lng
                    }
                )
                settoAddress(data.description)
            }
        }


        Keyboard.dismiss()
    }

    const onSubmit = () => {
        const { getSchedule, userDetails, createSchedule } = props

        const distance = getDistance(fromCordinate, toCordinate, 1) / 1000

        console.log(distance, "KM distance")

        var formData = new FormData()
        formData.append("action", "addSchedule");
        formData.append("rider_id", userDetails.data.id);
        formData.append("pickup_longitude", fromCordinate?.longitude);
        formData.append("pickup_latitude", fromCordinate?.latitude);
        formData.append("drop_longitude", toCordinate?.longitude);
        formData.append("drop_latitude", toCordinate?.latitude);
        formData.append("pick_location_name", fromAddress);
        formData.append("drop_location_name", toAddress);
        formData.append("timing", time);
        formData.append("price", price);
        formData.append("seat", seat);
        formData.append("date", date);
        formData.append("txn_km", distance)
        createSchedule(formData, translations, appLanguage)
            .then((res) => {
                Alert.alert(translations.ALERT, res.message)
                getSchedule(userDetails.data.id)
                props.navigation.goBack()
                console.log(" onSubmit res", res)
            })
            .catch((err) => {
                Alert.alert(translations.ALERT, err.message)
            })
    }







    const marker = () => {
        console.log("fromCordinate && toCordinate", fromCordinate, toCordinate)
        if (fromCordinate && toCordinate) {
            [fromCordinate, toCordinate].map((coordinate, index) => {
                if (index == 0) {
                    return <MarkerAnimated title={'Start'} key={`coordinate_${index}`} coordinate={fromCordinate} />
                } else if (index == 1) {
                    return <MarkerAnimated title={'Rider'} coordinate={toCordinate} />
                }
            })
        } else {
            return (null)
        }

    }

    const coordinates = [fromCordinate, toCordinate]
    console.log(" coordinates", coordinates)

    const contextType = useContext(LocalizationContext)
    const { translations, appLanguage } = contextType

    return (
        <View style={{
            flex: 1,
            //  backgroundColor:"#292E42"
        }}>
            {<SearchLocation visible={visible} closed={onClosed} onSelect={onSelect} />}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={mode}
                onConfirm={handleConfirm}
                // onChange={(e) => console.log("e e e", e)}
                display={"spinner"}
                onCancel={hideDatePicker}
            />

            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ height: heightPercentageToDP(65), width: '100%', position: 'absolute', top: 0 }}
                initialRegion={focusedlocation}
                // ref={e => setMapRef(e)}
                ref={mapRef}
                customMapStyle={darkMapStyle}
                userInterfaceStyle="dark"
            >
                {marker()}

                {(coordinates.length >= 2) &&
                    <MapViewDirections
                        origin={coordinates[0]}
                        waypoints={(coordinates.length >= 2) ? coordinates.slice(1, -1) : null}
                        // waypoints={[toCordinate, fromCordinate]}
                        destination={coordinates[coordinates.length - 1]}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor={"#fff"}
                        optimizeWaypoints={true}
                        onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={result => {
                            // console.log("RESULT", result)
                            console.log(`Distance: ${result.distance} km`)
                            console.log(`Duration: ${result.duration} min.`)
                            console.log("mapRef", mapRef.current)
                            mapRef.current.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: (width / 20),
                                    bottom: (height / 20),
                                    left: (width / 20),
                                    top: (height / 5),
                                }
                            })
                        }}
                        onError={(errorMessage) => {
                            console.log('GOT AN ERROR', errorMessage);
                        }}
                    />
                }
            </MapView>



            {/* <ImageBackground style={styles.backroundImage} source={require('../../../../../assets/welcome2.png')}> */}
            <LinearGradient colors={['#537EA8', '#395468']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={{ ...styles.container, marginTop: keyboardOpen ? heightPercentageToDP(45) : heightPercentageToDP(60) }}>

                <ScrollView>
                    <View style={[styles.container]}>
                        <View style={{ width: '95%', alignSelf: 'center' }}>
                            {/* <View style={[styles.row, styles.spaceBtw, styles.itemContainer, {width:'90%', alignSelf:'center'}]}>
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
                            </View> */}
                            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>
                                <Item fixedLabel style={{ width: '48%', alignSelf: 'center' }}>
                                    <Input
                                        onTouchStart={() => {
                                            setVisible(true);
                                            setType('from');
                                        }}
                                        onFocus={() => {
                                            setVisible(true);
                                            setType('from');
                                        }}
                                        // editable={false}
                                        style={styles.whiteNormalTxt}
                                        value={fromAddress} placeholder={translations.FROM} placeholderTextColor="#fff" />
                                </Item>
                                {/* </View> */}

                                {/* <View style={styles.itemContainer, {width:'95%', alignSelf:'center'}}> */}
                                <Item fixedLabel style={{ width: '48%', alignSelf: 'center' }}>
                                    <Input
                                        onTouchStart={() => {
                                            setVisible(true);
                                            setType('to');
                                        }}
                                        onFocus={() => {
                                            setVisible(true);
                                            setType('to');
                                        }}
                                        style={styles.whiteNormalTxt}
                                        value={toAddress}
                                        // editable={false}
                                        placeholder={translations.TO} 
                                        placeholderTextColor="#fff" />
                                </Item>
                            </View>

                            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>
                                <Item fixedLabel style={{ width: '48%' }}>
                                    <Text style={{ fontSize: 17, color: '#fff' }}>$</Text>
                                    <Input
                                        onChangeText={(e) => setPrice(e)}
                                        keyboardType="number-pad"
                                        style={styles.whiteNormalTxt} placeholder={translations.PRICE}
                                        placeholderTextColor="#fff" />
                                </Item>
                                <Item fixedLabel style={{ width: '48%' }}>
                                    <Input
                                        onChangeText={(e) => setSeat(e)}
                                        keyboardType="number-pad"
                                        style={styles.whiteNormalTxt} placeholder={translations.SEAT} placeholderTextColor="#fff" />
                                </Item>
                            </View>

                            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>
                                <TouchableOpacity onPress={() => {
                                    // alert()
                                    setMode('time')
                                    showDatePicker()
                                }} fixedLabel style={{ width: '48%', alignSelf: 'center', borderBottomColor: "#fff", borderBottomWidth: 1, paddingVertical: 15 }}>
                                    {/* <Input value={time} disabled style={styles.whiteNormalTxt} placeholder={translations.TIMING} placeholderTextColor="#fff" /> */}
                                    <Text style={styles.whiteNormalTxt}>{time ? time : translations.TIMING}</Text>
                                </TouchableOpacity>
                                {/* </View> */}

                                {/* <View style={styles.itemContainer, {width:'95%', alignSelf:'center'}}> */}
                                <TouchableOpacity onPress={() => {
                                    setMode('date')
                                    showDatePicker()
                                }} fixedLabel style={{ width: '48%', alignSelf: 'center', borderBottomColor: "#fff", borderBottomWidth: 1, paddingVertical: 15 }}>
                                    {/* <Input disabled value={date} style={styles.whiteNormalTxt} placeholder={translations.DATE} placeholderTextColor="#fff" /> */}
                                    <Text style={styles.whiteNormalTxt}>{date ? date : translations.DATE}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={{ ...styles.itemContainer, width: widthPercentageToDP(90), alignSelf: 'center' }}>
                            {!props.fetching ?
                                <LinearGradient style={{ borderRadius: 100, justifyContent: 'center', width: '100%', alignSelf: 'center', marginVertical: 20 }} colors={['#91D9F1', '#7AB1E0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                    <Button onPress={() => {
                                        const userNumber = props.userDetails.data.ph_number.replace(/\-/g, "")
                                        console.log(userNumber, props.userDetails.data.ph_number)
                                        fetch(`https://pay.payphonetodoesposible.com/api/Users/${userNumber}/region/593`, {
                                            headers: {
                                                "Authorization": "Bearer hpUc1ofDa6S1FIsiHmqDlRZoJdv5c4RsprtnkP2-_jeKx6U6AAD3KM0pVDaSKuYojiYJ0Kamm3ttltY9FFIs5cN5_7iLtROR2Z4WoELsKiTOsyZ79evQ_O_7EcSjJjucoXj4RdEVYTy3s3nWVaQFCQx1UtYhYVEUszgF4YwUu0_UEcA1jnAUfbeCfWWF-zTxjUGFTjTw0dKgUMO57Dj7Ejwc8oSYyiIERBbzZE3BBGCD8uH2qhgIoeSytEFzzlAONDv9Rmn6IITYyHjvgWm02Bmc55ZV6kkvtATYzSTLv6q_ejVR4LaW4OLSSq7PW-EKvGD_t0LMEYqf0cf8gF8ZrvWRyss",
                                                "Accept": "application/json"
                                            }
                                        })
                                            .then(res => res.json())
                                            .then(result => {
                                                console.log(result)
                                                if (result.errorCode) {
                                                    Alert.alert(translations.FAILED, result.message)
                                                } else {
                                                    onSubmit()
                                                }
                                            })
                                            .catch(err => {
                                                console.log(err)
                                            })
                                    }
                                    } transparent style={[{ backgroundColor: 'transparent', }]} full rounded >
                                        <Text style={{ color: '#fff', alignSelf: 'center' }}>
                                            {translations.GO}
                                        </Text>
                                    </Button>
                                </LinearGradient>
                                :
                                <ActivityIndicator size="large" color="" />
                            }
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>


            {/* </ImageBackground> */}
        </View>
    )
}

const mapStateToProps = state => {
    return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        filterParam: state.user.filterParam,
    };
};

const mapDispatchToProps = {
    filterSchedule, removeParams, createSchedule, getSchedule
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateSchedule);