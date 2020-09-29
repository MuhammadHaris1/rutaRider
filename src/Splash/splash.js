import React, { Component } from 'react'
import { Text, View, Image, AsyncStorage, ImageBackground } from 'react-native'
const splashBack = require('../../assets/Splash.png')
import { Spinner } from 'native-base'
const Logo = require('../../assets/Logo.png')
const loader = require('../../assets/loader.gif')
import {fetchProfile} from '../Redux/Actions/userAction';
import { connect } from 'react-redux';



class Splash extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    componentDidMount = async () => {
        const { fetchProfile } = this.props
      
        try {
            const value = await AsyncStorage.getItem('User');
            if (value !== null) {

                // console.log('value value value', value)

                var convertVal = JSON.parse(value)

                fetchProfile(convertVal)
                this.props.screenProps.fetchProfileData(convertVal)

                setTimeout(() => {
                this.props.navigation.navigate('Main')
                }, 3000)
           
            }else {
                setTimeout(() => {
                    this.props.navigation.navigate('Authentication')
                }, 3000)
            }
          } catch (error) {
                console.log('Errr getting data =>', error)
    
          }


        // setTimeout(() => {

        //     this.props.navigation.navigate('Authentication')
        // }, 3000)

    }


    render() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground source={splashBack} style={{height:"100%", width:'102%', flex: 1, justifyContent:'center',right:5}}> 

                    <View style={{alignItems:'center', marginTop:'5%'}}>
                            <Image source={Logo} style={{width: 109, height:149}} />
                    </View>

                    <View style={{  width:'100%', marginTop:20}}>
                        <Text style={{
                            fontFamily:'AVENGEANCE HEROIC AVENGER BI', 
                            fontSize:45, color:'#fff', letterSpacing:10, textAlign:'center', width:'100%'}}>
                            RUTA
                        </Text>
                    </View>
                
                    <View style={{alignItems:'center', marginTop:'5%'}}>
                         <Spinner size="large" color="#fff" />
                    </View>
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
    fetchProfile,
  };


export default connect(mapStateToProps, mapDispatchToProps)(Splash);