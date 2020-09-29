import React from 'react'
import {View, Text, ScrollView, ImageBackground, Image, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import {signup} from '../../../../Redux/Actions/userAction'
import { Item, Input, Label, Button } from 'native-base';
const homeBack = require('../../../../../assets/homeBack.png')
const Logo = require('../../../../../assets/Logo.png')
import FooterComponent from '../../User/Footer/footer'
class Dashboard extends React.Component {
    constructor(props){
        super(props);
    }




    render() {
        return (
            <View style={{flex: 1}}>
            <ImageBackground source={homeBack} style={{height:"100%", width:'102%', flex: 1, justifyContent:'center',right:5}}> 
                <ScrollView>
                    <View style={{height:"100%", width:'100%', flex: 1, }}>
                        
                        <View style={{alignItems:'center', marginTop:'5%'}}>
                            <Image source={Logo} style={{width: 129, height:169}} />
                        </View>




                        <View style={{flexDirection:'row', justifyContent:'space-around', paddingVertical:'25%', width:'100%'}}>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ScanQr')} style={{justifyContent:'center', alignContent:'center', backgroundColor:'rgba(58, 145, 250, 0.9)', padding: 30, height:150, borderRadius: 10, borderWidth:1, borderColor:'#fff', width:'40%'}}>
                                <Text style={{color:'#fff', width:'100%', textAlign:'center'}}>
                                    Producto
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ScanQr')} style={{justifyContent:'center', alignContent:'center', backgroundColor:'rgba(41, 46, 66, 0.9)', padding: 30, height:145, borderRadius: 10,  width:'40%'}}>
                                <Text style={{color:'#fff', width:'100%', textAlign:'center'}}>
                                    Producto
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </ScrollView>
            {/* <FooterComponent goto={(e) => this.props.navigation.navigate(e)} active={"home"} /> */}
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


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);