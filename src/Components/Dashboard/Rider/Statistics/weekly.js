import React from 'react'
import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity, Dimensions} from 'react-native'
import { connect } from 'react-redux';
import FooterComponent from '../../Rider/Footer/footer'
import { Header } from 'react-native-elements'
const welcome2 = require('../../../../../assets/welcome2.png')
const back = require('../../../../../assets/back.png')
const statistcsLift = require('../../../../../assets/statistcsLift.png')
const statistcsPickup = require('../../../../../assets/statistcsPickup.png')
const statstcsLifting = require('../../../../../assets/statstcsLifting.png')
const complete = require('../../../../../assets/complete.png')
const sidebar = require('../../../../../assets/sidebar.png')

const screenWidth = Dimensions.get("window").width;
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

  import Pusher from 'pusher-js/react-native'
  import pusherConfig from '../../../../Constant/pusher.json'


  const data = {
    labels: ["M", "T", "W", "T", "F"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99],
        color: (opacity = 1) => `rgba(66, 135, 245, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    // legend: ["Rainy Days"] // optional
  };


  const chartConfig = {
    backgroundGradientFrom: "#11aaff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(66, 135, 245, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
  };

class WeeklyStatistics extends React.Component {
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
                    <ScrollView contentContainerStyle={{paddingBottom: 70}}>
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

                                <View style={{padding:10, borderBottomColor:'#3A91FA', borderBottomWidth:2,}}>
                                    <Text style={{color:'#fff', fontSize:20}}>
                                        Weekly  
                                    </Text>
                                </View>

                                <TouchableOpacity onPress={() => {this.props.navigation.navigate('MonthlyStatistics')}} style={{padding:10}}>
                                    <Text style={{color:'#fff', fontSize:20}}>
                                        Monthly
                                    </Text>
                                </TouchableOpacity>


                                <TouchableOpacity onPress={() => this.props.navigation.navigate('YearlyStatistics')} style={{padding:10}}>
                                    <Text style={{color:'#fff', fontSize:20}}>
                                        Yearly
                                    </Text>
                                </TouchableOpacity>

                            </View>


                            <View style={{paddingVertical:15}}>
                                <LineChart
                                    data={data}
                                    width={screenWidth-10}
                                    height={256}
                                    verticalLabelRotation={0}
                                    chartConfig={chartConfig}
                                    bezier
                                />
                            </View>



                    <View style={{flexDirection:'row', width:'100%', justifyContent:'space-around'}}>

                        <View style={{width:'25%', backgroundColor:'#3C91FB', borderRadius: 10, paddingVertical: '5%'}}>
                                
                                <View>
                                    <Image source={statistcsLift} style={{height:40, width: 35, alignSelf:'center'}} />
                                </View>

                                <View>
                                    <Text style={{color:'#fff', textAlign:'center', paddingVertical: '5%'}}>Lift Crousel</Text>
                                    <Text style={{color:'#fff', textAlign:'center'}}>0%</Text>
                                </View>
                        </View>


                        <View style={{width:'25%', backgroundColor:'#3C91FB', borderRadius: 10, paddingVertical: '5%'}}>
                                
                                <View>
                                    <Image source={statistcsPickup} style={{height:40, width: 35, alignSelf:'center'}} />
                                </View>

                                <View>
                                    <Text style={{color:'#fff', textAlign:'center', paddingVertical: '5%'}}>Pickup</Text>
                                    <Text style={{color:'#fff', textAlign:'center'}}>25%</Text>
                                </View>
                        </View>


                        <View style={{width:'25%', backgroundColor:'#3C91FB', borderRadius: 10, paddingVertical: '5%'}}>
                                
                                <View>
                                    <Image source={statstcsLifting} style={{height:40, width: 35, alignSelf:'center'}} />
                                </View>

                                <View>
                                    <Text style={{color:'#fff', textAlign:'center', paddingVertical: '5%'}}>Lifting</Text>
                                    <Text style={{color:'#fff', textAlign:'center'}}>30%</Text>
                                </View>
                        </View>
                    </View>



                    <View style={{backgroundColor:'#fff', width:'90%', borderRadius : 10, paddingVertical:'5%', alignSelf:'center', top: 10}}>

                            {[1, 2].map((e,index) => {
                                return(
                                    <View key={index} style={e%2 === 1 ? {flexDirection:'row', backgroundColor:'#3C91FB', width:'90%', alignSelf:'center', padding:10 , borderRadius : 10, justifyContent:'space-between', marginTop:5} : {flexDirection:'row', backgroundColor:'#292E42', width:'90%', alignSelf:'center', padding:10 , borderRadius : 10, justifyContent:'space-between', marginTop:5}}>


                                        <View style={{flexDirection:'row',}}>
                                            <View>
                                                <Text style={{color: '#fff', paddingHorizontal: 10}}>
                                                    Mon
                                                </Text>
                                            </View>

                                            <View style={{height:20, width:1 , backgroundColor:'#fff'}} />

                                            <View>
                                                <Text style={{color: '#fff', paddingHorizontal: 10}}>
                                                    Lifting
                                                </Text>
                                            </View>

                                            </View>

                                {e%2 === 1 &&  <View>
                                                <Image source={complete} style={{height:20, width: 20}} />
                                            </View>}
                                </View>
                                )
                            })}
                        


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


export default connect(mapStateToProps, mapDispatchToProps)(WeeklyStatistics);