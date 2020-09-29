import React from 'react'
import {View, Text, TouchableOpacity, ImageBackground, Image, ScrollView, Alert, Modal} from 'react-native'
import { connect } from 'react-redux';
import {signup} from '../../../../Redux/Actions/userAction'
import { Item, Input, Label, Button, Spinner } from 'native-base';
const signupBack = require('../../../../../assets/signupBack.png')
const Logo = require('../../../../../assets/Logo.png')
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
import ImagePicker from 'react-native-image-picker'

class DriverSignup extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            fname:'',
            lname:'',
            email:'',
            password: '',
            phone:'',
            model:'',
            licenseNumber: '',
            nicNumber: '',
            fileName: "",
            fileUri: "",
            profilePic: false,
        }
    }




    openGallery = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                //   const source = { uri: response.uri };
                // You can also display the image using data:
                const source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log("uri: response.uri", source, response)

                this.setState({
                    profilePic: source,
                    fileName: response.fileName,
                    fileUri: response.uri
                });
            }
        });
    }



    signup = ( ) => {
        const {fname, lname, email, phone, password, model, licenseNumber, nicNumber, fileName, fileUri} = this.state



        var data = new FormData();

            var file = {
                uri: fileUri,
                name: fileName,
                type: 'image/png'
            }
        
        if( fname && lname && email && phone && password ){
                // data.append("file_upload", file)
                data.append('action', 'user_registration');
                data.append('role', 'rider');
                data.append('first_name', fname);
                data.append('last_name', lname);
                data.append('email', email);
                data.append('ph_number', phone);
                data.append('password', password);
                // data.append('model', model);
                // data.append('license', licenseNumber);
                // data.append('vehicle_no', nicNumber);
                // data.append('vehicle_paper', file);

                this.props.signup(data)
                // console.log("SIGNUP DATA", data)
        }else {
            Alert.alert("Alert", "All fields are required")
        }

    }




    render() {
        // const { type } = this.props.navigation.state.params
        const { fetching } = this.props
        return (
            <View style={{flex: 1}}>
                <ImageBackground source={signupBack} style={{height:"100%", width:'100%', flex: 1, justifyContent:'center'}}> 
                    <ScrollView>
                        <View style={{height:"100%", width:'100%', flex: 1, }}>

                        <View style={{alignItems:'center', marginTop:'5%'}}>
                            <Image source={Logo} style={{width: wp(28), height:hp(22)}} />
                        </View>



                    <View style={{backgroundColor: 'rgba(43,48,68, 0.8)', width:'90%', alignSelf:'center', borderRadius:10, padding: 10}}>
                        
                        <View style={{flexDirection:'row',justifyContent:'space-around', alignSelf:'center',}}>
                            <View style={{marginLeft:40}}>
                            <Button onPress={() => {
                                // type === "User" ? this.props.navigation.navigate('UserLogin', {type: type}) : this.props.navigation.navigate('DriverLogin', {type: type})
                                this.props.navigation.navigate('DriverLogin')
                                }} style={{width:'70%', marginTop:20}} transparent full rounded>
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
                                    <Input style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => this.setState({ fname: e })} placeholder='First Name' />
                                </Item>
                            </View>

                            <View> 
                                <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                    <Input style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => this.setState({ lname: e })} placeholder='Last Name' />
                                </Item>
                            </View>

                            <View> 
                                <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                    <Input style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => this.setState({ email: e })} placeholder='Email' />
                                </Item>
                            </View>


                            <View> 
                                <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                    <Input style={{color:'#fff'}} keyboardType="number-pad" placeholderTextColor="#fff" onChangeText={(e) => this.setState({ phone: e })} placeholder='Cell phone' />
                                </Item>
                            </View>

                            <View style={{}}> 
                                <Item rounded  regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                    <Input secureTextEntry style={{color:'#fff'}} placeholderTextColor="#fff" onChangeText={(e) => this.setState({ password: e })} placeholder='Password' />
                                </Item>
                            </View>


                            {/* <View> 
                                <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                    <Input style={{color:'#fff'}} keyboardType="number-pad" placeholderTextColor="#fff" onChangeText={(e) => this.setState({ model: e })} placeholder='Vehicle Model' />
                                </Item>
                            </View>

                            <View> 
                                <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                    <Input keyboardType="number-pad" style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => this.setState({ licenseNumber: e })} placeholder='License Number' />
                                </Item>
                            </View>

                            <View> 
                                <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                    <Input keyboardType="number-pad" style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => this.setState({ nicNumber: e })} placeholder='Identity Card Number' />
                                </Item>
                            </View>


                            <TouchableOpacity onPress={this.openGallery}> 
                                <Item onPress={this.openGallery}  rounded regular style={{ width: '80%', marginTop: '2%', borderColor:'#3A91FA' }}>
                                    <Input style={{color:'#fff'}} disabled value={this.state.fileName}  placeholderTextColor="#fff" onChangeText={(e) => this.setState({ email: e })} placeholder='Upload Vehicle Papers' />
                                </Item>
                            </TouchableOpacity > */}
                        </View>

                        <View >
                           {fetching ? 
                                <Spinner size="large" color="#3A91FA"/>
                           :
                           <Button onPress={() => {
                                // type === "User" ? this.props.navigation.navigate('UserLogin', {type: type}) : this.props.navigation.navigate('DriverLogin', {type: type})
                                this.signup()
                                
                                }} style={{width:'50%', alignSelf:'center', marginTop:20, backgroundColor:'#3A91FA'}} full rounded>
                                <Text style={{color:'#fff'}}>
                                    Create account
                                </Text>
                            </Button>}
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


export default connect(mapStateToProps, mapDispatchToProps)(DriverSignup);