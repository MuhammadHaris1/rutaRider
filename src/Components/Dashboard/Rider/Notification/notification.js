import { ListItem } from 'native-base'
import React, { useContext } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground, FlatList, RefreshControl } from 'react-native'
import { Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import { HeaderCustom } from '../Constants/Header'
import { styles } from '../ScheduleBooking/scheduleStyling'
import moment from 'moment'
import { getNotification } from '../../../../Redux/Actions/userAction'
import { LocalizationContext } from '../../../../Localization/LocalizationContext'

const Notification = (props) => {
    const { notification, fetching, userDetails, getNotification } = props
    const contextType = useContext(LocalizationContext)
    const { translations } = contextType
    const renderItem = (item, index) => {
        var month = moment(item.created_at).format('MMMM')
        var day = moment(item.created_at).format('DD')
        var year = moment(item.created_at).format('YYYY')

        console.log("day month , year", `${day} ${month}, ${year}`)
        return (
            <View style={{ backgroundColor: "transparent", width: '100%' }}>
                <View style={[styles.row, styles.itemContainer]}>
                    <View>
                        <Image source={{ uri: 'https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' }} style={{ height: 50, width: 50, borderRadius: 10 }} />
                    </View>
                    <View style={{ alignSelf: 'center', width: '80%', paddingHorizontal: 10 }}>
                        <Text style={styles.whiteNormalTxt}>
                            {item.notification}
                        </Text>

                        <View style={{ paddingVertical: 10 }}>
                            <Text style={[styles.whiteNormalTxt, { opacity: 0.5 }]}>
                                {day} {month}, {year}
                            </Text>
                        </View>
                    </View>
                </View>
                <Divider style={{ backgroundColor: '#fff' }} />
            </View>
        )
    }


    const onRefresh = () => {
        getNotification(userDetails.data.id)
    }
    console.log("notification notification notification", notification)

    return (
        <View>
            <ImageBackground style={styles.backroundImage} source={require('../../../../../assets/Splash.png')}>
                <View style={styles.container}>
                    <View style={{  }}>
                        <HeaderCustom navigation={props.navigation} headerTxt={translations.NOTIFICATION} containerStyle={{ left: 15 }} />
                        {false ?
                            <FlatList
                                data={notification}
                                refreshControl={<RefreshControl colors={["#3A91FA"]} refreshing={fetching} onRefresh={onRefresh} />} contentContainerStyle={{ paddingBottom: 70 }}
                                renderItem={({ item, index }) => {
                                    return (
                                        renderItem(item, index)
                                    )
                                }}
                            />
                            :
                            <View style={{ justifyContent: 'center', alignContent: 'center', top: '60%' }}>
                                <Text style={{ color: "#fff", textAlign: 'center', fontSize: 20 }}>
                                    {translations.YOU_DONT_HAVE_NOTIFICATION}
                            </Text>
                            </View>
                        }
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}


const mapStateToProps = state => {
    return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        notification: state.user.notification
    };
};

const mapDispatchToProps = {
    getNotification
};


export default connect(mapStateToProps, mapDispatchToProps)(Notification);