import React from 'react'
import { View, Text, ScrollView, ImageBackground, Image } from 'react-native'
import { Item, Input, Label, Button , Footer, FooterTab, Icon} from 'native-base';
const signupBack = require('../../../../../assets/signupBack.png')
import { connect } from 'react-redux';
const HomeActive = require('../../../../../assets/HomeActive.png')
const Home = require('../../../../../assets/Home.png')
const ProfileActive = require('../../../../../assets/ProfileActive.png')
const Profile = require('../../../../../assets/Profile.png')
const RouteiconActive = require('../../../../../assets/RouteiconActive.png')
const Routeicon = require('../../../../../assets/Routeicon.png')
const statisticsActive = require('../../../../../assets/statisticsActive.png')
const statistics = require('../../../../../assets/statistics.png')


class FooterComponent extends React.Component {
constructor (props) {
    super(props)
}

render() {
        return (
            <View style={{flex: 1, position: 'absolute', bottom: 0, width: "100%"}}>
                <Footer style={{backgroundColor:'rgb(43,48,68)'}}>
                    <FooterTab style={{backgroundColor:'rgb(43,48,68)'}}>
                        <Button 
                        // onPress={() => this.props.goto('Dashboard')}
                        >
                            <Image source={this.props.active == "home" ? HomeActive : Home} style={{height: 30, width: 30}} />
                        </Button>
                         <Button  onPress={() => this.props.goto('UserProfile')}>
                            <Image source={this.props.active == "profile" ? ProfileActive : Profile} style={{height: 30, width: 30}} />
                        </Button>
                        <Button onPress={() => this.props.goto('UserMap')}>
                            <Image source={this.props.active == "location" ? RouteiconActive : Routeicon} style={{height: 30, width: 30}} />
                        </Button>
                        <Button 
                        // onPress={() => this.props.goto('WeeklyStatistics')}
                        >
                        <   Image source={this.props.active == "statistics" ? statisticsActive : statistics} style={{height: 30, width: 30}} />
                        </Button>
                    </FooterTab>
                </Footer>
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


export default connect(mapStateToProps, mapDispatchToProps)(FooterComponent);





