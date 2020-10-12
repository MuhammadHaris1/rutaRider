import React from 'react'
import {View, Text, TouchableOpacity, ImageBackground, Image, ScrollView, ToastAndroid, Platform, Alert} from 'react-native'
import { connect } from 'react-redux';
import {login,} from '../../../../Redux/Actions/userAction'
import { Item, Input, Label, Button, Spinner } from 'native-base';
const signinBack = require('../../../../../assets/signinBack.png')
const Logo = require('../../../../../assets/Logo.png')
import axios from 'axios'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class DriverLogin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:'Muzammil@gmail.com',
            password: 'Hnh123'
        }
    }



    signin = () => {
        const { email, password } = this.state
        const { login } = this.props
        const { fetchProfileData } = this.props.screenProps
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(reg.test(email) === false){
            if(Platform.OS === 'ios'){
                Alert.alert("Alert", 'Fix the email format')
            }else {
                ToastAndroid.show('Fix the email format', ToastAndroid.LONG)
            }
        }else {
            var data = new FormData();
            data.append('email', email);
            data.append('password', password);
            // this.props.screenProps.fetchProfileData(convertVal)
            login(data, fetchProfileData)
        }
    }


    render() {
        // const { type } = this.props.navigation.state.params
        const { fetching } = this.props

        return (
            <View style={{flex: 1}}>
                <ImageBackground source={signinBack} style={{height:"100%", width:'100%', flex: 1, justifyContent:'center'}}> 
                    <ScrollView>
                        <View style={{height:"100%", width:'100%', flex: 1, }}>

                        <View style={{alignItems:'center', marginTop:'5%'}}>
                            <Image source={Logo} style={{width: wp(20), height:hp(14)}} />
                        </View>
                        
                        <View style={{flexDirection:'row',justifyContent:'space-around', alignSelf:'center',}}>
                            <View style={{marginLeft:40}}>
                                <Button style={{width:'80%', marginTop:20, backgroundColor:'#3A91FA', borderRadius:10}} full >
                                    <Text style={{color:'#fff'}}>
                                        SIGN IN
                                    </Text>
                                </Button>
                            </View>

                            <View>
                                <Button onPress={() => {
                                    // type === "Driver" ? this.props.navigation.navigate('DriverSignup', {type: type}) : this.props.navigation.navigate('UserSignUp', {type: type})
                                    this.props.navigation.navigate('DriverSignup')
                                    
                                    }} style={{width:'70%', marginTop:20}} transparent full rounded>
                                    <Text style={{color:'#fff'}}>
                                        SIGN UP
                                    </Text>
                                </Button>
                            </View>
                        </View>


                        <View style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center', width: '100%' , marginTop: 25}}>
                            <View> 
                                <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                    <Input style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => this.setState({ email: e })} placeholder='Email' />
                                </Item>
                            </View>


                            <View style={{paddingVertical:10}}> 
                                <Item rounded  regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                    <Input secureTextEntry style={{color:'#fff'}} placeholderTextColor="#fff" onChangeText={(e) => this.setState({ password: e })} placeholder='Password' />
                                </Item>
                            </View>
                        </View>

                        <View >
                            {fetching ?  
                                <Spinner size="large" color="#3A91FA" /> 
                                : 
                                <Button onPress={() => {
                                    // this.props.navigation.navigate('DriverStack')
                                    this.signin()
    
                                }} style={{width:'40%', alignSelf:'center', marginTop:20, backgroundColor:'#3A91FA'}} full rounded>
                                    <Text style={{color:'#fff'}}>
                                        Login
                                    </Text>
                                </Button>    
                        }
                        </View>

                        <View >
                            <Button transparent onPress={() => this.props.navigation.navigate('UserLogin')} style={{width:'40%', alignSelf:'center', marginTop:2}} full rounded>
                                <Text style={{color:'#fff', textAlign:'center'}}>
                                    Forgot Password?
                                </Text>
                            </Button>
                        </View>




                        </View>
                    </ScrollView>
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
    login,
  };


export default connect(mapStateToProps, mapDispatchToProps)(DriverLogin);