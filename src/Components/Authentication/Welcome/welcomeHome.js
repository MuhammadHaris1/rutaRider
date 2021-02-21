import React from 'react'
import {View, Text, TouchableOpacity, ImageBackground, ScrollView, Image, Dimensions} from 'react-native'
import { connect } from 'react-redux';
import {Button} from 'native-base'
const welcome = require('../../../../assets/welcome2.png')
const Logo = require('../../../../assets/Logo.png')
const driver = require('../../../../assets/driver.jpg')
const { width, height } = Dimensions.get("window")
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { LocalizationContext } from '../../../Localization/LocalizationContext';

class WelcomeHome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [
                {
                    img: driver
                },
                {
                    img: driver
                },
                {
                    img: driver
                },
                {
                    img: driver
                },
                {
                    img: driver
                },
            ],
            activeSlide: 0
        }
    }



    _renderItem = ({ item, index }) => { 
        
        return(
            <View style={{height: hp(55) }}>
                <Image source={item.img} style={{height: hp(55) , width: wp(60)}} />
            </View>
        )
    
    }



     pagination () {
        const { items, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={items.length}
              activeDotIndex={activeSlide}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                //   marginHorizontal: 8,,
                  padding:0,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.7}
              inactiveDotScale={0.6}
            />
        );
    }



    static contextType = LocalizationContext
    render() {
        const { translations, setAppLanguage, appLanguage } = this.context
        const { items } = this.state
        const { type } = this.props.navigation.state.params
        // console.log("type === Driver",type === "Driver")

        return (
            <View style={{flex: 1}}>
            <ImageBackground source={welcome} style={{height:"100%", width:'100%', flex: 1, justifyContent:'center'}}> 
            <ScrollView>

                <View style={{height:"100%", width:'100%', flex: 1, }}>

                    <View style={{  width:'100%'}}>
                    
                        <View>
                            <Carousel
                                autoplay
                                ref={(c) => { this._carousel = c; }}
                                data={items}
                                renderItem={this._renderItem}
                                sliderWidth={wp(100)}
                                itemWidth={wp(60)}
                                layout="default"
                                extraData={this.state}
                                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                            
                            />
                            {this.pagination()}
                        </View>

                        {/* <Text style={{fontSize:45, color:'#fff', letterSpacing:10, textAlign:'center', width:'100%',}}>
                                {translations.WELCOME}
                        </Text> */}
                        <Image source={appLanguage == "en" ? require("../../../../assets/welcomeText.png") : require("../../../../assets/Bienvenido.png")} style={{ width: "80%", height: 60, alignSelf: "center" }} />

                    <View >
                        <Button onPress={() => {type === "User" ? this.props.navigation.navigate('UserLogin', {type: type}) : this.props.navigation.navigate('DriverLogin', {type: type})}} style={{width:'40%', alignSelf:'center', marginTop:10, backgroundColor:'#3A91FA'}} full rounded>
                            <Text style={{color:'#fff'}}>
                                {translations.LOGIN}
                            </Text>
                        </Button>
                    </View>

                    <View>
                        <Button onPress={() => {type === "Driver" ? this.props.navigation.navigate('DriverSignup', {type: type}) : this.props.navigation.navigate('DriverLogin', {type: type})}} style={{width:'60%', alignSelf:'center', marginTop:20, backgroundColor:'#3A91FA'}} full rounded>
                            <Text style={{color:'#fff'}}>
                            {translations.CREATE_ACCOUNT}
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


export default connect(mapStateToProps, mapDispatchToProps)(WelcomeHome);