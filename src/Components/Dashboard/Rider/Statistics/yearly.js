import React from 'react'
import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity, Dimensions} from 'react-native'
import { connect } from 'react-redux';
import FooterComponent from '../Footer/footer'
import { Header } from 'react-native-elements'
const welcome2 = require('../../../../../assets/welcome2.png')
const back = require('../../../../../assets/back.png')
import Speedometer from 'react-native-speedometer-chart';
const sidebar = require('../../../../../assets/sidebar.png')

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

  const screenWidth = Dimensions.get("window").width;


import Pusher from 'pusher-js/react-native'
import pusherConfig from '../../../../Constant/pusher.json'


const chartConfig = {
    backgroundGradientFrom: "#11aaff",
    backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(66, 135, 245, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };



class YearlyStatistics extends React.Component {
    constructor (props) {
        super(props)
        this.state = {

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


                            <TouchableOpacity onPress={() => this.props.navigation.navigate('MonthlyStatistics')} style={{padding:10}}>
                                <Text style={{color:'#fff', fontSize:20}}>
                                    Monthly
                                </Text>
                            </TouchableOpacity>
                            

                            <View style={{padding:10, borderBottomColor:'#3A91FA', borderBottomWidth:2,}}>
                                <Text style={{color:'#fff', fontSize:20}}>
                                    Yearly  
                                </Text>
                            </View>

                            </View>


                            <View style={{paddingVertical:15, alignSelf:'center'}}>
                                <Speedometer value={50} totalValue={100} showIndicator
                                outerColor="#d3d3d3"
                                internalColor="#3A91FA"
                                showText
                                text="65 KG"
                                />
                            </View>

                            <View style={{paddingVertical:15, alignSelf:'center'}}>
                                <BarChart
                                    // style={graphStyle}
                                    data={data}
                                    width={screenWidth}
                                    height={220}
                                    yAxisLabel="$"
                                    chartConfig={chartConfig}
                                    verticalLabelRotation={0}
                                    />
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


const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
	};
  };
  
  const mapDispatchToProps = {
  };


export default connect(mapStateToProps, mapDispatchToProps)(YearlyStatistics);