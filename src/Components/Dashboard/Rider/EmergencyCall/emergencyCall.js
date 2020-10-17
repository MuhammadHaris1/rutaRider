import React from 'react'
import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import {Input, Item, Button} from 'native-base'
const emergencyBack = require('../../../../../assets/emergencyBack.png')
const Logo = require('../../../../../assets/Logo.png')
const emeergecy = require('../../../../../assets/emeergecy.png')
import FooterComponent from '../Footer/footer'

import Pusher from 'pusher-js/react-native'
import pusherConfig from '../../../../Constant/pusher.json'

class Emergency extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            emergencyNumber: ''
        }

        this.pusher = new Pusher(pusherConfig.key, pusherConfig);
        console.log("puseher Profile", props.screenProps.profileData.data.id)
        this.userChannel = this.pusher.subscribe(props.screenProps.profileData.data.id)
        this.userChannel.bind('new-booking', (e) => {
                props.navigation.navigate('Map', {
                    reqDetailParam: e 
                })
                console.log("NEW BOOKING Profile", e, props.navigation)
                // this.handleRideRequest(e)
                
        })
        this.userChannel.bind('ride-accepted', (e) => {
            console.log("NEW ride-accepted'", e)
        })
    }



    render() {
        return(
            <View style={{flex: 1}}>
            <ImageBackground source={emergencyBack} style={{height:"100%", width:'110%', flex: 1, justifyContent:'center', right:10}}> 
                <ScrollView>
                    <View style={{height:"100%", width:'100%', flex: 1, }}>

                        <View style={{alignItems:'center', marginTop:'10%'}}>
                            <Image source={Logo} style={{width: 79, height:129}} />
                        </View>

                        <View style={{alignItems:'center', marginTop: '15%'}}> 
                            <Item  rounded regular style={{ width: '80%', borderColor:'transparent', backgroundColor: 'rgba(18, 70, 94, 0.7)' }}>
                                <Image source={emeergecy} style={{width:55, height:55}} />
                                <Input keyboardType="number-pad"  style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => this.setState({ emergencyNumber: e })} placeholder='Emergency Numbers' />
                            </Item>
                        </View> 

                        <View style={{alignItems:'center', paddingVertical: '5%'}}>
                            <Text style={{color:'#fff', fontSize:20}}>Fire, national police</Text>    
                        </View> 

                     {this.state.emergencyNumber ? <View style={{alignItems:'center', marginTop: '5%'}}>
                            <Text style={{color:'#fff', fontSize:35}}>{this.state.emergencyNumber}</Text>    
                        </View> : null} 

                        <View>
                            <Button style={{width:'40%', alignSelf:'center', marginTop:2 ,
                            backgroundColor: 'rgba(45, 48, 67, 0.8)'}} full rounded>
                                <Text style={{color:'#fff', textAlign:'center'}}>
                                    Call
                                </Text>
                            </Button>
                        </View>



                    </View>
                </ScrollView>
                
                <FooterComponent goto={(e) => this.props.navigation.navigate(e ,{
                    reqDetailParam: false 
                })} active={"call"} />
            </ImageBackground>
            </View>
        )
    }
}



const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
	};
  };
  
  const mapDispatchToProps = {
  };


export default connect(mapStateToProps, mapDispatchToProps)(Emergency);