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
                        rightComponent={
                            <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                            <Image source={sidebar} style={{height: 20, width: 20}} />
                            </TouchableOpacity>
                        }
                    />

                    
                                    {
                                this.state.history.map((val, index) => {
                                    return(
                                        <View style={{backgroundColor:'#fff', margin: 10}}>
                                            <View style={{flexDirection:'row', justifyContent:'space-between', width:'90%', alignSelf:'center', padding: 5}}>
                                                <Text>
                                                    {val.date}
                                                </Text>
                                                <Text>
                                                    ${val.price}
                                                </Text>
                                            </View>
                                            <View style={{flexDirection:'row', justifyContent:'space-between', width:'90%', alignSelf:'center', padding: 5}}>
                                                <Text>
                                                    {val.carModal}
                                                </Text>
                                                <Text>
                                                    {val.DriverName}
                                                </Text>
                                            </View>
                                            <MapView
                                                style={{height: 150, width:'100%'}} 
                                                initialRegion={val.focusedlocation}
                                                ref={ref => this.map = ref}
                                                scrollEnabled={false}
                                                >
                                                    <MapView.Marker  title={'Start'} key={`coordinate_${index}`} coordinate={val.focusedlocation} />
                                                </MapView>
                                        </View>
                                    )
                                })
                            }
                    </View>
                </ScrollView>

                    
                    

                <FooterComponent  goto={(e) => this.props.navigation.navigate(e)} active={"history"} />
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

    };
};

const mapDispatchToProps = {
    
};


export default connect(mapStateToProps, mapDispatchToProps)(History);
