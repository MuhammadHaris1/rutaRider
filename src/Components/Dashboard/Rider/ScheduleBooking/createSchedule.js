import { Button, Input, Item, Label } from 'native-base'
import React, { createRef, useEffect, useRef, useState } from 'react'
import { View, Text, Image, ImageBackground , ActivityIndicator, Dimensions, Alert} from 'react-native'
import { HeaderCustom } from '../Constants/Header'
import { SearchLocation } from '../Constants/locationSearch'
import { styles } from './scheduleStyling'
import { filterSchedule, removeParams, createSchedule, getSchedule } from '../../../../Redux/Actions/userAction'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { connect } from 'react-redux'
import MapView, { MarkerAnimated } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import Geolocation from '@react-native-community/geolocation'
import LinearGradient from 'react-native-linear-gradient'
import { ScrollView } from 'react-native-gesture-handler'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
const GOOGLE_MAPS_APIKEY = 'AIzaSyChHCc-8IkHyZIeHzhGomiY7sBo3fLlzak';



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
    // const [mapRef, setMapRef] = useState(null)

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
               props.navigation.goBack()
               console.log(" onSubmit res", res)
           })       
           .catch((err) => {
            Alert.alert("Alert", err.message)
           })
    }






    
    const marker = () => {
        console.log("fromCordinate && toCordinate", fromCordinate , toCordinate)
        if (fromCordinate && toCordinate) {
            [fromCordinate, toCordinate].map((coordinate, index) => {
                if (index == 0) {
                    return <MarkerAnimated  title={'Start'} key={`coordinate_${index}`} coordinate={fromCordinate} />
                } else if (index == 1) {
                    return <MarkerAnimated  title={'Rider'} coordinate={toCordinate} />
                }
        })
        }else {
            return (null)
        }
                        
    }
    
    const coordinates = [fromCordinate , toCordinate]
    console.log(" coordinates", coordinates)
    
    return(
        <View style={{flex:1,
        //  backgroundColor:"#292E42"
         }}>
            {<SearchLocation visible={visible} closed={onClosed} onSelect={onSelect} />}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={mode}
                onConfirm={handleConfirm}
                // onChange={(e) => console.log("e e e", e)}
                onCancel={hideDatePicker}
            />
            
               <MapView
                    style={{ height: heightPercentageToDP(65), width: '100%', position: 'absolute', top: 0 }}
                    initialRegion={focusedlocation}
                    // ref={e => setMapRef(e)}
                    ref={mapRef}
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
                            strokeColor={"#2E2F41"}
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
                style={{...styles.container, marginTop: heightPercentageToDP(60)}}>

                    <ScrollView>
                    <View style={[styles.container, styles.row]}>
                        <View style={{width: '70%'}}>
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
                            <View style={styles.itemContainer, {width:'95%', alignSelf:'center'}}>
                                <Item fixedLabel style={{width:'90%', alignSelf:'center'}}>
                                        <Input 
                                        onTouchStart={() => {
                                            setVisible(true);
                                            setType('from');
                                        }}
                                        onFocus={() => {
                                            setVisible(true);
                                            setType('from');
                                        }}  
                                        style={styles.whiteNormalTxt}
                                        value={fromAddress} placeholder="From" placeholderTextColor="#fff"/>
                                </Item>
                            </View>

                            <View style={styles.itemContainer, {width:'95%', alignSelf:'center'}}>
                                <Item fixedLabel style={{width:'90%', alignSelf:'center'}}>
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
                                    <Text style={{fontSize: 17, color:'#fff'}}>$</Text>
                                    <Input 
                                    onChangeText={(e) => setPrice(e)}
                                    keyboardType="number-pad"
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

                        </View>

                    <View style={{...styles.itemContainer, width:'30%', justifyContent:'center'}}>
                        {!props.fetching ?
                            <LinearGradient style={{ borderRadius: 100, justifyContent:'center', width:'100%', alignSelf:'center', marginVertical: 20}} colors={['#91D9F1', '#7AB1E0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                            <Button onPress={() => {
                                onSubmit()
                            }} transparent style={[{backgroundColor:'transparent',}]} full rounded>
                                <Text style={{color:'#fff', alignSelf:'center'}}>
                                    {/* Create Schedule */}
                                    Go
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