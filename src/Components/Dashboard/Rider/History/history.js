import React from 'react'
import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, RefreshControl} from 'react-native'
import { connect } from 'react-redux';
import FooterComponent from '../Footer/footer'
import { Header } from 'react-native-elements'
const welcome2 = require('../../../../../assets/welcome2.png')
const back = require('../../../../../assets/back.png')
const sidebar = require('../../../../../assets/sidebar.png')
import MapView  from 'react-native-maps';
import {getUserDetail, getHistory, getPaymentDetails} from '../../../../Redux/Actions/userAction'
import { LocalizationContext } from '../../../../Localization/LocalizationContext';

class History extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            refreshing: false,
        }
    }


    onRefresh = () => {
        const { userDetails, getHistory, getUserDetail, getPaymentDetails } = this.props
        this.setState({ refreshing: true })
        getHistory(userDetails.data.id)
        getUserDetail(userDetails.data.id)
        getPaymentDetails(userDetails.data.id)
        if (!this.props.fetching) {
            this.setState({ refreshing: false })
        }

    }
    static contextType = LocalizationContext
    render() {
        const { translations } = this.context
        const { history } = this.props
        return (
            <View style={{flex: 1}}>
            <ImageBackground source={welcome2} style={{height:"100%", width:'102%', flex: 1, justifyContent:'center',right:5}}> 

            <ScrollView refreshControl={<RefreshControl colors={["#3A91FA"]} refreshing={this.props.fetching} onRefresh={this.onRefresh} />} contentContainerStyle={{paddingBottom: 70}}>
                <View style={{flex: 1 }}>
                    <Header
                        containerStyle={{backgroundColor:'transparent', borderBottomWidth: 0}}
                        leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={back} style={{height: 20, width: 20}} />
                        </TouchableOpacity>}
                        centerComponent={<Text style={{fontSize: 20, color:'#fff'}}>{translations.HISTORY}</Text>}
                        rightComponent={
                            <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                            <Image source={sidebar} style={{height: 20, width: 20}} />
                            </TouchableOpacity>
                        }
                    />

                    
                {history ?
                    <View>
                            {history.data.map((val, index) => {
                                    return(
                                        <View style={{backgroundColor:'#fff', margin: 10}}>
                                            <View style={{flexDirection:'row', justifyContent:'space-between', width:'90%', alignSelf:'center', padding: 5}}>
                                                <Text>
                                                    {val.completed_date}
                                                </Text>
                                                <Text>
                                                    ${val.price}
                                                </Text>
                                            </View>
                                            <View style={{flexDirection:'row', justifyContent:'space-between', width:'90%', alignSelf:'center', padding: 5}}>
                                                <Text>
                                                </Text>
                                                <Text>
                                                    {this.props.userDetails.data.first_name} {this.props.userDetails.data.last_name}
                                                </Text>
                                            </View>
                                            <MapView
                                                style={{height: 150, width:'100%'}} 
                                                initialRegion={{
                                                    latitude: Number(val.dl_latitude),
                                                    longitude: Number(val.dl_longitude),
                                                    latitudeDelta: 0.0122,
                                                    longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
                                                    }}
                                                ref={ref => this.map = ref}
                                                scrollEnabled={false}
                                                >
                                                    <MapView.Marker  title={'Start'} key={`coordinate_${index}`} coordinate={{
                                                    latitude: Number(val.dl_latitude),
                                                    longitude: Number(val.dl_longitude),
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
                            {translations.YOU_HAVE_NOT_COMPLETED_ANY_RIDE}
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
    getUserDetail, getHistory, getPaymentDetails
};


export default connect(mapStateToProps, mapDispatchToProps)(History);
