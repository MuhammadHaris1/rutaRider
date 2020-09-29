import React, { Component } from 'react';
import {
    Dimensions,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Share,
    Image,
    Modal,
} from 'react-native';
import MapView ,{
    MAP_TYPES,
    PROVIDER_DEFAULT,
    ProviderPropType,
    UrlTile,
  }  from 'react-native-maps';
import { Item, Input, Label, Button } from 'native-base';
import {SearchBar, Header} from 'react-native-elements'
// const GOOGLE_PLACES_API_KEY = 'AIzaSyA2J_Jl0o3MN_QfkZ55BnF128lpTzO6CxY'; // never save your real api key in a snack!
import { connect } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import FooterComponent from '../../User/Footer/footer'
const back = require('../../../../../assets/back.png')
const leftArrow = require('../../../../../assets/left-arrow.png')
const share = require('../../../../../assets/share.png')
const location = require('../../../../../assets/location.png')
const GOOGLE_MAPS_APIKEY = 'AIzaSyChHCc-8IkHyZIeHzhGomiY7sBo3fLlzak';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
 
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedlocation: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
            },
            locationChosen: false,
            address:'',
            searchLocation: false,
            coordinates: [
                // {
                //   latitude: 24.884603,
                //   longitude: 67.0295403,
                // },
                {
                  latitude: 24.9912986,
                  longitude: 67.1322322,
                },
              ],
            rideclosed: false,
            additionalService: false,
            duration: ''
        }
    }


    componentDidMount() {
        const { additionalService } = this.state
        this.setState({additionalService:!additionalService})
        // this.getLocationHandler();
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

    getLocationHandler = () => {
        Geolocation.getCurrentPosition(pos => {
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
                console.log(err);
                alert("Fetching the position failed, please enable GPS manually!");
            })
    }


    onDone = () => {
        const {setLocation} = this.props.navigation.state.params
        const {focusedlocation} = this.state
        console.log('setLocation', setLocation)
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
        try {
            const result = await Share.share({
              message: 'https://www.facebook.com/thepetcollective/videos/2683396628583361/?sfnsn=scwspwa&extid=d9hyUnHck0IXyy3U&d=w&vh=e',
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
                console.log("shared activity", result)

              } else {
                // shared
                console.log("shared", result)
                // this.setState({rideclosed: true})

              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error) {
            alert(error.message);
          }
    }




    rideClosedModal = () => {
        const { rideclosed } = this.state
        return(
            <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0,left: 0, right: 0 }}>
                    <Modal
                        transparent={true}
                        visible={rideclosed}
                        onRequestClose={() => {this.setState({rideclosed:!rideclosed})}}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                            <View style={{backgroundColor:'rgb(35, 37, 50)', justifyContent:'center', alignContent:'center', padding:15, width:'85%', borderRadius:10}}>
                                <View style={{alignItems:'center'}}>
                                    <Text style={{color:'red', textAlign:'center', fontWeight:'bold', fontSize: 30}}>
                                        RIDE CLOSED
                                    </Text>
                                </View>
                                
                                <View style={{backgroundColor:'#3A91FA', width:'70%', alignSelf:'center', flexDirection:'row',  justifyContent:'space-around', padding: 10, borderRadius: 20, marginTop: 20}}>
                                    <Text style={{color:'#fff'}}>Paid</Text>
                                    <Text style={{color:'#fff'}}>$$</Text>
                                </View>

                                <TouchableOpacity onPress={() => this.setState({rideclosed: !this.state.rideclosed, additionalService: true})} style={{alignItems:'center', paddingVertical: 20}}>
                                    <Text style={{textAlign:'center', fontWeight:'bold', textDecorationLine:'underline', color:'#fff'}}>
                                        WANT ADDITIONAL SERVICE?
                                    </Text>
                                </TouchableOpacity>


                            </View>
                        </View>
                    </Modal>
                </View>
        )
    }





    additionalServicesModal = () => {
        const { additionalService } = this.state
        return(
            <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0,left: 0, right: 0 }}>
                    <Modal
                        transparent={true}
                        visible={additionalService}
                        onRequestClose={() => {this.setState({additionalService:!additionalService})}}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                            <View style={{backgroundColor:'rgb(35, 37, 50)', justifyContent:'center', alignContent:'center', padding:15, width:'85%', borderRadius:10}}>
                                <View style={{alignItems:'center'}}>
                                    <Text style={{color:'#fff', textAlign:'center', fontWeight:'bold', fontSize: 20}}>
                                    ADDITIONAL SERVICE
                                    </Text>
                                </View>

                                <View style={{alignItems:'center', paddingVertical: 5}}> 
                                <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                    <Input style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => this.setState({ email: e })} placeholder='from location' />
                                </Item>
                                </View>

                                <View style={{alignItems:'center', paddingVertical: 5}}> 
                                    <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                        <Input style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => this.setState({ email: e })} placeholder='to location' />
                                    </Item>
                                </View>
                                
                                

                                <View style={{alignItems:'center', paddingVertical: 20}}>
                                    <Text style={{textAlign:'center', fontWeight:'bold',color:'#fff'}}>
                                        Next Ride Charges $$?
                                    </Text>
                                </View>


                                <TouchableOpacity onPress={() => {
                                    this.getLocationHandler() 
                                    this.setState({additionalService:!additionalService})
                                }} style={{backgroundColor:'#3A91FA', width:'60%', alignSelf:'center', flexDirection:'row',  justifyContent:'space-around', padding: 10, borderRadius: 20, marginTop: 20}}>
                                    <Text style={{color:'#fff'}}>Go</Text>
                                </TouchableOpacity>


                            </View>
                        </View>
                    </Modal>
                </View>
        )
    }



 
    render() {
        // console.log("this.state.searchLocation", this.state.searchLocation )
        
        let marker = null;
        const { focusedlocation } = this.state;
        if (this.state.locationChosen) {
            marker = this.state.coordinates.map((coordinate, index) =>
                {
                    if(index == 0) {
                        return <MapView.Marker  title={'Start'} key={`coordinate_${index}`} coordinate={coordinate} />
                    }else if (index == 1) {
                       return <MapView.Marker  title={'End'} key={`coordinate_${index}`} coordinate={coordinate} />
                    }
                }
              )

        }

        return(
            <View style={{flex: 1}} >

                {this.rideClosedModal()}
                {this.additionalServicesModal()}
               
                    <MapView
                        // provider={this.props.provider}
                        // mapType={this.mapType}
                        style={{height: "83%", width:'100%'}} 
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
                <TouchableOpacity 
                // onPress={() => {this.setState({rideclosed: true})}} 
                style={{backgroundColor:'#232532', flexDirection:'row',  position:'absolute', bottom:40, width:'100%', paddingVertical: 15}}>
                    <View style={{bottom:10, alignItems:'center', alignContent:'center', justifyContent:'center'}}>
                        <Image source={location} style={{height:30, width:30}} />
                    </View>

                    <View style={{alignItems:'center', paddingHorizontal: 20, bottom:10,}}>
                            <Text style={{color:'#fff', fontWeight:'bold', textAlign:'center'}}>YOU ARE ON THE PATH TO YOUR GOAL</Text> 
                            <Text style={{color:'#fff', textAlign:'center'}}>RUN TIME IS {Math.round(this.state.duration)} MIN</Text>    
                    </View> 

                </TouchableOpacity>
                <FooterComponent goto={(e) => this.props.navigation.navigate(e)} active={"location"}  />
                
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


export default Map;





// import React from 'react';
// import { StyleSheet, View, Text, Dimensions } from 'react-native';

// import MapView, {
//   MAP_TYPES,
//   PROVIDER_DEFAULT,
//   ProviderPropType,
//   UrlTile,
// } from 'react-native-maps';

// const { width, height } = Dimensions.get('window');

// const ASPECT_RATIO = width / height;
// const LATITUDE = 37.78825;
// const LONGITUDE = -122.4324;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// class Map extends React.Component {
//   constructor(props, context) {
//     super(props, context);

//     this.state = {
//       region: {
//         latitude: LATITUDE,
//         longitude: LONGITUDE,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA,
//       },
//     };
//   }

//   get mapType() {
//     // MapKit does not support 'none' as a base map
//     return this.props.provider === PROVIDER_DEFAULT
//       ? MAP_TYPES.STANDARD
//       : MAP_TYPES.NONE;
//   }

//   render() {
//     const { region } = this.state;
//     return (
//       <View style={styles.container}>
//         <MapView
//           provider={this.props.provider}
//           mapType={this.mapType}
//           style={styles.map}
//           initialRegion={region}
//           customMapStyle={{backgroundColor:'#000'}}
//         >
        //   <UrlTile
        //     urlTemplate="http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"
        //     zIndex={-1}
        //   />
//         </MapView>
//         <View style={styles.buttonContainer}>
//           <View style={styles.bubble}>
//             <Text>Custom Tiles</Text>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// Map.propTypes = {
//   provider: ProviderPropType,
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   bubble: {
//     flex: 1,
//     backgroundColor: 'rgba(255,255,255,0.7)',
//     paddingHorizontal: 18,
//     paddingVertical: 12,
//     borderRadius: 20,
//   },
//   latlng: {
//     width: 200,
//     alignItems: 'stretch',
//   },
//   button: {
//     width: 80,
//     paddingHorizontal: 12,
//     alignItems: 'center',
//     marginHorizontal: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginVertical: 20,
//     backgroundColor: 'transparent',
//   },
// });

// export default Map;