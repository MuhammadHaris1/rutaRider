


import { createStackNavigator } from 'react-navigation-stack'
import Emergency from '../Components/Dashboard/User/EmergencyCall/emergencyCall'
import scanQr from '../Components/Dashboard/User/ScanQr/scanQr'
import codeNo from '../Components/Dashboard/User/ScanQr/codeNo'
import dashboard from '../Components/Dashboard/User/Home/dashboard'
import footer from '../Components/Dashboard/User/Footer/footer'
import Map from '../Components/Dashboard/User/Map/map'
import profile from '../Components/Dashboard/User/Profile/profile'
import { createDrawerNavigator } from 'react-navigation-drawer'
import UserDrawer from './userDrawer'
import History from '../Components/Dashboard/User/History/history'







const Drawer = createDrawerNavigator({

    UserProfile: {
        screen: profile,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    Emergency: {
        screen: Emergency,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    scanQr: {
        screen: scanQr,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    History: {
        screen: History,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    Home: {
        screen: dashboard,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    

   

 },
 
 {
    // initialRouteName: 'Main',
    contentComponent: UserDrawer,
    drawerBackgroundColor: '#f5f5dc',
    contentOptions: {
        activeBackgroundColor: 'lightgray',
        activeTintColor: 'black',
        style: {
            borderRightColor: 'orange'
        },
        inactiveTintColor: 'black'
    },
    // resetOnBlur:true,
    drawerType:"slide",
    overlayColor:"transparent",
    // minSwipeDistance: 0,
    drawerPosition: 'left',
    drawerLockMode: "unlocked"
    
}
 )



export const UserStack = createStackNavigator({ 

    UserProfile: {
        screen: Drawer,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    Dashboard: {
        screen: dashboard,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    FooterComponent: {
        screen: footer,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    UserMap: {
        screen: Map,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

    ScanQr: {
        screen: scanQr,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    CodeNo: {
        screen: codeNo,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    Emergency: {
        screen: Emergency,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

 })