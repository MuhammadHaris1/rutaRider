import { createAppContainer, DrawerItems, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {createDrawerNavigator,} from 'react-navigation-drawer'

import UserLogin from '../Components/Authentication/UserAuthentication/Login/login'
import UserSignup from '../Components/Authentication/UserAuthentication/Signup/signup'
import DriverLogin from '../Components/Authentication/DriverAuthentication/Login/login'
import DriverSignup from '../Components/Authentication/DriverAuthentication/Signup/signup'
import Welcome from '../Components/Authentication/Welcome/welcome'
import WelcomeHome from '../Components/Authentication/Welcome/welcomeHome'
import Profile from '../Components/Dashboard/Rider/Profile/profile'
import FooterComponent from '../Components/Dashboard/Rider/Footer/footer'
import Map  from '../Components/Dashboard/Rider/Map/map'
import Splash from '../Splash/splash'
import WeeklyStatistics from '../Components/Dashboard/Rider/Statistics/weekly'
import MonthlyStatistics from '../Components/Dashboard/Rider/Statistics/monthly'
import YearlyStatistics from '../Components/Dashboard/Rider/Statistics/yearly'
import DrawerMenu from "./drawer";
import Emergency from '../Components/Dashboard/Rider/EmergencyCall/emergencyCall'
import { UserStack } from "./userNavigation";
import History from "../Components/Dashboard/Rider/History/history";
import ForgotPassword from "../Components/Authentication/DriverAuthentication/Forgot/forgotPassword";
import Payment from "../Components/Dashboard/Rider/Payment/payment";
import PaymentDetails from "../Components/Dashboard/Rider/Payment/paymentDetails";
import ScheduleBooking from "../Components/Dashboard/Rider/ScheduleBooking/scheduleBooking";
import CreateSchedule from "../Components/Dashboard/Rider/ScheduleBooking/createSchedule";
import EditProfile from "../Components/Dashboard/Rider/Profile/editProfile";
import Notification from "../Components/Dashboard/Rider/Notification/notification";
import RideReq from "../Components/Dashboard/Rider/RideRequest/RideReq";
import ViewScheduleDetails from "../Components/Dashboard/Rider/ScheduleBooking/viewScheduleDetails";
import Paymentz from "../Components/Dashboard/Rider/Paymentz";

const AuthStack = createStackNavigator({

    Welcome: {
        screen: Welcome,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    WelcomeHome: {
        screen: WelcomeHome,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },
    
    UserLogin: {
        screen: UserLogin,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    UserSignUp: {
        screen: UserSignup,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },


    DriverLogin: {
        screen: DriverLogin,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },


    DriverSignup: {
        screen: DriverSignup,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

  

})


const Drawer = createDrawerNavigator({

    ProProfile: {
        screen: Profile,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    WeeklyStatistics: {
        screen: WeeklyStatistics,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

    MonthlyStatistics: {
        screen: MonthlyStatistics,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

    YearlyStatistics: {
        screen: YearlyStatistics,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

    History: {
        screen: History,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

    Payment: {
        screen: Payment,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

    ScheduleBooking: {
        screen: ScheduleBooking,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

    EditProfile: {
        screen: EditProfile,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

    Notification: {
        screen: Notification,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },
   
    RideReq: {
        screen: RideReq,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },
    Paymentz: {
        screen: Paymentz,
        navigationOptions: () => ({
            headerBackTitle: null,
           // header: null,
            headerShown: false
        }),
    }

 },
 
 {
    // initialRouteName: 'Main',
    contentComponent: DrawerMenu,
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
    drawerWidth: "100%",
    drawerType:"slide",
    overlayColor:"transparent",
    // minSwipeDistance: 0,
    drawerPosition: 'left',
    drawerLockMode: "unlocked"
    
}
 )


const DriverStack = createStackNavigator({

    Main: {
        screen: Drawer,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    FooterComponent: {
        screen: FooterComponent,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    Map: {
        screen: Map,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

    WeeklyStatistics: {
        screen: WeeklyStatistics,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

    MonthlyStatistics: {
        screen: MonthlyStatistics,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

    YearlyStatistics: {
        screen: YearlyStatistics,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

    EmergencyRider: {
        screen: Emergency,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

    History: {
        screen: History,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

    Payment: {
        screen: Payment,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },


    ScheduleBooking: {
        screen: ScheduleBooking,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

    CreateSchedule: {
        screen: CreateSchedule,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

    EditProfile: {
        screen: EditProfile,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },

    Notification: {
        screen: Notification,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },
   
    RideReq: {
        screen: RideReq,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },
   
    ViewScheduleDetails: {
        screen: ViewScheduleDetails,
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },
   

})




const SwitchNavigator = createSwitchNavigator({
    Splash: {
        screen: Splash,
        // navigationOptions = {
        //     state: {
        //         x
        //     }
        // }
    },

    Authentication: {
        screen: AuthStack
    },

    App: {
        screen: UserStack
    },

    DriverStack: {
        screen: DriverStack
    },

})


const Navigator = createAppContainer(SwitchNavigator);

export default Navigator