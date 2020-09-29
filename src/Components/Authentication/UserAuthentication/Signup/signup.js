import React from 'react'
import {View, Text, TouchableOpacity, ImageBackground, Image, ScrollView} from 'react-native'
import { connect } from 'react-redux';
import {signup} from '../../../../Redux/Actions/userAction'
import { Item, Input, Label, Button } from 'native-base';
const signupBack = require('../../../../../assets/signupBack.png')
const Logo = require('../../../../../assets/Logo.png')
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class UserSignup extends React.Component {
    constructor(props){
        super(props);
    }




    render() {
        const { type } = this.props.navigation.state.params
        console.log("type", type)
        return (
            <View style={{flex: 1}}>
                <ImageBackground source={signupBack} style={{height:"100%", width:'100%', flex: 1, justifyContent:'center'}}> 
                    <ScrollView>
                        <View style={{height:"100%", width:'100%', flex: 1, }}>

                        <View style={{alignItems:'center', marginTop:hp(5)}}>
                            <Image source={Logo} style={{width: wp(28), height:hp(22)}} />
                        </View>



                    <View style={{backgroundColor: 'rgba(43,48,68, 0.8)', width:'90%', alignSelf:'center', borderRadius:10, padding: 10, }}>
                        
                        <View style={{flexDirection:'row',justifyContent:'space-around', alignSelf:'center',}}>
                            <View style={{marginLeft:40}}>
                            <Button onPress={() => {type === "User" ? this.props.navigation.navigate('UserLogin', {type: type}) : this.props.navigation.navigate('DriverLogin', {type: type})}} style={{width:'70%', marginTop:20}} transparent full rounded>
                                    <Text style={{color:'#fff'}}>
                                        SIGN IN
                                    </Text>
                                </Button>
                            </View>

                            <View>
                                <Button style={{width:'80%', marginTop:20, backgroundColor:'#3A91FA', borderRadius:10}} full >
                                    <Text style={{color:'#fff'}}>
                                        SIGN UP
                                    </Text>
                                </Button>
                            </View>
                        </View>


                        <View style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center', width: '100%' , marginTop: 25}}>

                            <View> 
                                <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                    <Input style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => this.setState({ email: e })} placeholder='Nambe - Email' />
                                </Item>
                            </View>


                            <View> 
                                <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                    <Input style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => this.setState({ email: e })} placeholder='Cell phone' />
                                </Item>
                            </View>

                            <View style={{paddingVertical:10}}> 
                                <Item rounded  regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                    <Input secureTextEntry style={{color:'#fff'}} placeholderTextColor="#fff" onChangeText={(e) => this.setState({ email: e })} placeholder='Password' />
                                </Item>
                            </View>

                            <View> 
                                <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                    <Input style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => this.setState({ email: e })} placeholder='Code' />
                                </Item>
                            </View>
                        </View>

                        <View >
                            <Button onPress={() => this.props.navigation.navigate('UserLogin')} style={{width:'50%', alignSelf:'center', marginTop:20, backgroundColor:'#3A91FA'}} full rounded>
                                <Text style={{color:'#fff'}}>
                                    Create account
                                </Text>
                            </Button>
                        </View>

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
    signup,
  };


export default connect(mapStateToProps, mapDispatchToProps)(UserSignup);