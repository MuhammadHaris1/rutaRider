import React from 'react'
import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, Alert, Linking } from 'react-native'
import { connect } from 'react-redux';
import {Input, Item, Button, Spinner} from 'native-base'
const emergencyBack = require('../../../../../assets/emergencyBack.png')
const Logo = require('../../../../../assets/Logo.png')
const emeergecy = require('../../../../../assets/emeergecy.png')
import FooterComponent from '../Footer/footer'
import {Picker} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { LocalizationContext } from '../../../../Localization/LocalizationContext';
class Emergency extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            emergencyNumber: ''
        }
    }


    static contextType = LocalizationContext
    render() {
        const { translations } = this.context
        const { emergencyNumber } = this.props
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
                                <Input value={this.state.emergencyNumber} disabled keyboardType="number-pad"  style={{color:'#fff'}}  placeholderTextColor="#fff" onChangeText={(e) => this.setState({ emergencyNumber: e })} placeholder={translations.EMERGENCY_NUMBERS} />
                            </Item>
                        </View> 

                        <View style={{alignItems:'center', paddingVertical: '5%'}}>
                            <Text style={{color:'#fff', fontSize:20}}>{translations.FIRE}, {translations.NATIONAL_POLICE}</Text>    
                        </View> 

                        <View style={{borderRadius: 30, borderColor: '#3A91FA', borderWidth: 1, marginVertical:'2%',width: widthPercentageToDP(75), alignSelf:'center'}}>
                           {this.props.fetching ? 
                                <Spinner color="#000" />
                            :
                            <Picker
                                selectedValue={this.state.emergencyNumber}
                                style={{height: 50, width: widthPercentageToDP(75), color:'#fff'}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({emergencyNumber: itemValue})
                                }>
                                     {/* <Picker.Item label="Java" value="java" /> */}
                                 {emergencyNumber.map((val, ind) => {
                                     return(
                                        <Picker.Item color="#000" key={ind} label={val.description ? val.description.toString() : "Not defined"} value={val.number.toLocaleString()} />
                                    )
                                 })}
                                </Picker>
                        }
                        </View>

                     {/* {this.state.emergencyNumber ? <View style={{alignItems:'center', marginTop: '5%'}}>
                            <Text style={{color:'#fff', fontSize:35}}>{this.state.emergencyNumber}</Text>    
                        </View> : null}  */}

                        <View >
                            <Button
                            onPress={() => {
                                if(this.state.emergencyNumber != '') {
                                    Linking.openURL(`tel:${this.state.emergencyNumber}`)
                                }else {
                                    Alert.alert(translations.ALERT, translations.PLEASE_SELECT_EMERGENCY_NUMBER)
                                }
                            }}
                            style={{width:'40%', alignSelf:'center', marginTop:5 ,
                            backgroundColor: 'rgba(45, 48, 67, 0.8)'}} full rounded>
                                <Text style={{color:'#fff', textAlign:'center'}}>
                                    {translations.CALL}
                                </Text>
                            </Button>
                        </View>



                    </View>
                </ScrollView>
                
                <FooterComponent goto={(e) => this.props.navigation.navigate(e)} active={"call"} />
            </ImageBackground>
            </View>
        )
    }
}



const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        emergencyNumber: state.user.emergencyNumber
	};
  };
  
  const mapDispatchToProps = {
  };


export default connect(mapStateToProps, mapDispatchToProps)(Emergency);