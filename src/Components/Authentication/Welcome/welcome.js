import React from 'react'
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Image, Platform } from 'react-native'
import { connect } from 'react-redux';
import { Button } from 'native-base'
import { LocalizationContext } from '../../../Localization/LocalizationContext';
import { Picker } from 'react-native';
import { checkAppLang } from '../../../Redux/Actions/userAction';
const welcome = require('../../../../assets/welcome.png')
const Logo = require('../../../../assets/Logo.png')
const button = require('../../../../assets/Button.png')



class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lan: "en"
        }
    }

    static contextType = LocalizationContext


    render() {
        const { translations, setAppLanguage, appLanguage } = this.context
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={welcome} style={{ height: "100%", width: '100%', flex: 1, justifyContent: 'center' }}>
                    <ScrollView>

                        <View style={{ height: "100%", width: '100%', flex: 1, }}>

                            <View style={{ alignItems: 'center', marginTop: '20%' }}>
                                <Image source={Logo} style={{ width: 149, height: 189 }} />
                            </View>

                            <View style={{ width: '100%', marginTop: 20 }}>
                                <Text style={{
                                    fontFamily: Platform.OS === "android" ? 'AVENGEANCE HEROIC AVENGER BI' : null,
                                    fontSize: 45, color: '#fff', letterSpacing: 10, textAlign: 'center', width: '100%'
                                }}>
                                    {translations.WELCOME}
                                </Text>
                                {/* <View style={{ backgroundColor: "#fff", width: '80%', alignSelf: "center" }}>
                                    <Picker
                                        selectedValue={this.state.lan}

                                        onValueChange={(value) => {
                                            setAppLanguage(value)
                                            this.setState({ lan: value })
                                            // RNRestart.Restart();
                                        }}
                                        style={{ width: "90%", backgroundColor: "#fff" }}
                                        itemStyle={{ color: "#fff" }}

                                    >
                                        <Picker.Item label="English" value={"en"} />
                                        <Picker.Item label="Spanish" value={"es"} />
                                    </Picker>
                                </View> */}
                                <View >
                                    <Button onPress={() => this.props.navigation.navigate('WelcomeHome', { type: "Driver" })} style={{ width: '80%', alignSelf: 'center', marginTop: 20, backgroundColor: '#3A91FA' }} full rounded>
                                        <Text style={{ color: '#fff' }}>
                                            {translations.GET_IN}
                                        </Text>
                                    </Button>
                                </View>

                                <View>
                                    <Button onPress={() => this.props.navigation.navigate('WelcomeHome', { type: "Driver" })} style={{ width: '80%', alignSelf: 'center', marginTop: 20, backgroundColor: '#3A91FA' }} full rounded>
                                        <Text style={{ color: '#fff' }}>
                                            {translations.CREATE_ACCOUNT}
                                        </Text>
                                    </Button>
                                </View>




                            </View>




                        </View>

                    </ScrollView>
                    <View style={{ flexDirection: "row", width: "80%", justifyContent: "space-evenly", alignSelf: "center", paddingVertical: 20 }}>
                        <TouchableOpacity onPress={() => {
                            setAppLanguage("en")
                            // this.props.checkAppLang(translations, appLanguage)
                        }}>
                            <Text style={{ color: appLanguage == "en" ? "#fff" : "#bdbdbd", fontSize: 18 }}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setAppLanguage("es")
                        }}>
                            <Text style={{ color: appLanguage == "es" ? "#fff" : "#bdbdbd", fontSize: 18 }}>Espanol</Text>
                        </TouchableOpacity>
                    </View>
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
    checkAppLang
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);