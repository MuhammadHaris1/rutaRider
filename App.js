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
import messaging from '@react-native-firebase/messaging';
import FlashMessage from "react-native-flash-message";

import { LocalizationProvider } from './src/Localization/LocalizationContext';
import { Root, Spinner } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      profileData: '',
      loading: true,
    }
   
  }

  componentDidMount () {
    // AsyncStorage.clear()
    console.log(" this.props.navigation.state Notification APP.JS")
    
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if(remoteMessage) {
        console.log(
          'Notification caused app to open from quit state: this.props.navigation.state ',
          remoteMessage,
          );
        NavigtionService.navigate("Splash", {notification: true})
        }
      });

      messaging().onNotificationOpenedApp(remoteMessage => {
        if(remoteMessage) {
          console.log(
            ' Notification caused app to open from background state:',
            remoteMessage.notification,
          );
          NavigtionService.navigate("Splash", {notification: true})
        }
      });

        // Check whether an initial notification is available
          
        // setTimeout(() => {
          this.setState({ loading: false });
        // }, 9000)
      }


  fetchProfileData = (data) => {
    this.setState({
      profileData: data
    })
  }
  


  render() {
    console.disableYellowBox = true
    if (this.state.loading) {
      return <Spinner />
    }
    return (
      <View style={{ flex:1 }}>
        <Provider store={store}>
        <LocalizationProvider>
            <Root>
            {this.state.loading ? 
              <Spinner /> 
            : 
              <Navigator 
                screenProps={{ fetchProfileData: this.fetchProfileData, profileData: this.state.profileData }}
                ref={(navigatorRef) => {
                  NavigtionService.setTopLevelNavigator(navigatorRef);
                  }} />
            }
            </Root>
          </LocalizationProvider>
          </Provider>
          <FlashMessage position="top" style={{marginTop: 10, backgroundColor:'#3A91FA'}}  />
      </View>
    );
  }
};

