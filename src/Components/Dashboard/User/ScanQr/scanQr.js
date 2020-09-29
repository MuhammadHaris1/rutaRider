import React from 'react'
import {View, Text, ScrollView, ImageBackground, Image, TouchableOpacity, Dimensions} from 'react-native'
import { connect } from 'react-redux';
import {signup} from '../../../../Redux/Actions/userAction'
import { Item, Input, Label, Button } from 'native-base';
const scanqrBack = require('../../../../../assets/scanqrBack.png')
const welcome2 = require('../../../../../assets/welcome2.png')
const Logo = require('../../../../../assets/Logo.png')
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';


import * as Animatable from 'react-native-animatable';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = '#fff';

// const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = '#03E925';


class ScanQr extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            qrEnabled: false,
            scanned: false,
        }
    }




    onSuccess = e => {
        console.log(e);
        // alert(e.data);
        this.setState({ qrEnabled: false });
        this.props.navigation.navigate('CodeNo', {
            value: 22222 
        })
      };
    
      makeSlideOutTranslation(translationType, fromValue) {
        return {
          from: {
            [translationType]: SCREEN_WIDTH * -0.18,
          },
          to: {
            [translationType]: fromValue,
          },
        };
      }




       renderScanner = () => {


        return (
            <QRCodeScanner
                        onRead={this.onSuccess}
                        cameraStyle={{ height: SCREEN_HEIGHT, }}
                        containerStyle={{ backgroundColor: 'transparent', justifyContent:'center' }}
                        bottomViewStyle={{ backgroundColor: 'transparent' }}
                        showMarker
                        customMarker={
                            <View
                            style={[
                                styles.rectangleContainer,
                                { paddingBottom: this.state.qrEnabled ? 150 : null },
                            ]}>
                            <View style={styles.topOverlay} />

                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.leftAndRightOverlay} />

                                <View style={styles.rectangle}>
                                {/* <Image
                                    source={require('../../../../../assets/scanner.png')}
                                    style={{ width: '100%', height: 349 }}
                                /> */}

                                <Animatable.View
                                    // style={styles.scanBar}
                                    direction="alternate-reverse"
                                    iterationCount="infinite"
                                    duration={1700}
                                    easing="linear"
                                    animation={this.makeSlideOutTranslation(
                                    'translateY',
                                    SCREEN_WIDTH * -0.8
                                    )}
                                />
                                </View>

                                <View style={styles.leftAndRightOverlay} />
                            </View>

                            <View style={styles.bottomOverlay} />
                            </View>
                        }
                        // fadeIn
                        />
                    
                    
        )

      }




    render() {
        if(!this.state.qrEnabled) {

            return (
                <View style={{flex: 1}}>
                <ImageBackground source={scanqrBack} style={{height:"100%", width:'102%', flex: 1, justifyContent:'center', right:5}}> 
                    <ScrollView>
                        <View style={{height:"100%", width:'100%', flex: 1, }}>
                            
                            <View style={{flex:1, marginTop:'5%', flexDirection:'row',alignSelf:'center', marginTop: "20%"}}>
                                <Text style={{fontSize:25, color:'#fff', textAlign:'center', letterSpacing: 5}}>
                                    SCAN
                                </Text>
                                <Text style={{fontSize:25, color:'#fff', fontWeight:'bold', letterSpacing: 5, marginLeft: 20}}>
                                    QR
                                </Text>
                            </View>
    
    
    
                        <View style={{marginTop:'30%'}}>
    
                            <View >
                                <Button onPress={() => this.setState({qrEnabled: !this.state.qrEnabled})} style={{width:'80%', alignSelf:'center', marginTop:20, backgroundColor:'#3A91FA'}} full rounded>
                                    <Text style={{color:'#fff'}}>
                                        Picture - QR
                                    </Text>
                                </Button>
                            </View>
    
    
                            <View >
                                <Button onPress={() => this.setState({qrEnabled: !this.state.qrEnabled})} style={{width:'80%', alignSelf:'center', marginTop:20, backgroundColor:'#3A91FA'}} full rounded>
                                    <Text style={{color:'#fff'}}>
                                        Picture - QR
                                    </Text>
                                </Button>
                            </View>
    
    
                        </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
                </View>
            )

        }else{

            return(
                <View style={{flex: 1, backgroundColor:'rgb(43,48,68)'}}>
                    {/* <ImageBackground source={welcome2} style={{height:"100%", width:'102%', flex: 1, justifyContent:'center', right:5}}>  */}
                   

                    <ScrollView>
                        
                    <View style={{flex:1, marginTop:'5%', flexDirection:'row',alignSelf:'center', marginTop: "20%"}}>
                        <Text style={{fontSize:25, color:'#fff', textAlign:'center', letterSpacing: 5}}>
                            SCAN
                        </Text>
                        <Text style={{fontSize:25, color:'#fff', fontWeight:'bold', letterSpacing: 5, marginLeft: 20}}>
                            QR
                        </Text>
                    </View>

                    <View style={{alignItems:'center', width:'100%'}}>
                         {this.renderScanner()}
                    </View>
                    </ScrollView>
                    {/* </ImageBackground> */}
                </View>
            )

        }
    }
}


const overlayColor = 'rgb(43,48,68)'; // this gives us a black color with a 50% transparency

const styles = {
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: rectDimensions,
    width: '72%',
    // borderWidth: rectBorderWidth,
    // borderColor: rectBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignSelf:'center',
    // paddingBottom: 100
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25,
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },

  scanBar: {
    width: '100%',
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },
};



const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
	};
  };
  
  const mapDispatchToProps = {
    signup,
  };


export default connect(mapStateToProps, mapDispatchToProps)(ScanQr);