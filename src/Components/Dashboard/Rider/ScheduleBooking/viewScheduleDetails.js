import React from 'react'
import { View, Text, RefreshControl, ScrollView, ImageBackground} from 'react-native'
import { connect } from 'react-redux'
import { HeaderCustom } from '../Constants/Header'
import { styles } from './scheduleStyling'
const welcome2 = require('../../../../../assets/welcome2.png')
const ViewScheduleDetail = (props) => {
    const { schduleDetail } = props
    return (
        <View style={{flex: 1}}>
            <ImageBackground source={welcome2} style={{height:"100%", width:'102%', flex: 1, justifyContent:'center',right:5}}> 
                <View style={{...styles.itemContainer, marginVertical: 10}}>
                    <HeaderCustom  headerTxt="Schedule Details" navigation={props.navigation} />
                </View>

                <ScrollView refreshControl={<RefreshControl colors={["#3A91FA"]} refreshing={props.fetching}/>} contentContainerStyle={{paddingBottom: 70}}>

                       {schduleDetail &&
                        <View>
                            <View style={[styles.itemContainer ,styles.row, styles.spaceBtw]}>
                                {["Name", "No of seat", "Phone"].map((val, ind) => {
                                    return <Text style={[styles.whiteBoldTxt, {letterSpacing: 0, textAlign:'center'}]}>{val}</Text>
                                })}
                                </View>
                                <View style={[styles.itemContainer ,styles.row, styles.spaceBtw, {borderWidth:1, borderColor:'#fff'}]}>
                                <Text style={[styles.whiteNormalTxt, {textAlign:'center'}]}>
                                    Mudasir Raza
                                </Text>
                                <Text style={[styles.whiteNormalTxt, {textAlign:'center'}]}>
                                    3
                                </Text>
                                <Text style={[styles.whiteNormalTxt, {textAlign:'center'}]}>
                                        0900-78601
                                </Text>
                                </View>
                                
                                <View style={styles.itemContainer}>
                                    <View style={[styles.itemContainer, styles.row, styles.spaceBtw]}>
                                        <Text style={styles.whiteNormalTxt}>Total Seats</Text>
                                        <Text style={styles.whiteNormalTxt}>10</Text>
                                    </View>
                                    <View style={[styles.itemContainer, styles.row, styles.spaceBtw]}>
                                        <Text style={styles.whiteNormalTxt}>Remaining Seats</Text>
                                        <Text style={styles.whiteNormalTxt}>6</Text>
                                    </View>
                                </View>
                        </View>}

                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        schduleDetail: state.user.schduleDetail
    };
};

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewScheduleDetail);