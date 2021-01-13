import React from 'react'
import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, RefreshControl} from 'react-native'
import { connect } from 'react-redux';
import FooterComponent from '../Footer/footer'
import { Header } from 'react-native-elements'
import { Button, Item, Input } from 'native-base'
const welcome2 = require('../../../../../assets/welcome2.png')
const back = require('../../../../../assets/back.png')
const sidebar = require('../../../../../assets/sidebar.png')
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import PaymentDetails from './paymentDetails';
import {Picker} from '@react-native-community/picker';
import { LocalizationContext } from '../../../../Localization/LocalizationContext';

class Payment extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
        }
    }


    

    static contextType = LocalizationContext
    render() {
        const { translations } = this.context
        const { paymentDetail, userDetails } = this.props
        const {year, month} = this.state
        const years = Array.from(new Array(11),( val, index) => year + index); 
        const months = Array.from(new Array(12),(val, ind) => 1 + ind)
        console.log("paymentDetail paymentDetail", paymentDetail, userDetails)
        return (
            <View style={{flex: 1,}}>
            <ImageBackground source={welcome2} style={{height:"100%", width: '100%', flex: 1, justifyContent:'center',right:5}}> 

            <ScrollView contentContainerStyle={{paddingBottom: 70, alignItems:'center', justifyContent:'center'}}>
                <View style={{flex: 1 }}>
                    <Header
                        containerStyle={{backgroundColor:'transparent', borderBottomWidth: 0}}
                        leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={back} style={{height: 20, width: 20}} />
                        </TouchableOpacity>}
                        centerComponent={<Text style={{fontSize: 20, color:'#fff'}}>{translations.PAYMENT}</Text>}
                        rightComponent={
                            <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                            <Image source={sidebar} style={{height: 20, width: 20}} />
                            </TouchableOpacity>
                        }
                    />

            {/* PAYMENT INFORMATION START */}

        <View style={styles.container}>
            <ScrollView contentContainerStyle={{paddingBottom: 40}}>
                <View style={styles.container}>
                   <View style={styles.itemContainer}>
                       <Item regular style={styles.inputContainer}>
                           <Input placeholder={translations.CARD_NUMBER} style={{color:'#fff'}} placeholderTextColor="#fff" />
                       </Item>
                       <View style={styles.grpItem}>
                           <View style={styles.pickerContainer}>
                                <Picker
                                    style={{...styles.pickerContainer, marginVertical:0, width:'100%'}}
                                    selectedValue={years}
                                    onValueChange={(itemValue, itemIndex) =>
                                       this.setState({year: itemValue})
                                    }>
                                    {years.map((val, ind) => {
                                        // console.log("STRING", val, typeof val)
                                        return(
                                            <Picker.Item color="#000" key={ind} label={val.toString()} value={val.toLocaleString()} />
                                        )
                                    })}
                                </Picker>
                            </View>

                            <View style={styles.pickerContainer}>
                                <Picker
                                    style={{...styles.pickerContainer, marginVertical:0, width:'100%'}}
                                    selectedValue={month}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({month: itemValue})
                                    }>
                                    {months.map((val, ind) => {
                                        // console.log("STRING", val, typeof val)
                                        return(
                                            <Picker.Item color="#000" key={ind} label={val.toString()} value={val.toLocaleString()} />
                                        )
                                    })}
                                </Picker>
                            </View>
                       </View>
                       <Item regular style={styles.inputContainer}>
                            <Input keyboardType="number-pad" placeholder={translations.ENTER_YOUR_CARD_NAME} style={{color:'#fff'}} placeholderTextColor="#fff" />
                        </Item>
                        <Item regular style={styles.inputContainer}>
                            <Input placeholder={translations.CVV} style={{color:'#fff'}} placeholderTextColor="#fff" />
                        </Item>
                   </View>
                </View>
            </ScrollView>
        </View>

        {/* PAYMENT INFORMATION END */}

                        <View style={{flex: 1, backgroundColor:'#3A91FA', padding: 10, width:'95%', borderRadius: 10, alignSelf:'center', borderWidth: 1, borderColor: '#fff', justifyContent:'center', alignItems:'center', marginTop: hp(5)}}>

                            <View style={{flexDirection:'row' ,justifyContent: 'space-between'}}>
                               <Text style={{width: '30%', color:'#fff', textAlign:'center'}}>
                                   Name
                               </Text>
                               <Text style={{width: '30%', color:'#fff', textAlign:'center'}}>
                                   Total Kilometers
                               </Text>
                               <Text style={{width: '30%', color:'#fff', textAlign:'center'}}>
                                   Total Amount
                               </Text>

                            </View>

                            <View style={{flexDirection:'row' ,justifyContent: 'space-between'}}>
                                <Text style={{width: '30%', color:'#fff', textAlign:'center'}}>
                                    {userDetails.data.first_name} {userDetails.data.last_name}
                                </Text>
                               {paymentDetail ?
                               <>
                                    <Text style={{width: '30%', color:'#fff', textAlign:'center'}}> 
                                        {paymentDetail.km}
                                    </Text>
                                    <Text style={{width: '30%', color:'#fff', textAlign:'center'}}>
                                        ${paymentDetail.total_amount}
                                    </Text>
                                </>
                                :
                                <>
                                    <Text style={{width: '30%', color:'#fff', textAlign:'center'}}> 
                                        0
                                    </Text>
                                    <Text style={{width: '30%', color:'#fff', textAlign:'center'}}>
                                        $0
                                    </Text>
                                </>
                                }
                            </View>
                        </View>

                        <View style={{marginTop: hp(5)}}>
                            <Button style={{width:'95%', alignSelf:'center', marginTop:2 ,
                            backgroundColor:'#3A91FA' }} full rounded>
                                <Text style={{color:'#fff', textAlign:'center'}}>
                                    {translations.PAYMENT}
                                </Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>


                <FooterComponent 
                    goto={(e) => this.props.navigation.navigate(e, {
                    reqDetailParam: false 
                    })} active={"statistics"} />
                    
            </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container : {
        flex: 1, 
        // backgroundColor:'rgb(43,48,68)',
        // width: wp(90)
    },
    normaText: {
        color:'#fff'
    },
    itemContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10
        
    },
    inputContainer: {
        borderColor:"#3A91FA",
        borderRadius: 10,
        // width: wp(90)
    },
    grpItem: {
        flexDirection:'row',
        justifyContent:'space-between'
    },
    pickerContainer: {
        height: 50, 
        width: '45%', 
        color:'#fff',  
        borderColor:"#3A91FA",
        borderRadius: 10 , 
        borderWidth: 1, 
        marginVertical: 10
    }
})


const mapStateToProps = state => {
    return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        activeRideData: state.user.activeRideData,
        paymentDetail: state.user.paymentDetail

    };
};

const mapDispatchToProps = {
    
};


export default connect(mapStateToProps, mapDispatchToProps)(Payment);
