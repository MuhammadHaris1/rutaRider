import React from 'react'
import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity, StyleSheet} from 'react-native'
import { connect } from 'react-redux';
import FooterComponent from '../../Rider/Footer/footer'
import { Header } from 'react-native-elements'
const welcome2 = require('../../../../../assets/welcome2.png')
const back = require('../../../../../assets/back.png')
import * as Progress from 'react-native-progress';
const sidebar = require('../../../../../assets/sidebar.png')
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Pusher from 'pusher-js/react-native'
import pusherConfig from '../../../../Constant/pusher.json'

class MonthlyStatistics extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            progress: 0,
            indeterminate: true,
        }

        this.pusher = new Pusher(pusherConfig.key, pusherConfig);
        console.log("puseher Profile", props.screenProps.profileData.data.id)
        this.userChannel = this.pusher.subscribe(props.screenProps.profileData.data.id)
        this.userChannel.bind('new-booking', (e) => {
                props.navigation.navigate('Map', {
                    reqDetailParam: e 
                })
                console.log("NEW BOOKING Profile", e, props.navigation)
                // this.handleRideRequest(e)
                
        })
        this.userChannel.bind('ride-accepted', (e) => {
            console.log("NEW ride-accepted'", e)
        })
    }

    componentDidMount = () => {
        this.updateProgress()
    }

    updateProgress = () => {
        // setInterval(() => {
        //   this.setState({ progress: this.state.progress + 0.25 })
        // }, 1000);
        // if (this.state.progress > 1) {
        //   this.updateProgress()
        // }

        let progress = 0;
        this.setState({ progress });
        setTimeout(() => {
          this.setState({ indeterminate: false });
          setInterval(() => {
              if(progress < 0.4) {
                progress += Math.random() / 5;
              }
            if (progress > 1) {
              progress = 1;
            }
            this.setState({ progress });
          }, 500);
        }, 1500);
      }



    render () {
        return(
            <View style={{flex: 1}}>
                <ImageBackground source={welcome2} style={{height:"100%", width:'102%', flex: 1, justifyContent:'center',right:5}}> 
                    <ScrollView>
                        <View style={{height:"100%", width:'100%', flex: 1, }}>
                        <Header
                            containerStyle={{backgroundColor:'transparent', borderBottomWidth: 0}}
                            centerComponent={
                                <View>
                                    <Text style={{color:'#fff', fontSize:25}}>STATISTICS</Text>
                                </View>
                            }
                            leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Image source={back} style={{height: 20, width: 20}} />
                            </TouchableOpacity>}

                            rightComponent={
                                <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                                <Image source={sidebar} style={{height: 20, width: 20}} />
                                </TouchableOpacity>
                            }
                            />

                            <View style={{width:'100%', padding:5, flexDirection:'row', justifyContent:'space-around'}}>

                            <TouchableOpacity onPress={() => {this.props.navigation.navigate('WeeklyStatistics')}} style={{padding:10}}>
                                <Text style={{color:'#fff', fontSize:20}}>
                                    Weekly
                                </Text>
                            </TouchableOpacity>

                            <View style={{padding:10, borderBottomColor:'#3A91FA', borderBottomWidth:2,}}>
                                <Text style={{color:'#fff', fontSize:20}}>
                                    Monthly  
                                </Text>
                            </View>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('YearlyStatistics')} style={{padding:10}}>
                                <Text style={{color:'#fff', fontSize:20}}>
                                    Yearly
                                </Text>
                            </TouchableOpacity>

                            </View>





                        <View style={{paddingVertical:45, alignSelf:'center'}}>
                            <View style={{flexDirection: 'row', justifyContent:'space-around'}}>

                                <View>
                                        <Progress.Circle
                                        style={styles.progress}
                                        progress={this.state.progress}
                                        unfilledColor="#fff"
                                        thickness={15}
                                        indeterminate={false}
                                        showsText={true}
                                        textStyle={{ color:'#fff' }}
                                        size={100}
                                    />
                                </View>

                                <View style={{top: '5%'}}>
                                     <View style={{width: '80%'}}>
                                        <Text style={{color:'#bdbdbd', letterSpacing: 2}}>
                                            Average Level
                                        </Text>
                                    </View>
                                    <View style={{width: '80%'}}>
                                        <Text style={{color:'#fff'}}>
                                            NOVEMBER 2019
                                        </Text>
                                    </View>
                                    <View style={{backgroundColor:'rgba(0, 122, 255, 1)', flexDirection:'row', width: '80%', padding:5}}>
                                            <View style={{backgroundColor:'#fff', width:'70%', height: 15}} />
                                            <View>
                                                <Text style={{color:'#fff', left: 5, bottom: 3}}>{ 100 - Math.round(this.state.progress* 100 )}%</Text>
                                            </View>

                                    </View>
                                </View>

                            </View>
                        </View>

                        <View style={{width:'90%', backgroundColor:'#fff', borderRadius: 10, alignSelf:'center'}}>

                            <View >
                                <Text style={{color:'#000', paddingVertical:5, paddingHorizontal: 10, fontWeight:'bold'}}>
                                    Review Report
                                </Text>
                            </View>

                            <View style={{width:'95%'}}>
                                <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal: 10,}}>
                                    <Text style={{color:'#000'}}>Steps</Text>
                                    <Text style={{color:'#000'}}>20393</Text>

                                </View>
                               <Progress.Bar
                                style={styles.progress}
                                width={wp(85)}
                                progress={this.state.progress}
                                indeterminate={false}
                                unfilledColor="rgb(41, 46, 66)"
                                
                                />
                            </View>


                            <View style={{width:'95%'}}>
                                <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal: 10,}}>
                                    <Text style={{color:'#000'}}>Distance</Text>
                                    <Text style={{color:'#000'}}>350km</Text>

                                </View>
                               <Progress.Bar
                                style={styles.progress}
                                width={wp(85)}
                                progress={this.state.progress}
                                indeterminate={false}
                                unfilledColor="rgb(41, 46, 66)"
                                
                                />
                            </View>

                        </View>

                        </View>
                    </ScrollView>
                    <FooterComponent goto={(e) => this.props.navigation.navigate(e, {
                    reqDetailParam: false 
                })} active={"statistics"} />
                </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingVertical: 20,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    circles: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    progress: {
      margin: 10,
    },
  });


const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
	};
  };
  
  const mapDispatchToProps = {
  };


export default connect(mapStateToProps, mapDispatchToProps)(MonthlyStatistics);