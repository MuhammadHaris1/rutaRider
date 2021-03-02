import React, {useContext, useState} from 'react'
import { View, Text, ScrollView, ImageBackground, Image, Alert, ActivityIndicator } from 'react-native'
import { Input, Item, Button } from 'native-base'
import CodeInput from 'react-native-confirmation-code-input';
import { connect } from 'react-redux';
import {signup, forgotPassword, changePassword} from '../../../../Redux/Actions/userAction'
import { LocalizationContext } from '../../../../Localization/LocalizationContext';

const Logo = require('../../../../../assets/Logo.png')
const welcome = require('../../../../../assets/welcome.png')

const ForgotPassword = (props) => {

    const [email, setEmail] = useState('razamudassir912@gmail.com')
    const [code, setCode] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setconfirmPass] = useState('')
    const [userId, setuserId] = useState('')

    const contextType = useContext(LocalizationContext)
    const { translations, appLanguage } = contextType
    const [showModule, setModule] = useState('renderEmail')


    const sendOtp = () => {
        const { forgotPassword } = props
        var data = new FormData();
        data.append('action', 'forget_pass');
        data.append('email', email);
        forgotPassword(data, translations, appLanguage)
        .then((res) => {
            if(res.status){
                setModule('renderCode')
                Alert.alert(translations.ALERT, res.message)
            }else{
                Alert.alert(translations.ALERT, res.message)
            }
        })
    }

    const checkOtp = () => {
        const { forgotPassword } = props
        var data = new FormData();
        data.append('action', 'verifyToken');
        data.append('email', email);
        data.append('token', code);
        console.log('TOKEN FORMDAYA',data)
        forgotPassword(data)
        .then((res) => {
            if(res.status){
                setModule('renderChangePassword')
                setuserId(res.userId)
                Alert.alert(translations.ALERT, res.message)
            }else{
                Alert.alert(translations.ALERT, res.message)
            }
        })
    }

    const changePassword = () => {
        const { forgotPassword } = props
        if(newPass == confirmPass){
            var data = new FormData();
            data.append('action', 'new_pass');
            data.append('userId', userId);
            data.append('password', newPass);
            data.append('con_password', confirmPass);

            forgotPassword(data)
            .then((res) => {
                if(res.status){
                    props.navigation.navigate('DriverLogin')
                    Alert.alert(translations.ALERT, res.message)
                }else{
                    Alert.alert(translations.ALERT, res.message)
                }
            })
        }else {
            Alert.alert(translations.ALERT, translations.PASSWORD_NOT_MATCH)
        }
    }



   const renderEmail = () => {
    const { fetching } = props

        return (
            <View style={{backgroundColor: 'rgba(43,48,68, 1)', width:'90%', alignSelf:'center', borderRadius:10, padding: 30, marginTop:'10%'}}>
                        <View style={{alignItems:'center'}}> 
                            <Item rounded regular style={{ width: '98%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                <Input style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => setEmail(e)} placeholder={translations.EMAIL} />
                            </Item>
                        </View>

                       {fetching ? 

                        <View style={{paddingVertical: 10}}>
                            <ActivityIndicator color="#3A91FA" size="large" />
                        </View>

                       :
                       <Button onPress={() => {
                            sendOtp()
                            }} style={{width:'50%', alignSelf:'center', marginTop:20, backgroundColor:'#3A91FA'}} full rounded>
                            <Text style={{color:'#fff'}}>
                                {translations.CONTINUE}
                            </Text>
                        </Button>}
                    </View>
        )
    }

    const renderCode = () => {
        const { fetching } = props
        return(
            <View style={{backgroundColor: 'rgba(43,48,68, 1)', width:'90%', alignSelf:'center', borderRadius:10, padding: 30, marginTop:'10%'}}>
                <CodeInput
                    activeColor='#3A91FA'
                    inactiveColor='#3A91FA'
                    autoFocus={true}
                    ignoreCase={true}
                    inputPosition='center'
                    size={50}
                    containerStyle={{ marginTop: 30 }}
                    codeInputStyle={{ borderWidth: 1.5, borderRadius: 5 }}
                    onFulfill={(isValid, code) => setCode(isValid)}
                    />

                {fetching ? 
                <View style={{paddingVertical: 10}}>
                    <ActivityIndicator color="#3A91FA" size="large" />
                </View>
                :
                <Button onPress={() => {
                    checkOtp()
                    }} style={{width:'50%', alignSelf:'center', marginTop:20, backgroundColor:'#3A91FA'}} full rounded>
                    <Text style={{color:'#fff'}}>
                        {translations.CONTINUE}
                    </Text>
                </Button>}
            </View>
        )
    }

    const renderChangePassword = () => {
        const { fetching } = props
        return (
            <View style={{backgroundColor: 'rgba(43,48,68, 1)', width:'90%', alignSelf:'center', borderRadius:10, padding: 30, marginTop:'10%'}}>
                        <View style={{alignItems:'center'}}> 
                            <Item rounded regular style={{ width: '98%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                <Input secureTextEntry style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => setNewPass(e)} placeholder='New Password' />
                            </Item>
                        </View>

                        <View style={{alignItems:'center'}}> 
                            <Item rounded regular style={{ width: '98%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                <Input secureTextEntry style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => setconfirmPass(e)} placeholder='Confirm Password' />
                            </Item>
                        </View>
                        {fetching ? 
                        <View style={{paddingVertical: 10}}>
                            <ActivityIndicator color="#3A91FA" size="large" />
                        </View>
                        :
                        <Button onPress={() => {
                            changePassword()
                            }} style={{width:'50%', alignSelf:'center', marginTop:20, backgroundColor:'#3A91FA'}} full rounded>
                            <Text style={{color:'#fff'}}>
                                Done
                            </Text>
                        </Button>}
                    </View>
        )
    }
 
    return(
        <View style={{flex: 1}}>
            <ImageBackground source={welcome} style={{height:"100%", width:'100%', flex: 1, justifyContent:'center'}}> 
                <ScrollView>
                    <View style={{height:"100%", width:'100%', flex: 1, }}>
                        <View style={{alignItems:'center', marginTop:'5%'}}>
                            <Image source={Logo} style={{width: 149, height:189}} />
                        </View>
                    </View>

                    {showModule == 'renderEmail' && renderEmail()}
                    {showModule == 'renderCode' && renderCode()}
                    {showModule == 'renderChangePassword' && renderChangePassword()}
                    

                </ScrollView>
            </ImageBackground>
        </View>
    )
}


const mapStateToProps = state => {
	return {
        fetching: state.user.fetching,
	};
  };
  
  const mapDispatchToProps = {
    forgotPassword, changePassword
  };


export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);