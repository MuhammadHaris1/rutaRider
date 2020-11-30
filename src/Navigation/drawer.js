import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Image
  , ImageBackground,
  ScrollView,
  Alert,
  AsyncStorage
} from "react-native";

import { NavigationActions } from "react-navigation";
import { logout } from '../Redux/Actions/userAction'
import { connect } from 'react-redux';
import { Avatar, Button, Icon } from "react-native-elements"
import backgound from "../../assets/welcome2.png";


class DrawerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabArr : [
                {
                    name: 'Profile',
                    icon: require('../../assets/ProfileActive.png'),
                    navigate: 'ProProfile'
                },
                {
                    name: 'Notification',
                    icon: require('../../assets/notification.png'),
                    navigate: 'Notification'
                },
                // {
                //     name: 'Ride Request',
                //     icon: require('../../assets/request.png'),
                //     navigate:'RideReq'
                // },
                {
                    name: 'Payment',
                    icon: require('../../assets/payment.png'),
                    navigate: 'Payment'
                },
                {
                    name: 'History',
                    icon: require('../../assets/history.png'),
                    navigate: 'History'
                },
                {
                    name: 'Schedule Booking',
                    icon: require('../../assets/schedule.png'),
                    navigate: 'ScheduleBooking'
                },
                
            ]
        }
    }


    render() {
        const {profileData} = this.props.screenProps
        const {userDetails} = this.props
        return( 
            <View style={{flex: 1}}>
                <ImageBackground source={backgound} style={{height:"100%", width:'100%', flex: 1, justifyContent:'center'}}> 
                    <ScrollView>
                        <View style={{height:"100%", width:'100%', flex: 1, }}>

                        <View style={{ paddingTop:50, alignItems:'center', borderBottomColor:'#fff'}}>
                                    
                                    <Avatar
                                    size="xlarge" 
                                    rounded
                                    containerStyle={{borderWidth: 15, borderColor:'#fff',}}
                                    source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGkKTkKnqZE23RyW0_npSDjVKIVg_uLRmZbw&usqp=CAU'}}
                                    />
                        </View>

                        <View style={{ alignItems:'center', marginVertical: 10 }}>
                            < Text style={{fontSize: 23, color:'#fff'}}>{profileData.data.first_name} {profileData.data.last_name}</Text>
                        </View>
                            
                            {this.state.tabArr.map((val, ind) => {
                                return(
                                    <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={() => {
                                        this.props.navigation.navigate(val.navigate)
                                        this.props.navigation.closeDrawer()
                                    }}
                                    >
                                    <View style={{ marginLeft: 10, width: 30 }}>
                                        <Image source={val.icon} style={{ height: 20, width: 20 }} />
                                    </View>
    
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={styles.menuItemText}>{val.name}</Text>
                                    </View>
                                </TouchableOpacity>
                                )
                            })}

                        </View>
                    </ScrollView>
                    <TouchableOpacity
                            style={{
                              padding: 10,
                              backgroundColor:'rgba(74, 83, 116, 0.9)',
                              marginTop: 30,
                              display: "flex",
                              flexDirection: "row"
                              }}
                            onPress={() => {
                                this.props.logout(userDetails.data.id)
                                .then( async (result) => {
                                    if(result.status) {
                                        await AsyncStorage.clear()
                                        this.props.navigation.navigate('DriverLogin')
                                        this.props.navigation.closeDrawer()
                                    }else {
                                        Alert.alert("Alert", "Connection interrupt")
                                    }
                                })
                                .catch((err) => {
                                    Alert.alert("Alert", "Connection interrupt")
                                })

                            }}
                            >
                                <View style={{ marginLeft: 10, width: 30 }}>
                                    <Image source={require('../../assets/logout.png')} style={{ height: 20, width: 20 }} />
                                </View>

                                <View style={{ marginLeft: 20 }}>
                                    <Text style={styles.menuItemText}>LOGOUT</Text>
                                </View>
                            </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
} 


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 100
    },
    menuItem: {
      padding: 10,
      // justifyContent: "center",
      // backgroundColor: "rgba(12, 12, 12, 0.2)",
    //   marginBottom: 2,
    backgroundColor:'rgba(74, 83, 116, 0.9)',
    marginTop: 5,
    display: "flex",
    flexDirection: "row"
    },
    menuItemText: {
      fontSize: 15,
    //   top: 2,
      color:'#fff',
    //   fontFamily: "Poppins-Regular"
    }
  });


DrawerMenu.defaultProps = {};

DrawerMenu.propTypes = {};

const mapStateToProps = state => {
    return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        paymentDetail: state.user.paymentDetail
    };
};

const mapDispatchToProps = {
    logout
};


export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);