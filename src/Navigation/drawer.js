import React, { Component, useContext, useEffect, useState } from "react";
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
import { LocalizationContext } from "../Localization/LocalizationContext";

const defaultAvatar = 'https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'

function DrawerMenu(props) {
    // constructor(props) {
    //     super(props);
    //     state = {
    //         tabArr : [
    //             {
    //                 name: 'Profile',
    //                 icon: require('../../assets/ProfileActive.png'),
    //                 navigate: 'ProProfile'
    //             },
    //             {
    //                 name: 'Notification',
    //                 icon: require('../../assets/notification.png'),
    //                 navigate: 'Notification'
    //             },
    //             {
    //                 name: 'Ride Request',
    //                 icon: require('../../assets/request.png'),
    //                 navigate:'RideReq'
    //             },
    //             {
    //                 name: 'Payment',
    //                 icon: require('../../assets/payment.png'),
    //                 navigate: 'Payment'
    //             },
    //             {
    //                 name: 'History',
    //                 icon: require('../../assets/history.png'),
    //                 navigate: 'History'
    //             },
    //             {
    //                 name: 'Schedule Booking',
    //                 icon: require('../../assets/schedule.png'),
    //                 navigate: 'ScheduleBooking'
    //             },

    //         ]
    //     }
    // }
    const contextType = useContext(LocalizationContext)
    // constructor(props) {
    const { translations, appLanguage, setAppLanguage } = contextType

    const [tabArr, setTabArr] = useState([
        {
            name: translations.PROFILE,
            icon: require('../../assets/ProfileActive.png'),
            navigate: 'ProProfile'
        },
        {
            name: translations.NOTIFICATION,
            icon: require('../../assets/notification.png'),
            navigate: 'Notification'
        },
        {
            name: translations.RIDE_REQUEST,
            icon: require('../../assets/request.png'),
            navigate: 'RideReq'
        },
        {
            name: translations.PAYMENT,
            icon: require('../../assets/payment.png'),
            navigate: 'Payment'
        },
        {
            name: translations.HISTORY,
            icon: require('../../assets/history.png'),
            navigate: 'History'
        },
        {
            name: translations.SCHEDULE_BOOKING,
            icon: require('../../assets/schedule.png'),
            navigate: 'ScheduleBooking'
        },

    ])

    useEffect(() => {
        setTabArr([
            {
                name: translations.PROFILE,
                icon: require('../../assets/ProfileActive.png'),
                navigate: 'ProProfile'
            },
            {
                name: translations.NOTIFICATION,
                icon: require('../../assets/notification.png'),
                navigate: 'Notification'
            },
            {
                name: translations.RIDE_REQUEST,
                icon: require('../../assets/request.png'),
                navigate: 'RideReq'
            },
            {
                name: translations.PAYMENT,
                icon: require('../../assets/payment.png'),
                navigate: 'Payment'
            },
            {
                name: translations.HISTORY,
                icon: require('../../assets/history.png'),
                navigate: 'History'
            },
            {
                name: translations.SCHEDULE_BOOKING,
                icon: require('../../assets/schedule.png'),
                navigate: 'ScheduleBooking'
            },
        ])

    }, [appLanguage])

    // render() {
    const { profileData } = props.screenProps
    const { userDetails } = props
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={backgound} style={{ height: "100%", width: '100%', flex: 1, justifyContent: 'center' }}>
                <ScrollView>
                    <View style={{ height: "100%", width: '100%', flex: 1, }}>

                        <View style={{ paddingTop: 50, alignItems: 'center', borderBottomColor: '#fff' }}>

                            <Avatar
                                size="xlarge"
                                rounded
                                containerStyle={{ borderWidth: 15, borderColor: '#fff', }}
                                source={{ uri: userDetails.data.image ? "https://hnh6.xyz/route/public/profile_pics/" + userDetails.data.image : defaultAvatar }}
                            />
                        </View>

                        <View style={{ alignItems: 'center', marginVertical: 10 }}>
                            < Text style={{ fontSize: 23, color: '#fff' }}>{userDetails.data.first_name} {userDetails.data.last_name}</Text>
                        </View>

                        {tabArr.map((val, ind) => {
                            return (
                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={() => {
                                        props.navigation.navigate(val.navigate)
                                        props.navigation.closeDrawer()
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
                         <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                if(appLanguage == "en"){
                                    setAppLanguage("es")
                                } else {
                                    setAppLanguage("en")
                                }
                                // props.navigation.navigate(val.navigate)
                                // props.navigation.closeDrawer()
                            }}
                        >
                            <View style={{ marginLeft: 10, width: 30 }}>
                                {/* <Image source={val.icon} style={{ height: 20, width: 20 }} /> */}
                            </View>

                            <View style={{ marginLeft: 20 }}>
                                <Text style={styles.menuItemText}>{translations.SWITCH_LANGUAGE}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={{
                        padding: 10,
                        backgroundColor: 'rgba(74, 83, 116, 0.9)',
                        marginTop: 30,
                        display: "flex",
                        flexDirection: "row"
                    }}
                    onPress={() => {
                        props.logout(userDetails.data.id)
                            .then(async (result) => {
                                if (result.status) {
                                    await AsyncStorage.clear()
                                    props.navigation.navigate('DriverLogin')
                                    props.navigation.closeDrawer()
                                } else {
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
// } 


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
        backgroundColor: 'rgba(74, 83, 116, 0.9)',
        marginTop: 5,
        display: "flex",
        flexDirection: "row"
    },
    menuItemText: {
        fontSize: 15,
        textTransform: "capitalize",
        //   top: 2,
        color: '#fff',
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