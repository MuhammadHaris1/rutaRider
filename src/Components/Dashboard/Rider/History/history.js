import React from 'react'
import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import { connect } from 'react-redux';
import FooterComponent from '../Footer/footer'
import { Header } from 'react-native-elements'
const welcome2 = require('../../../../../assets/welcome2.png')
const back = require('../../../../../assets/back.png')
const sidebar = require('../../../../../assets/sidebar.png')
import MapView ,{
    MAP_TYPES,
    PROVIDER_DEFAULT,
    ProviderPropType,
    UrlTile,
  }  from 'react-native-maps';

class History extends React.Component {
    constructor (props) {
        super(props)
        this.state = {

            history: [
                {
                    date: '1/12/2000',
                    price: '250 PKR',
                    carModal: 'Suzuki WagonR 2019',
                    DriverName: 'John Doe',
                    focusedlocation: {
                    latitude: 24.9912986,
                    longitude: 67.1322322,
                    latitudeDelta: 0.0122,
                    longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
                },
                },
                {
                    date: '1/12/2000',
                    price: '250 PKR',
                    carModal: 'Suzuki WagonR 2019',
                    DriverName: 'John Doe',
                    focusedlocation: {
                    latitude: 24.9912986,
                    longitude: 67.1322322,
                    latitudeDelta: 0.0122,
                    longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
                },
                },
                {
                    date: '1/12/2000',
                    price: '250 PKR',
                    carModal: 'Suzuki WagonR 2019',
                    DriverName: 'John Doe',
                    focusedlocation: {
                    latitude: 24.9912986,
                    longitude: 67.1322322,
                    latitudeDelta: 0.0122,
                    longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
                },
                },
                {
                    date: '1/12/2000',
                    price: '250 PKR',
                    carModal: 'Suzuki WagonR 2019',
                    DriverName: 'John Doe',
                    focusedlocation: {
                    latitude: 24.9912986,
                    longitude: 67.1322322,
                    latitudeDelta: 0.0122,
                    longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
                    },
                },
                {
                    date: '1/12/2000',
                    price: '250 PKR',
                    carModal: 'Suzuki WagonR 2019',
                    DriverName: 'John Doe',
                    focusedlocation: {
                        latitude: 24.9912986,
                        longitude: 67.1322322,
                        latitudeDelta: 0.0122,
                        longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
                        },
                },
                {
                    date: '1/12/2000',
                    price: '250 PKR',
                    carModal: 'Suzuki WagonR 2019',
                    DriverName: 'John Doe',
                    focusedlocation: {
                        latitude: 24.9912986,
                        longitude: 67.1322322,
                        latitudeDelta: 0.0122,
                        longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
                        },
                }
            ]

        }
    }



    render() {
        const { history } = this.props
        return (
            <View style={{flex: 1}}>
            <ImageBackground source={welcome2} style={{height:"100%", width:'102%', flex: 1, justifyContent:'center',right:5}}> 

            <ScrollView contentContainerStyle={{paddingBottom: 70}}>
                <View style={{flex: 1 }}>
                    <Header
                        containerStyle={{backgroundColor:'transparent', borderBottomWidth: 0}}
                        leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={back} style={{height: 20, width: 20}} />
                        </TouchableOpacity>}
                        centerComponent={<Text style={{fontSize: 20, color:'#fff'}}>History</Text>}
                        rightComponent={
                            <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                            <Image source={sidebar} style={{height: 20, width: 20}} />
                            </TouchableOpacity>
                        }
                    />

                    
                {history ?
                    <View>
                            {history.previousRides.map((val, index) => {
                                    return(
                                        <View style={{backgroundColor:'#fff', margin: 10}}>
                                            <View style={{flexDirection:'row', justifyContent:'space-between', width:'95%', alignSelf:'center', padding: 5}}>
                                                <Text>
                                                    {val.completed_at}
                                                </Text>
                                                <Text>
                                                    {val.amount}
                                                </Text>
                                            </View>
                                            <View style={{flexDirection:'row', justifyContent:'space-between', width:'95%', alignSelf:'center', padding: 5}}>
                                                <Text>
                                                    {val.vehicle}
                                                </Text>
                                                <Text>
                                                    {val.user_name}
                                                </Text>
                                            </View>
                                            <MapView
                                                style={{height: 150, width:'100%'}} 
                                                initialRegion={{
                                                    latitude: Number(val.user_drop_latitude),
                                                    longitude: Number(val.user_drop_longitude),
                                                    latitudeDelta: 0.0122,
                                                    longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
                                                    }}
                                                ref={ref => this.map = ref}
                                                scrollEnabled={false}
                                                >
                                                    <MapView.Marker  title={'Start'} key={`coordinate_${index}`} coordinate={{
                                                    latitude: Number(val.user_drop_latitude),
                                                    longitude: Number(val.user_drop_longitude),
                                                    latitudeDelta: 0.0122,
                                                    longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
                                                    }} />
                                            </MapView>
                                        </View>
                                    )
                                })
                            }
                    </View>
                    
                :         
                    <View style={{justifyContent: 'center', alignContent:'center', top: '60%'}}>

                        <Text style={{color:"#fff", alignSelf:'center', fontSize: 20}}>
                            You Have't Compelete any Ride!
                        </Text>

                    </View>
                 }
                    </View>
                </ScrollView>

                    
                    

                    <FooterComponent goto={(e) => this.props.navigation.navigate(e, {
                        reqDetailParam: false 
                            })} active={"statistics"} />
            </ImageBackground>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        activeRideData: state.user.activeRideData,
        history: state.user.history

    };
};

const mapDispatchToProps = {
    
};


export default connect(mapStateToProps, mapDispatchToProps)(History);
