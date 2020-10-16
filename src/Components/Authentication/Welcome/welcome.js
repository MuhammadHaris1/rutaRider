import React from 'react'
import {View, Text, TouchableOpacity, ImageBackground, ScrollView, Image, Platform} from 'react-native'
import { connect } from 'react-redux';
import {Button} from 'native-base'
const welcome = require('../../../../assets/welcome.png')
const Logo = require('../../../../assets/Logo.png')
const button = require('../../../../assets/Button.png')



class Welcome extends React.Component {
    constructor(props){
        super(props);

    }




    render() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground source={welcome} style={{height:"100%", width:'100%', flex: 1, justifyContent:'center'}}> 
                <ScrollView>

                    <View style={{height:"100%", width:'100%', flex: 1, }}>

                        <View style={{alignItems:'center', marginTop:'20%'}}>
                            <Image source={Logo} style={{width: 149, height:189}} />
                        </View>
                        
                        <View style={{  width:'100%', marginTop:20}}>
                            <Text style={{
                                fontFamily: Platform.OS === "android" ? 'AVENGEANCE HEROIC AVENGER BI' : null, 
                                fontSize:45, color:'#fff', letterSpacing:10, textAlign:'center', width:'100%'}}>
                                WELCOME
                            </Text>

                        <View >
                            <Button onPress={() => this.props.navigation.navigate('WelcomeHome', {type: "Driver"})} style={{width:'80%', alignSelf:'center', marginTop:20, backgroundColor:'#3A91FA'}} full rounded>
                                <Text style={{color:'#fff'}}>
                                    Entrar
                                </Text>
                            </Button>
                        </View>

                        <View>
                            <Button onPress={() => this.props.navigation.navigate('WelcomeHome', {type: "Driver"})} style={{width:'80%', alignSelf:'center', marginTop:20, backgroundColor:'#3A91FA'}} full rounded>
                                <Text style={{color:'#fff'}}>
                                   Crear cuenta
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
  };


export default connect(mapStateToProps, mapDispatchToProps)(Welcome);