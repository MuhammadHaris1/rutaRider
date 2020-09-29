import React from 'react'
import {View, Text, ScrollView, ImageBackground, Image, TouchableOpacity, Dimensions} from 'react-native'
import { connect } from 'react-redux';
import {signup} from '../../../../Redux/Actions/userAction'
import { Item, Input, Label, Button } from 'native-base';
const signupBack = require('../../../../../assets/signupBack.png')
import CodeInput from 'react-native-confirmation-code-input';





class CodeNo extends React.Component {


    render() {
        const { value } = this.props.navigation.state.params
        console.log(value,'value', value.toString())
            return (
                <View style={{flex: 1}}>
                <ImageBackground source={signupBack} style={{height:"100%", width:'102%', flex: 1, right:5}}> 
                    <ScrollView>
                        <View style={{flex: 1, justifyContent:'center', alignItems:'center' }}>

                            <View style={{backgroundColor: 'rgba(43,48,68, 0.8)', width:'90%', borderRadius:10, padding: 10, marginTop: '30%', paddingVertical: '30%'}}>
                        
                                <View>
                                    <Text style={{textAlign:'center', fontSize: 25, color:'#fff', letterSpacing: 5}}>CODE  NO</Text>
                                </View>


                                <View>
                                    <CodeInput
                                        keyboardType="number-pad"
                                        activeColor='rgba(49, 180, 4, 1)'
                                        inactiveColor='rgba(49, 180, 4, 1.3)'
                                        autoFocus={false}
                                        ignoreCase={true}
                                        inputPosition='center'
                                        size={30}
                                        // defaultValue={"3"}
                                        onFulfill={(isValid) => { this.setState({ code: isValid }) }}
                                        containerStyle={{ marginTop: 30 }}
                                        codeInputStyle={{ borderBottomWidth: 1.5, borderBottomColor: "rgba(246, 232, 232, 0.7)", borderRadius: 5, color: "#fff", marginLeft: 10, borderWidth: 0, fontSize: 20 }}
                                    />
                                </View>


                                <View >
                                    <Button onPress={() => this.props.navigation.navigate('UserProfile')} style={{width:'70%', alignSelf:'center', marginTop:20, backgroundColor:'#3A91FA'}} full rounded>
                                        <Text style={{color:'#fff'}}>
                                            Submit
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


export default connect(mapStateToProps, mapDispatchToProps)(CodeNo);