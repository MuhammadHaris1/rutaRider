import React, { Component } from 'react';
import {
    Dimensions,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Share,
    Image,
    Modal, Alert, ScrollView, Linking, AsyncStorage, PermissionsAndroid, ActivityIndicator,
} from 'react-native';
import MapView ,{
    MAP_TYPES,
    PROVIDER_DEFAULT,
    ProviderPropType,
    PROVIDER_GOOGLE,
    UrlTile, MarkerAnimated
  }  from 'react-native-maps';
import {SearchBar, Header, Avatar, Rating, AirbnbRating, CheckBox} from 'react-native-elements'
import {getDistance, getPreciseDistance} from 'geolib';
import { Item, Input } from 'native-base'
// const GOOGLE_PLACES_API_KEY = 'AIzaSyA2J_Jl0o3MN_QfkZ55BnF128lpTzO6CxY'; // never save your real api key in a snack!

import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import FooterComponent from '../Footer/footer'
const leftArrow = require('../../../../../assets/left-arrow.png')
const share = require('../../../../../assets/share.png')
const location = require('../../../../../assets/location.png')
const GOOGLE_MAPS_APIKEY = 'AIzaSyChHCc-8IkHyZIeHzhGomiY7sBo3fLlzak';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import CountDown from 'react-native-countdown-component';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const phone = require('../../../../../assets/phone.png')
const whatsapp = require('../../../../../assets/whatsapp.png')
const car = require('../../../../../assets/car.png')


import Pusher from 'pusher-js/react-native';
import pusherConfig from '../../../../Constant/pusher.json'

