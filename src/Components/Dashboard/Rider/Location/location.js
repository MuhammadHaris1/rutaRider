import React from 'react'
import {View, Text, ScrollView, ImageBackground, Image, TouchableOpacity, Dimensions} from 'react-native'
import { connect } from 'react-redux';
import {signup} from '../../../../Redux/Actions/userAction'
import { Item, Input, Label, Button } from 'native-base';
const profileBack = require('../../../../../assets/profileBack.png')


class Location extends React.Component {


    render() {
        const { value } = this.props.navigation.state.params

            return (
                <View style={{flex: 1}}>
                <ImageBackground source={profileBack} style={{height:"100%", width:'102%', flex: 1, right:5}}> 
                    <ScrollView>
                        <View style={{flex: 1, justifyContent:'center', alignItems:'center' }}>

                            <Text>
                                Location
                            </Text>


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


export default connect(mapStateToProps, mapDispatchToProps)(Location);