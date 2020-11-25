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
    }


    render() {
        const {profileData} = this.props.screenProps
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
        <                   Text style={{fontSize: 23, color:'#fff'}}>{profileData.data.first_name} {profileData.data.last_name}</Text>
                        </View>
                            
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                this.props.navigation.navigate('ProProfile')
                                this.props.navigation.closeDrawer()
                            }}
                            >
                                <View style={{ marginLeft: 10, width: 30 }}>
                                    <Image source={require('../../assets/ProfileActive.png')} style={{ height: 20, width: 20 }} />
                                </View>

                                <View style={{ marginLeft: 20 }}>
                                    <Text style={styles.menuItemText}>Profile</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                this.props.navigation.navigate('Payment')
                                this.props.navigation.closeDrawer()
                            }}
                            >
                                <View style={{ marginLeft: 10, width: 30 }}>
                                    <Image source={require('../../assets/payment.png')} style={{ height: 20, width: 20 }} />
                                </View>

                                <View style={{ marginLeft: 20 }}>
                                    <Text style={styles.menuItemText}>Payment</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                this.props.navigation.navigate('History')
                                this.props.navigation.closeDrawer()
                            }}
                            >
                                <View style={{ marginLeft: 10, width: 30 }}>
                                    <Image source={require('../../assets/history.png')} style={{ height: 20, width: 20 }} />
                                </View>

                                <View style={{ marginLeft: 20 }}>
                                    <Text style={styles.menuItemText}>History</Text>
                                </View>
                            </TouchableOpacity>



                            <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                this.props.navigation.navigate('ScheduleBooking')
                                this.props.navigation.closeDrawer()
                            }}
                            >
                                <View style={{ marginLeft: 10, width: 30 }}>
                                    <Image source={require('../../assets/schedule.png')} style={{ height: 20, width: 20 }} />
                                </View>

                                <View style={{ marginLeft: 20 }}>
                                    <Text style={styles.menuItemText}>Schedule Booking</Text>
                                </View>
                            </TouchableOpacity>


                            {/* <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                this.props.navigation.navigate('Emergency')
                                this.props.navigation.closeDrawer()
                            }}
                            >
                                <View style={{ marginLeft: 10, width: 30 }}>
                                    <Image source={require('../../assets/call.png')} style={{ height: 20, width: 20 }} />
                                </View>

                                <View style={{ marginLeft: 20 }}>
                                    <Text style={styles.menuItemText}>Emergency Call</Text>
                                </View>
                            </TouchableOpacity> */}

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
                                this.props.logout()

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
    marginTop: 30,
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