import { connect } from 'react-redux';
import { acceptRide, startRide, compeleteRide, getHistory, getUserDetail, setRideDataToAsync, sendLiveLocation, updateRide, getPaymentDetails, giveRating} from '../../.././../Redux/Actions/userAction'
import RenderParcelRequest from '../Modals/renderParcelRide';
import downloadfile from '../Constants/downloadfile';
import { LocalizationContext } from '../../../../Localization/LocalizationContext';
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedlocation: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.0001,
                longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
            },
            locationChosen: false,
            address:'',
            searchLocation: false,
            coordinates: [],
            rideReq: false,
            duration: '',
            rideDetail: false,
            rideReqDetails: '',
            rideUserDetails: null,
            status: 'pending',
            ratingRender:  false,
            ratingDescription: '',
            ratingCount: 1,
            parcelReq: false,
            agreement: false
        }


        this.pusher = new Pusher(pusherConfig.key, pusherConfig);
        console.log("puseher", props.screenProps.profileData.data.id)
        this.userChannel = this.pusher.subscribe(props.screenProps.profileData.data.id)
        this.userChannel.bind('new-booking', (e) => {
                console.log("NEW BOOKING", e)
                this.handleRideRequest(e)
        })
        this.userChannel.bind('ride-accepted', (e) => {
            console.log("NEW ride-accepted'", e)
            this.removeAlert(e)
        })

        this.userChannel.bind('live-location', (e) => {
            // console.log('live-location', e)
            this.locationChanged(e)
        })

        this.userChannel.bind('extend-booking', (e) => {
            console.log('extend-booking', e)
            this.handleExtendBooking(e)
        })
    }


    locationChanged = (location) => {
        console.log("{latitude: Number(location.latitude), longitude: Number(location.longitude)},500", {latitude: Number(location.latitude), longitude: Number(location.longitude)},500)
        this.riderMarker.animateMarkerToCoordinate({latitude: Number(location.latitude), longitude: Number(location.longitude)},500);
    }


    handleExtendBooking = async (e) => {
        const {updateRide, activeRideData} = this.props
        const { coordinates } = this.state
        var obj = {
            latitude: Number(e.drop_latitude),
            longitude: Number(e.drop_longitude)
        }
        activeRideData.coordinate[1] = obj
        activeRideData.rideReqDetails.drop_latitude = Number(e.drop_latitude)
        activeRideData.rideReqDetails.drop_longitude = Number(e.drop_longitude)
        updateRide(activeRideData)
        try {
            await AsyncStorage.setItem('activeRide', JSON.stringify(activeRideData));
            console.log("SET SUCCESFULLY")
          } catch (error) {           
            console.log('error =>', error)
        }
        coordinates[1] = obj
        this.setState({
            coordinates
        })
        
    }


    componentDidMount = async () => {
        const {reqDetailParam} = this.props.navigation.state.params
        const { activeRideData, setRideDataToAsync } = this.props
        var activeRide = await AsyncStorage.getItem('activeRide')
        this.watchPosition()
        // console.log("activeRideData", activeRideData, " activeRide ", JSON.parse(activeRide))
        

        if(reqDetailParam) {
            this.handleRideRequest(reqDetailParam)
        }
       
        if(activeRide){
            var convertVal = JSON.parse(activeRide)
            setRideDataToAsync(convertVal)
            this.setState({
                coordinates: convertVal.coordinate
            })
    
        }else{

            if(activeRideData) {
                this.setState({
                    coordinates: activeRideData.coordinate
                })
    
            }else {
                this.getLocationHandler();
            }

        }
        
    }


    removeAlert = ( ) => {
        this.setState({
            rideReq: false
        })

    }




    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedlocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        });
        this.setState(prevState => {
            return {
                focusedlocation: {
                    ...prevState.focusedlocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                coordinates: [
                    ...prevState.coordinates,
                    {
                        latitude: coords.latitude,
                        longitude: coords.longitude
                      },
                ],
                locationChosen: true
            };
        });
    }

    getLocationHandler = async () => {

        Geolocation.getCurrentPosition(pos => {
            console.log('POSITION POSITION', pos)
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvent);
        },
            err => {
                console.log('POSITION POSITION',err);
                alert("Fetching the position failed, please enable GPS manually!");
            })
    }


    watchPosition = async() => {

        const {coordinates} = this.state
        const { sendLiveLocation, activeRideData } = this.props

        var activeRide = await AsyncStorage.getItem('activeRide')
        // console.log("POsition activeRide", activeRide , "activeRideData ",  activeRideData)




        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Ruta App Location Permission",
                    message:
                        "Ruta App needs access to your location " +
                        "so you can find your ride.",
                    // buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the Location");

                Geolocation.watchPosition((position) => {
                    console.log("POsition watch", position)

                    
        
                      if(activeRide){

                        // this.riderMarker.animateMarkerToCoordinate(
                        //     { latitude: Number(position.coords.latitude), longitude: Number(position.coords.longitude) },
                        //     500
                        //    );
            
                        coordinates[0] = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                          }
                          this.setState((
                              coordinates
                          ))


                        var convertVal = JSON.parse(activeRide)
                        // console.log("POsition activeRide", typeof convertVal, "activeRideData ", typeof activeRideData)
        
                        var data = new FormData();
                        data.append('action', 'liveLocation');
                        data.append('user_id', convertVal.rideReqDetails.user_id);
                        data.append('longitude', position.coords.latitude);
                        data.append('latitude', position.coords.longitude);
                        data.append('booking_id', convertVal.rideReqDetails.booking_id);
                        data.append('rider_id', this.props.userDetails.data.id);

                        sendLiveLocation(data)
                        console.log("CALL activeRide")


                        
                
                        }else{
                
                            if(activeRideData) {

                                // this.riderMarker.animateMarkerToCoordinate(
                                //     { latitude: Number(position.coords.latitude), longitude: Number(position.coords.longitude) },
                                //     500
                                //    );
                    
                                coordinates[0] = {
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude
                                  }
                                  this.setState((
                                      coordinates
                                  ))



                                console.log("POsition activeRide", typeof JSON.parse(activeRide) , "activeRideData ", typeof activeRideData)
        
                                var data = new FormData();
                                data.append('action', 'liveLocation');
                                data.append('user_id', activeRideData.rideReqDetails.user_id);
                                data.append('longitude', position.coords.latitude);
                                data.append('latitude', position.coords.longitude);
                                data.append('booking_id', activeRideData.rideReqDetails.booking_id);
                                data.append('rider_id', this.props.userDetails.data.id);

                                sendLiveLocation(data)
                                console.log("CALL activeRideData")
                                
                            }else {
                                // this.getLocationHandler();
                                console.log("CALL ELSE")
                            }
                
                        }
        
                    
                },
                err => {
                    console.log(err);
                    alert("Watching the position failed", err);
                },
                { distanceFilter: 0})
                
            } else {
                console.log("location permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
        

        
    }


    onDone = () => {
        const {setLocation} = this.props.navigation.state.params
        const {focusedlocation} = this.state
        // console.log('setLocation', setLocation)
        var coords = {
            latitude  : focusedlocation.latitude,
            longitude  : focusedlocation.longitude,
            latitudeDelta  : focusedlocation.latitudeDelta,
            longitudeDelta  : focusedlocation.longitudeDelta,

        }
        setLocation(coords);
        this.props.navigation.navigate('OrderForm')
    }



    serachLoc = (e) => {
        // this.tracker()
        const { focusedlocation, PickerValue } = this.state
        var searchTerm = e
        this.setState({ address: searchTerm })

        fetch(`https://api.foursquare.com/v2/venues/search?client_id=ZJWQ050MTAJAQVAU2GHBN2WI3EIJJ1ZKNNBWTF1CYLVKKRA0&client_secret=NNAT41FP4ZLRDDE2QPNVMNAS4GFKICS5R0Z2DQ4MKFEW1SVT&v=20180323&ll=${focusedlocation.latitude},${focusedlocation.longitude}&query=${searchTerm}&limit=5`)
            .then(response => response.json())
            .then(data => {
                // console.log("data.response data.response data.response data.response", data.response)
                searchTerm !== '' ?
                    (this.setState({
                        searchLocation: data.response.venues,
                    })) :
                    (this.setState({
                        searchLocation: null,
    
                    }))
            })
            .catch(err => console.log(err))
    }

    // get mapType() {
    //     // MapKit does not support 'none' as a base map
    //     return this.props.provider === PROVIDER_DEFAULT
    //     ? MAP_TYPES.STANDARD
    //     : MAP_TYPES.NONE;
    // }

    onShare = async () => {
        const { coordinates } = this.state
        try {
            const result = await Share.share({
              message: `https://maps.google.com?q=${coordinates[0].latitude},${coordinates[0].longitude},16z`,
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error) {
            alert(error.message);
          }
    }






    //RIDER REQUEST WORK


    handleRideRequest = (e) => {
        const { activeRideData } = this.props
        
        if( activeRideData ){
            this.setState({
                rideReq: false,
                rideReqDetails: e
            })
        }else {
            this.setState({
                rideReq: true,
                rideReqDetails: e
            })
        }
        
    }

    static contextType = LocalizationContext
    
    renderRideReq = () => {
        const { translations } = this.context
        const { rideReq, rideReqDetails, coordinates, agreement } = this.state
        const { acceptRide } = this.props
        console.log("coordinates coordinates", coordinates)
        return(
            <View style={{ flex: 1}}>
                    <Modal
                        transparent={true}
                        visible={rideReq}
                        onRequestClose={() => {this.setState({rideReq:!rideReq})}}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                            <View style={{backgroundColor:'rgb(35, 37, 50)', justifyContent:'center', alignContent:'center', padding:15, width:'100%', borderRadius:10}}>
                               <ScrollView> 
                                <View>
                                    <CountDown
                                        size={30}
                                        until={2000}
                                        onFinish={() => {
                                            Alert.alert("Alert", "Ride Expired")
                                            this.setState({rideReq: !rideReq})
                                            this.props.navigation.state.params.reqDetailParam = null
                                        }}
                                        digitStyle={{backgroundColor: 'transparent',}}
                                        digitTxtStyle={{color: '#1CC625', 
                                        // fontFamily: 'digital'
                                    }}
                                        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                                        separatorStyle={{color: '#1CC625'}}
                                        timeToShow={['M','S']}
                                        timeLabels={{m: null, s: null}}
                                        showSeparator
                                    />
                                </View>


                                <View style={{flexDirection:'row', justifyContent:'space-around', width:"100%", padding: 5, marginTop: 10,}}>
                                    <Text style={{color:'#fff', width:'15%'}}>
                                        {translations.FROM} :
                                    </Text>

                                    <Text style={{color:'#fff', width:'75%', textAlign:'right'}}>
                                        {rideReqDetails ? rideReqDetails.pick_location_name: 'Fetching address Error'}
                                    </Text>
                                </View>

                               
                                <View style={{flexDirection:'row', justifyContent:'space-around', backgroundColor:'transparent', width:"100%", padding: 5, marginTop: 10}}>
                                    <Text style={{color:'#fff', width:'15%'}}>
                                        {translations.TO} :
                                    </Text>

                                    <Text style={{color:'#fff', width:'75%', textAlign:'right'}}>
                                        {rideReqDetails ? rideReqDetails.drop_location_name: 'Fetching address Error'}

                                    </Text>
                                </View>

                               {rideReqDetails && 
                                <View>
                                    {
                                        rideReqDetails.bookingType == "object" &&
                                        <View>
                                            <View style={{flexDirection:'row', justifyContent:'space-around', width:"100%", padding: 5, marginTop: 10,}}>
                                                <Text style={{color:'#fff', width:'40%', left: 10}}>
                                                    Object Name :
                                                </Text>

                                                <Text style={{color:'#fff', width:'65%', textAlign: 'right'}}>
                                                    {rideReqDetails ? rideReqDetails.obj_name: 'Fetching Name Error'}
                                                </Text>
                                            </View>

                                            <View style={{flexDirection:'row', justifyContent:'space-around', width:"100%", padding: 5, marginTop: 10,}}>
                                                <Text style={{color:'#fff', width:'40%', left: 10}}>
                                                    Object Value :
                                                </Text>

                                                <Text style={{color:'#fff', width:'65%', textAlign: 'right'}}>
                                                    {rideReqDetails ? rideReqDetails.obj_value: 'Fetching Value Error'}
                                                </Text>
                                            </View>

                                            <View style={{flexDirection:'row', justifyContent:'space-around', width:"100%", padding: 5, marginTop: 10,}}>
                                                <Text style={{color:'#fff', width:'40%', left: 10}}>
                                                    Object Weight :
                                                </Text>

                                                <Text style={{color:'#fff', width:'65%', textAlign: 'right'}}>
                                                    {rideReqDetails ? rideReqDetails.obj_weight: 'Fetching Recipient Number Error'}
                                                </Text>
                                            </View>

                                            <View style={{flexDirection:'row', justifyContent:'space-around', width:"100%", padding: 5, marginTop: 10,}}>
                                                <Text style={{color:'#fff', width:'40%', left: 10}}>
                                                    Recipient Name :
                                                </Text>

                                                <Text style={{color:'#fff', width:'65%', textAlign: 'right'}}>
                                                    {rideReqDetails ? rideReqDetails.recipient_name: 'Fetching Recipient Name Error'}
                                                </Text>
                                            </View>

                                            <View style={{flexDirection:'row', justifyContent:'space-around', width:"100%", padding: 5, marginTop: 10,}}>
                                                <Text style={{color:'#fff', width:'40%', left: 10}}>
                                                    Recipient Number :
                                                </Text>

                                                <Text style={{color:'#fff', width:'65%', textAlign: 'right'}}>
                                                    {rideReqDetails ? rideReqDetails.recipient_number: 'Fetching Recipient Number Error'}
                                                </Text>
                                            </View>


                                            <View style={{flexDirection:'row', justifyContent:'flex-start', padding: 5, marginTop: 10,}}>
                                                <CheckBox checked={agreement} onPress={() => this.setState({agreement: !agreement})} />
                                                <TouchableOpacity onPress={() => {
                                                    downloadfile('https://hnh6.xyz/route/public/pdf/agreement.pdf')
                                                    // Alert.alert("Alert", "agreement")
                                                }}>
                                                    <Text style={{color:'#3A91FA', paddingVertical: '5%'}}>
                                                        I Agree to the ruta Terms & Condition
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }
                                </View>}
                                

                                
                                <TouchableOpacity onPress={() => {

                                    if(rideReqDetails.bookingType == "object"){
                                        if(agreement){
                                            var data = new FormData();
                                            data.append('action', 'removeAlert');
                                            data.append('rider_id', this.props.userDetails.data.id);
                                            data.append('booking_id', rideReqDetails.booking_id);
                                            data.append('rider_latitude', this.state.coordinates[0].latitude);
                                            data.append('rider_longitude', this.state.coordinates[0].longitude);
                                            data.append('rider_location_name', 'DHA');
        
                                            acceptRide(data, rideReqDetails, this.state.coordinates[0])
                                            .then(async (res) => {
                                                if(res.status){
                                                    this.setState(prevState => {
                                                        return {
                                                            coordinates: [
                                                                ...prevState.coordinates,
                                                                {
                                                                    latitude: Number(rideReqDetails.pick_latitude),
                                                                    longitude: Number(rideReqDetails.pick_longitude)
                                                                  },
                                                            ],
                                                            rideReq: false,
                                                            rideDetail: true,
                                                            agreement: false,
                                                            rideUserDetails: res.userData
                                                        };
                                                    })
                                                    console.log("RESPONSE MAP FILE", res)
        
        
                                                    this.props.navigation.state.params.reqDetailParam = null
                                                }else {
                                                    Alert.alert("Alert", res.message)
                                                    this.props.navigation.state.params.reqDetailParam = null
        
                                                }
                                            })
        
                                        }else {
                                            Alert.alert("Alert", "Please first accept our terms")
                                        }
                                    }else {

                                        var data = new FormData();
                                            data.append('action', 'removeAlert');
                                            data.append('rider_id', this.props.userDetails.data.id);
                                            data.append('booking_id', rideReqDetails.booking_id);
                                            data.append('rider_latitude', this.state.coordinates[0].latitude);
                                            data.append('rider_longitude', this.state.coordinates[0].longitude);
                                            data.append('rider_location_name', 'DHA');
        
                                            acceptRide(data, rideReqDetails, this.state.coordinates[0])
                                            .then(async (res) => {
                                                if(res.status){
                                                    this.setState(prevState => {
                                                        return {
                                                            // focusedlocation: {
                                                            //     ...prevState.focusedlocation,
                                                            //     latitude: Number(rideReqDetails.pick_latitude),
                                                            //     longitude: Number(rideReqDetails.pick_longitude)
                                                            // },
                                                            coordinates: [
                                                                ...prevState.coordinates,
                                                                {
                                                                    latitude: Number(rideReqDetails.pick_latitude),
                                                                    longitude: Number(rideReqDetails.pick_longitude)
                                                                  },
                                                            ],
                                                            rideReq: false,
                                                            rideDetail: true,
                                                            rideUserDetails: res.userData
                                                        };
                                                    })
                                                    console.log("RESPONSE MAP FILE", res)
        
        
                                                    this.props.navigation.state.params.reqDetailParam = null
                                                }else {
                                                    Alert.alert("Alert", res.message)
                                                    this.props.navigation.state.params.reqDetailParam = null
        
                                                }
                                            })
                                        
                                    }
                                    
                                }} style={{backgroundColor:'#3A91FA', width:'60%', alignSelf:'center', flexDirection:'row',  justifyContent:'space-around', padding: 10, borderRadius: 20, marginTop: 20}}>
                                    <Text style={{color:'#fff' ,}}>{translations.ACCEPT}</Text>
                                </TouchableOpacity>

                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                </View>
        )
    }








    renderRideDetails = () => {
        const { rideDetail,  rideUserDetails, rideReqDetails} = this.state
        const { activeRideData } = this.props
        // console.log(' rideUserDetails rideUserDetails', rideUserDetails, activeRideData)

        return (
            <View style={{ flex: 1, backgroundColor:'rgb(41, 46, 66)', position: 'absolute', top: 0, bottom: 0,left: 0, right: 0, height:'100%' }}>
                    <Modal
                        transparent={true}
                        visible={rideDetail}
                        onRequestClose={() => {this.setState({rideDetail:!rideDetail})}}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <ScrollView>
                           
                            <View style={{backgroundColor:'rgb(41, 46, 66)', padding:15, width:'100%', height: height }}>

                                    <View style={{flexDirection:'row', marginVertical: 15 }}>
                                        <TouchableOpacity onPress={() => {this.setState({rideDetail:!rideDetail})}} style={{width:'25%'}}>
                                            <Text style={{backgroundColor:'red', borderRadius: 100, height:20, width: 20, textAlign:'center', color:'#fff'}}>X</Text>
                                        </TouchableOpacity>

                                        <View>
                                            <Text style={{textAlign:'center', color:'#fff', fontSize: 25, bottom: 7}}>Ride Details</Text>
                                        </View>
                                    </View>


                                    <View style={{marginRight: 30}}>
                                            <View style={{alignItems:'center', borderBottomColor:'#fff',}}>
                                                
                                                <Avatar
                                                size="xlarge" 
                                                rounded
                                                containerStyle={{borderWidth: 15, borderColor:'#fff',}}
                                                source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGkKTkKnqZE23RyW0_npSDjVKIVg_uLRmZbw&usqp=CAU'}}
                                                />

                                                <View style={{ alignItems:'center', marginVertical: 10 }}>
                                                    <Text style={{fontSize: 23, color:'#fff'}}> {rideUserDetails  ? rideUserDetails.first_name + " " + rideUserDetails.last_name : 'John Doe'}</Text>
                                                </View>
                                            </View>


                                            <View style={{flexDirection:'row', justifyContent:'space-around', width:"100%", padding: 5, marginTop: 10,}}>
                                                
                                                <TouchableOpacity onPress={() =>{
                                                    Linking.openURL(rideUserDetails ? `tel:${rideUserDetails.ph_number}` : `tel:${activeRideData.userData.ph_number}`)
                                                }} style={{height: 50, width: 50, borderRadius: 100, backgroundColor:'#3A91FA', alignItems:'center'}}>
                                                    <Image source={phone} style={{height: 35, width: 35, top: 5}} />
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() =>{
                                                    Linking.openURL(`whatsapp://send?text=hello&phone=${activeRideData.userData.ph_number}`)
                                                }} style={{height: 50, width: 50, borderRadius: 100, backgroundColor:'#3A91FA', alignItems:'center'}}>
                                                    <Image source={whatsapp} style={{height: 35, width: 35, top: 5}} />
                                                </TouchableOpacity>
                                            </View>


                                            <View style={{flexDirection:'row', justifyContent:'space-around', backgroundColor:'#3A91FA', width:"100%", padding: 5, marginTop: 10, right: 10}}>
                                                <Text style={{color:'#fff', width:'40%', textAlign:'center'}}>
                                                    Pickup Location
                                                </Text>

                                                <Text style={{color:'#fff', width:'40%', textAlign:'center'}}>
                                                    {rideReqDetails ? rideReqDetails.pick_location_name: 'Garden Super Market'}
                                                </Text>
                                            </View>

                                            <View style={{flexDirection:'row', justifyContent:'space-around', backgroundColor:'transparent', width:"100%", padding: 5, marginTop: 10}}>
                                                <Text style={{color:'#fff', width:'40%', textAlign:'center'}}>
                                                    DropOff Location
                                                </Text>

                                                <Text style={{color:'#fff', width:'40%', textAlign:'center'}}>
                                                    {rideReqDetails ? rideReqDetails.drop_location_name: 'Nazimabad'}

                                                </Text>
                                            </View>

                    
                                    </View>




                            </View>
 
                            </ScrollView>   
                         
                        </View>
                    </Modal>
            </View>
        )
    }





    startRide = async () => {
        const { coordinates } = this.state
        const { activeRideData , userDetails, startRide, updateRide} = this.props
        var activeRide = await AsyncStorage.getItem('activeRide')

        // console.log('activeRideData', activeRideData, 'CURRENT LOCATION', coordinates[0])
        var data = new FormData();
        data.append('action', 'rideStart');
        // data.append('latitude', coordinates[0].latitude);
        // data.append('longitude', coordinates[0].longitude);
        // data.append('user_id', userDetails.data.id);
        if(activeRideData){
            data.append('booking_id', activeRideData.rideReqDetails.booking_id);
        }else {
            data.append('booking_id', JSON.parse(activeRide).rideReqDetails.booking_id);
        }
        // data.append('name', 'Testing location');

        startRide(data, activeRideData)
        .then(async (res) => {
            if(activeRideData){
                var obj = {
                    latitude: Number(activeRideData.rideReqDetails.drop_latitude),
                    longitude: Number(activeRideData.rideReqDetails.drop_longitude)
                  }
            }else {
                var obj = {
                    latitude: Number(JSON.parse(activeRide).rideReqDetails.drop_latitude),
                    longitude: Number(JSON.parse(activeRide).rideReqDetails.drop_longitude)
                  }
            }
            // coordinates[1] = obj

            
            coordinates.splice(1, 1, obj)
            activeRideData.coordinate[1] = obj
            updateRide(activeRideData)
            try {
                await AsyncStorage.setItem('activeRide', JSON.stringify(activeRideData));
                console.log("SET SUCCESFULLY")
            } catch (error) {           
                console.log('error =>', error)
            }
            
            this.setState({
                abc:'',
                coordinates
            })
        })


    }



    comeleteRide = () => {
        const { coordinates } = this.state
        const { activeRideData , userDetails, compeleteRide, getHistory, getUserDetail} = this.props;
        var dis = getDistance(
            {latitude: activeRideData.rideReqDetails.pick_latitude, longitude: activeRideData.rideReqDetails.pick_longitude},
            coordinates[0],
          );
        var disKm = dis/1000
        // Alert.alert("alert", `Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`);
        var FormData = require('form-data');
        var data = new FormData();
        data.append('action', 'rideCompleted');
        data.append('booking_id', activeRideData.rideReqDetails.booking_id);
        data.append('pick_longitude', activeRideData.rideReqDetails.pick_latitude);
        data.append('pick_latitude', activeRideData.rideReqDetails.pick_longitude);
        data.append('drop_longitude', activeRideData.rideReqDetails.drop_latitude);
        data.append('drop_latitude', activeRideData.rideReqDetails.drop_longitude);
        data.append('km', Number(disKm));
        console.log('FormData FormData', data)
        
        compeleteRide(data)
        .then((res) => {
            getHistory(userDetails.data.id)
            getUserDetail(userDetails.data.id)
            getPaymentDetails(userDetails.data.id)
            this.setState({
                rideReqDetails: '',
                ideUserDetails: null,
                coordinates: [coordinates[0]],
                ratingRender: false,
                ratingCount: 0,
                ratingDescription:''
            })
        })
        .catch((err) => {
            console.log("ERR ERR", err)
        })
    }


    renderRating = () => {
        const { translations } = this.context
        const { ratingRender, ratingCount, ratingDescription } = this.state
        const {fetching, giveRating, activeRideData , userDetails,  } = this.props
        return(
            <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0,left: 0, right: 0 }}>
                <Modal
                    transparent={true}
                    visible={ratingRender}
                    onRequestClose={() => {this.setState({ratingRender:!ratingRender})}}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                            <View style={{backgroundColor:'rgb(35, 37, 50)', justifyContent:'center', alignContent:'center', padding:15, width:'85%', borderRadius:10}}>
                                <View style={{alignSelf:'center', width:'100%'}}>
                                    <Text style={{fontWeight:'bold', fontSize: 18, color:'#fff', textAlign:'center'}}>Rating</Text>

                                    <AirbnbRating
                                        defaultRating={ratingCount}
                                        count={5}
                                        onFinishRating={(rating) => this.setState({ratingCount: rating})}
                                        size={20}
                                        />
                                    
                                    <View style={{alignSelf:'center'}}> 
                                        <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                            <Input
                                            value={this.state.ratingDescription}
                                            style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => {
                                                if(e.length <= 30 ) {
                                                    this.setState({ ratingDescription: e }) 
                                                }else {
                                                    Alert.alert("Alert", "You Reached Review limit")
                                                }
                                            }} placeholder='Enter Your Review' />
                                        </Item>
                                        <Text style={{color:'red', textAlign:'right'}}>{translations.MAX_30_LETTERS}, {30 - this.state.ratingDescription.length} {translations.REMAINING} 
                                        </Text>
                                    </View>


                                    {!fetching ? 
                                    <TouchableOpacity
                                    onPress={() => {
                                        const data = new FormData()
                                        data.append('riderId', userDetails.data.id);
                                        data.append('booking_id', activeRideData.rideReqDetails.booking_id);
                                        data.append('rating', ratingCount);
                                        data.append('review', ratingDescription);
                                        data.append('action', 'addRating');
                                        giveRating(data)
                                        .then(res => {
                                            this.comeleteRide()
                                        })
                                        .catch((err) =>{
                                            console.log("error", err)
                                        })
                                    }}
                                    style={{backgroundColor:'#3A91FA', width:'60%', alignSelf:'center', flexDirection:'row',  justifyContent:'space-around', padding: 10, borderRadius: 20, marginTop: 20}}>
                                        <Text style={{color:'#fff' ,}}>{translations.SEND_FEEDBACK}</Text>
                                    </TouchableOpacity> 
                                    :
                                    <ActivityIndicator color="#3A91FA" />
                                    }
                                    

                                </View>

                            </View>
                    </View>
                </Modal>
            </View>

        )
    }

 
    render() {
        const { translations } = this.context
        console.log("coordinates", this.state.coordinates)
        const { activeRideData } = this.props
        let marker = null;
        const { parcelReq } = this.state;
        if (this.state.coordinates.length >= 1) {
            marker = this.state.coordinates.map((coordinate, index) =>
                {
                    if(index == 0) {
                        return <MarkerAnimated flat={true} ref={(ref) => this.riderMarker = ref}  image={car} title={'Start'} key={`coordinate_${index}`} coordinate={coordinate} />
                    }else if (index == 1) {
                       return <MapView.Marker  title={'End'} key={`coordinate_${index}`} coordinate={coordinate} />
                    }
                }
              )

        }

        return(
            <View style={{flex: 1}} >

                {this.renderRideReq()}
                {this.renderRideDetails()}
                {this.renderRating()}
                <RenderParcelRequest parcelReq={parcelReq}/>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        // mapType={this.mapType}
                        style={{height: "95%", width:'100%', top: 0 , position:'absolute'}} 
                        initialRegion={this.state.focusedlocation}
                        // onPress={this.pickLocationHandler}
                        ref={ref => this.map = ref}
                        >
                        {/* <UrlTile
                            urlTemplate="http://b.tile.stamen.com/terrain/{z}/{x}/{y}.png"
                            zIndex={-1}
                        /> */}
                        {marker}
                        {(this.state.coordinates.length >= 2) && (
                <MapViewDirections
                    origin={this.state.coordinates[0]}
                    waypoints={ (this.state.coordinates.length >= 2) ? this.state.coordinates.slice(1, -1): null}
                    // waypoints={this.state.coordinates}
                    destination={this.state.coordinates[this.state.coordinates.length-1]}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor={"#2E2F41"}
                    optimizeWaypoints={true}
                    onStart={(params) => {
                    console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                    }}
                    onReady={result => {
                    // console.log("RESULT", result)
                    this.setState({duration: result.duration})
                    console.log(`Distance: ${result.distance} km`)
                    console.log(`Duration: ${result.duration} min.`)

                    this.map.fitToCoordinates(result.coordinates, {
                        edgePadding: {
                        right: (width / 20),
                        bottom: (height / 20),
                        left: (width / 20),
                        top: (height / 5),
                        }
                    });
                    }}
                    onError={(errorMessage) => {
                    console.log('GOT AN ERROR', errorMessage);
                    }}
                />
        )}
                    </MapView>
                 <Header  
                            containerStyle={{backgroundColor:'transparent', borderBottomWidth: 0, position:'absolute', marginTop: 0, width:'100%'}}
                            leftComponent={
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Image source={leftArrow} style={{height: 30, width:30}} />
                            </TouchableOpacity>
                            }
                            rightComponent={
                                <TouchableOpacity onPress={() => this.onShare()}>
                                    <Image source={share} style={{height: 30, width:30}} />
                                </TouchableOpacity>
                            }
                            />

                {               
                    activeRideData && (activeRideData.status == "pending" ? 
                    <TouchableOpacity onPress={() =>  this.startRide()} style={{backgroundColor:'#232532',  position:'absolute', bottom:50, width:'100%', paddingVertical: 15}}>
                        <Text style={{color:'#fff', fontWeight:'bold', textAlign:'center', bottom: 10}}>START</Text> 
                    </TouchableOpacity>

                    :

                    <TouchableOpacity onPress={() => {
                        this.setState({
                            ratingRender: true
                        })
                        }} style={{backgroundColor:'#232532',  position:'absolute', bottom:40, width:'100%', paddingVertical: 15}}>
                        <Text style={{color:'#fff', fontWeight:'bold', textAlign:'center', bottom: 10}}>COMPELETE</Text> 
                    </TouchableOpacity>
                    )
                }
                
                <FooterComponent goto={(e) => this.props.navigation.navigate(e,  {
                    reqDetailParam: false 
                })} active={"location"}  />
                
            </View>
        )
    }

}

Map.propTypes = {
    provider: ProviderPropType,
  };

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})

const mapStateToProps = state => {
    return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        activeRideData: state.user.activeRideData,

    };
};

const mapDispatchToProps = {
    acceptRide, startRide, compeleteRide, getHistory, getUserDetail, setRideDataToAsync, sendLiveLocation, updateRide, getPaymentDetails, giveRating
};


export default connect(mapStateToProps, mapDispatchToProps)(Map);


