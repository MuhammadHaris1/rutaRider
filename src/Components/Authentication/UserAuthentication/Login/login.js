import React from 'react'
import {View, Text, TouchableOpacity, ImageBackground, Image, ScrollView} from 'react-native'
import { connect } from 'react-redux';
import {login} from '../../../../Redux/Actions/userAction'
import { Item, Input, Label, Button } from 'native-base';
const signinBack = require('../../../../../assets/signinBack.png')
const Logo = require('../../../../../assets/Logo.png')
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import axios from 'axios'
class UserLogin extends React.Component {
    constructor(props){
        super(props);
    }


    // componentDidMount = () => {

    //     var data = new FormData();
    //     data.append('username', 'abidr.w@gmail.com');
    //     data.append('password', 'syhlf');

    //     var config = {
    //     method: 'post',
    //     url: 'https://api.rarare.com/user_login.php',
    //     data : data
    //     };

    //     axios(config)
    //     .then((response) => {
    //     console.log('JSON.stringify(response.data)',JSON.stringify(response.data));
    //     })
    //     .catch((error) => {
    //     console.log('error', error);
    //     });
    // }

    render() {
        const { type } = this.props.navigation.state.params
        return (
            <View style={{flex: 1}}>
                <ImageBackground source={signinBack} style={{height:"100%", width:'100%', flex: 1, justifyContent:'center'}}> 
                    <ScrollView>
                        <View style={{height:"100%", width:'100%', flex: 1, }}>

                        <View style={{alignItems:'center', marginTop:hp(5)}}>
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
                                <Button onPress={() => {type === "Driver" ? this.props.navigation.navigate('DriverSignup', {type: type}) : this.props.navigation.navigate('UserSignUp', {type: type})}} style={{width:'70%', marginTop:20}} transparent full rounded>
                                    <Text style={{color:'#fff'}}>
                                        SIGN UP
                                    </Text>
                                </Button>
                            </View>
                        </View>


                        <View style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center', width: '100%' , marginTop: 25}}>
                            <View> 
                                <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                    <Input style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => this.setState({ email: e })} placeholder='Userarname' />
                                </Item>
                            </View>


                            <View style={{paddingVertical:10}}> 
                                <Item rounded  regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                    <Input secureTextEntry style={{color:'#fff'}} placeholderTextColor="#fff" onChangeText={(e) => this.setState({ email: e })} placeholder='Password' />
                                </Item>
                            </View>
                        </View>

                        <View >
                            <Button onPress={() => this.props.navigation.navigate('App')} style={{width:'40%', alignSelf:'center', marginTop:20, backgroundColor:'#3A91FA'}} full rounded>
                                <Text style={{color:'#fff'}}>
                                    Login
                                </Text>
                            </Button>
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


export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);