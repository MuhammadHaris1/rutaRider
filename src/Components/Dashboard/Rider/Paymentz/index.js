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
    UIManager,
    Button,
    NativeModules,
    DeviceEventEmitter
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { connect } from 'react-redux';

const { PaymentezCustomModule } = NativeModules;
// const TESTINGUI =  requireNativeComponent('TESTINGUI')
import MyViewManager from './CustomView';

// const commandName = "create"
// const argument=[]
// const androidViewId=findNodeHandle(someRef)



class Paymentz extends React.Component {
    nativeComponentRef;

    constructor(props) {
        super(props);
        this.state = {
            showNativeComponent: false
        }
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('MyCustomEvent', (event) => {
            console.log("MyCustomEvent -->", event);
            console.log("MyCustomEvent MyCustomEventUser -->", event.MyCustomEventUser);
            console.log("MyCustomEvent MyCustomEventEmail -->", event.MyCustomEventEmail);
            // Add your Business Logic over here
        });
    }


    render() {
        console.log("MyViewManager MyViewManager", MyViewManager)
        const { showNativeComponent } = this.state
        const { userDetails } = this.props
        return (
            <View>
                <View style={{ marginTop: 30 }}>
                    <Button
                        onPress={() => {
                            this.setState({ showNativeComponent: !showNativeComponent })
                            PaymentezCustomModule.passValue(userDetails.id, userDetails.email, (status) => {
                                console.log('Result ', status);
                            })

                        }}
                        title="Add card"
                    />
                </View>
                {showNativeComponent && <MyViewManager style={{ height: "100%", width: "100%" }} />}
            </View>
        )
    }
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

const mapStateToProps = (state) => ({
    userDetails: state.user.userDetails.data
})

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, mapDispatchToProps)(Paymentz);
