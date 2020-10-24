/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Navigator from './src/Navigation/navigation'
import { Provider } from 'react-redux';
import store from './src/Redux/Store/store'
import NavigtionService from './src/Navigation/NavigationService';

import Pusher from 'pusher-js/react-native';
import pusherConfig from './src/Constant/pusher.json'
export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      profileData: '',
    }

        // if(this.state.profileData.data){
          // this.pusher = new Pusher(pusherConfig.key, pusherConfig);
          // console.log("puseher APP>JS", this.state.profileData)
          // this.userChannel = this.pusher.subscribe('30')
          // this.userChannel.bind('new-booking', (e) => {
          //         console.log("NEW BOOKING APP>JS", e)
          //         // this.handleRideRequest(e)
          // })
          // this.userChannel.bind('ride-accepted', (e) => {
          //     console.log("NEW ride-accepted'", e)
          // })
        // }
  }



  fetchProfileData = (data) => {
    this.setState({
      profileData: data
    })
  }
  


  render() {
    console.disableYellowBox = true
    return (
      <View style={{ flex:1 }}>
        <Provider store={store}>
          <Navigator 
          screenProps={{ fetchProfileData: this.fetchProfileData, profileData: this.state.profileData }}
          ref={(navigatorRef) => {
            NavigtionService.setTopLevelNavigator(navigatorRef);
            }} />
          </Provider>
      </View>
    );
  }
};

