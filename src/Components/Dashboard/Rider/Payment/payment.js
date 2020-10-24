import React from 'react'
import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, RefreshControl} from 'react-native'
import { connect } from 'react-redux';
import FooterComponent from '../Footer/footer'
import { Header } from 'react-native-elements'
import { Button } from 'native-base'
const welcome2 = require('../../../../../assets/welcome2.png')
const back = require('../../../../../assets/back.png')
const sidebar = require('../../../../../assets/sidebar.png')
import MapView  from 'react-native-maps';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

class Payment extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            
        }
    }


    


    render() {
        const { paymentDetail, userDetails } = this.props
        console.log("paymentDetail paymentDetail", paymentDetail, userDetails)
        return (
            <View style={{flex: 1}}>
            <ImageBackground source={welcome2} style={{height:"100%", width:'102%', flex: 1, justifyContent:'center',right:5}}> 

            <ScrollView contentContainerStyle={{paddingBottom: 70, alignItems:'center', justifyContent:'center'}}>
                <View style={{flex: 1 }}>
                    <Header
                        containerStyle={{backgroundColor:'transparent', borderBottomWidth: 0}}
                        leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={back} style={{height: 20, width: 20}} />
                        </TouchableOpacity>}
                        centerComponent={<Text style={{fontSize: 20, color:'#fff'}}>Payment</Text>}
                        rightComponent={
                            <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                            <Image source={sidebar} style={{height: 20, width: 20}} />
                            </TouchableOpacity>
                        }
                    />

                        <View style={{flex: 1, backgroundColor:'#3A91FA', padding: 10, width: wp(95), borderRadius: 10, alignSelf:'center', borderWidth: 1, borderColor: '#fff', justifyContent:'center', alignItems:'center', marginTop: hp(25)}}>

                            <View style={{flexDirection:'row' ,justifyContent: 'space-between'}}>
                               <Text style={{width: wp(30), color:'#fff', textAlign:'center'}}>
                                   Name
                               </Text>
                               <Text style={{width: wp(30), color:'#fff', textAlign:'center'}}>
                                   Total Kilometers
                               </Text>
                               <Text style={{width: wp(30), color:'#fff', textAlign:'center'}}>
                                   Total Amount
                               </Text>

                            </View>

                            <View style={{flexDirection:'row' ,justifyContent: 'space-between'}}>
                                <Text style={{width: wp(30), color:'#fff', textAlign:'center'}}>
                                    {userDetails.data.first_name} {userDetails.data.last_name}
                                </Text>
                               {paymentDetail ?
                               <>
                                    <Text style={{width: wp(30), color:'#fff', textAlign:'center'}}> 
                                        {paymentDetail.km}
                                    </Text>
                                    <Text style={{width: wp(30), color:'#fff', textAlign:'center'}}>
                                        ${paymentDetail.total_amount}
                                    </Text>
                                </>
                                :
                                <>
                                    <Text style={{width: wp(30), color:'#fff', textAlign:'center'}}> 
                                        0
                                    </Text>
                                    <Text style={{width: wp(30), color:'#fff', textAlign:'center'}}>
                                        $0
                                    </Text>
                                </>
                                }
                            </View>
                        </View>

                    </View>
                </ScrollView>

                    
                <View style={{bottom: hp(10), position:'absolute', width: wp(100)}}>
                    <Button style={{width:'80%', alignSelf:'center', marginTop:2 ,
                    backgroundColor:'#3A91FA' }} full rounded>
                        <Text style={{color:'#fff', textAlign:'center'}}>
                            Payment
                        </Text>
                    </Button>
                </View>

                <FooterComponent 
                    goto={(e) => this.props.navigation.navigate(e, {
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
        paymentDetail: state.user.paymentDetail

    };
};

const mapDispatchToProps = {
    
};


export default connect(mapStateToProps, mapDispatchToProps)(Payment);
