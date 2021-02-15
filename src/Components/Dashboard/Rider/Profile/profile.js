import React from 'react'
import { View, Text, ScrollView, ImageBackground, Image, TouchableOpacity, Dimensions, Modal, FlatList, BackHandler, Alert, Platform, RefreshControl, } from 'react-native'
import { connect } from 'react-redux';
import { getPaymentDetails, updateVehicle, getHistory, getUserDetail, getEmergencyNumber, getSchedule, getNotification, getBookingReq, getReviewStatus } from '../../.././../Redux/Actions/userAction'
import { Item, Input, Label, Button } from 'native-base';
import { Avatar, Header, } from 'react-native-elements'
import FooterComponent from '../../Rider/Footer/footer'
const profileBack = require('../../../../../assets/profileBack.png')
const back = require('../../../../../assets/back.png')
const sidebar = require('../../../../../assets/sidebar.png')
const experience = require('../../../../../assets/experience.png')
const Trips = require('../../../../../assets/Trips.png')
const Profilestar = require('../../../../../assets/Profilestar.png')
const km = require('../../../../../assets/km.png')
import RenderReviewModal from '../Modals/reviewmodal'
import Pusher from 'pusher-js/react-native'
import pusherConfig from '../../../../Constant/pusher.json'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-community/picker';

import messaging from '@react-native-firebase/messaging';
// import ImagePicker from 'react-native-image-picker'
import ImagePicker from 'react-native-image-crop-picker';

import RenderAddPayment from '../Modals/addPaymentModal';
import { styles } from '../ScheduleBooking/scheduleStyling';
import { showMessage } from 'react-native-flash-message';
import { LocalizationContext } from '../../../../Localization/LocalizationContext';

const defaultAvatar = 'https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'

const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
        refreshing: false,
    },
};


class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            carImages: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9M5tWHEOGn3zO45qjZhOF9hGq_JyvwIiJNg&usqp=CAU',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHqv6Q-Z13qmfeO5L5lRP1gc-RGKddVFXfXsNcRcb25OV15_kQkXa_kQXcT_s_MB-RrJB7_FEjJj3pne5U8ZlAX8i2fRunMUXNwA&usqp=CAU&ec=45690272',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRgkNRUOc4lr_vb1_uOop0CTrQvNcf0HeS-9Ku1SsOS2SBPOiB8e4i3d0oxaqB4oDiFnTOf0ZQqoDk-TrUX0JaTeiGaCShM9k37kg&usqp=CAU&ec=45690272',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRL-k1qUKxc1nLZPhtc_4ZbvHw1BLbZXF948z-lvLHyvaCgHF35R5jsk-B5pXGyirvPVBJJYsSLHRnWtuZ7Avuy5x-3LqsErdcN3w&usqp=CAU&ec=45690272',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDZUnHgdvvU9S1jh5iLfnNXkbkU9ISONtjjg&usqp=CAU',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR8_Ln9ksjkyifA0GVc5-UrcS2IRB0wCW7gu1P4P-ipaUcmZiDdPdo_B_orVEDJ4GJlIoOfGSC53CYS6w-zw3uDf3aoQqsxqEEFOg&usqp=CAU&ec=45690272',
            ],
            selectedImage: '',
            addVehicle: false,
            name: '',
            colour: '',
            model: '2020',
            refreshing: false,
            brand: 'Zotye',
            addPayment: false,
            imageArr: [],
            riderImage: null,
            totalSeats: '',
            experience: ''
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

        this.userChannel.bind('schedule-ride-completed', (e) => {
            console.log('schedule-ride-completed', e)
            this.onRefresh()
        })

        this.userChannel.bind('realtime-update', (e) => {
            console.log('schedule-ride-completed realtime-update ', e)
            this.onRefresh()
        })
    }


    componentDidMount = () => {
        const { userDetails, getHistory, getPaymentDetails, getEmergencyNumber, getSchedule, getNotification, getBookingReq, getReviewStatus } = this.props
        getHistory(userDetails.data.id)
        getEmergencyNumber()
        getPaymentDetails(userDetails.data.id)
        getSchedule(userDetails.data.id)
        getNotification(userDetails.data.id)
        getBookingReq(userDetails.data.id)
        getReviewStatus(userDetails.data.id)
        if (userDetails.data.vehicle.id != null) {
            this.setState({ selectedImage: this.state.carImages[0], addVehicle: false })
        } else {
            this.setState({ selectedImage: this.state.carImages[0], addVehicle: true })
        }


        messaging()
            .onMessage(async (remoteMessage) => {
                showMessage({
                    message: remoteMessage.notification.title,
                    description: remoteMessage.notification.body,
                    type: 'none',
                    duration: 3500,
                    onPress: () => {
                        console.log("Notification caused app onMessage onPress")
                        this.props.navigation.navigate('RideReq')
                    }
                });
                console.log("Notification caused app onMessage", remoteMessage)

            })
        // if(!userDetails.data.card_details){
        //     this.setState({
        //         addPayment: true
        //     })
        // }

    }


    openGallery = () => {
        const { imageArr } = this.state
        this.setState({ imageArr: [] })
        // ImagePicker.showImagePicker(options, (response) => {
        //     console.log('Response = ', response);

        //     if (response.didCancel) {
        //         console.log('User cancelled image picker');
        //     } else if (response.error) {
        //         console.log('ImagePicker Error: ', response.error);
        //     } else if (response.customButton) {
        //         console.log('User tapped custom button: ', response.customButton);
        //     } else {
        //         //   const source = { uri: response.uri };
        //         // You can also display the image using data:
        //         const source = { uri: 'data:image/jpeg;base64,' + response.data };
        //         console.log("uri: response.uri", source, response)

        //         this.setState({
        //             profilePic: source,
        //             fileName: response.fileName,
        //             fileUri: response.uri
        //         });
        //     }

        // });
        ImagePicker.openPicker({
            multiple: true,
            mediaType: "photo"
        }).then(images => {
            // console.log('images =>' , images, images[0].filename);
            for (let index = 0; index < images.length; index++) {
                var path = images[index].path
                let filename = path.substring(path.lastIndexOf('/') + 1, path.length)
                // console.log('filename =>' , filename);
                var file = {
                    uri: path,
                    name: filename,
                    type: 'image/png'
                }
                imageArr.push(file)
                this.setState({ imageArr })

            }
        });
    }


    riderOpenGallery = () => {
        const { riderImage } = this.state
        ImagePicker.openPicker({
            multiple: false,
            mediaType: "photo"
        }).then(images => {
            
                var path = images.path
                let filename = path.substring(path.lastIndexOf('/') + 1, path.length)
                var file = {
                    uri: path,
                    name: filename,
                    type: 'image/png'
                }
                console.log("FILE", file)
                this.setState({ riderImage: file })
        });
    }

    addAndEditVehicle = () => {
        const { model, licenseNumber, nicNumber, fileName, experience, colour, name, brand, imageArr, totalSeats, riderImage } = this.state
        const { userDetails, updateVehicle } = this.props
        const { translations, appLanguage } = this.context
        userDetails.data.vehicle = { ...userDetails.data.vehicle, model, license: licenseNumber, colour, name }

        console.log(userDetails)

        // var file = {
        //     uri: fileUri,
        //     name: fileName,
        //     type: 'image/png'
        // }
        var extractModal = model.replace(',', '')

        const formData = new FormData()
        formData.append('action', 'addVehicle');
        formData.append('model', extractModal);
        formData.append('license', licenseNumber);
        formData.append('vehicle_no', nicNumber);
        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('colour', colour);
        formData.append('seats', totalSeats);
        formData.append('experience', experience);
        formData.append('riderImage', riderImage);


        for (let index = 0; index < imageArr.length; index++) {
            formData.append('vehicleDocuments', imageArr[index])
        }
        // formData.append('vehicle_paper', file);
        // console.log('Model', extractModal)


        if (model && licenseNumber && nicNumber && imageArr.length >= 1 && riderImage && name && colour && brand && totalSeats) {
            if (Number(extractModal) >= 2010) {
                console.log('FORMDATA', formData)
                updateVehicle(userDetails, userDetails.data.id, formData, translations, appLanguage)
                    .then((res) => {
                        if (res.status) {
                            this.setState({
                                addVehicle: false
                            })
                        }
                    })
            } else {
                Alert.alert(translations.ALERT, translations.MODEL_SHOULD_BE_NEWER)
            }
        } else {
            Alert.alert(translations.ALERT, translations.ALL_FIELDS_ARE_REQUIRED)
        }
    }
    static contextType = LocalizationContext
    renderModal = () => {
        const { translations } = this.context
        const { modalVisible } = this.state
        const { profileData } = this.props.screenProps
        console.log(' this.state.selectedImage', this.props.userDetails)
        return (
            <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => { this.setState({ modalVisible: !modalVisible }) }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>

                        <View style={{ backgroundColor: 'rgb(41, 46, 66)', justifyContent: 'center', alignContent: 'center', padding: 15, width: '95%', borderRadius: 10 }}>

                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => { this.setState({ modalVisible: !modalVisible }) }} style={{ width: '25%' }}>
                                    <Text style={{ backgroundColor: 'red', borderRadius: 100, height: 20, width: 20, textAlign: 'center', color: '#fff' }}>X</Text>
                                </TouchableOpacity>

                                <View>
                                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 25 }}>{translations.VIEW_VEHICLE}</Text>
                                </View>
                            </View>

                            {/* <View style={{ borderWidth: 2, borderColor: '#fff', padding: 5 }}>
                                <Image source={{ uri: this.state.selectedImage }} style={{ height: 150, width: '100%', alignSelf: 'center' }} />
                            </View> */}

                            {/* <View>
                                <FlatList
                                    data={this.state.carImages}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                                                this.setState({ selectedImage: item })
                                            }}>
                                                <View style={{ borderWidth: 2, borderColor: '#fff', padding: 5, margin: 5 }}>
                                                    <Image source={{ uri: item }} style={{ height: 50, width: 80, alignSelf: 'center' }} />
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }}
                                    keyExtractor={(item, index) => index}
                                />
                            </View> */}

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#3A91FA', width: "100%", padding: 5, marginTop: 10 }}>
                                <Text style={{ color: '#fff', width: '50%', textAlign: 'center' }}>
                                    {translations.VIHICLE_NAME}
                                </Text>

                                <Text style={{ color: '#fff', width: '50%', textAlign: 'center' }}>
                                    {profileData.data.vehicle.name}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'transparent', width: "100%", padding: 5, marginTop: 10 }}>
                                <Text style={{ color: '#fff', width: '50%', textAlign: 'center' }}>
                                    {translations.VIHICLE_COLOUR}
                                </Text>

                                <Text style={{ color: '#fff', width: '50%', textAlign: 'center' }}>
                                    {profileData.data.vehicle.colour}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#3A91FA', width: "100%", padding: 5, marginTop: 10 }}>
                                <Text style={{ color: '#fff', width: '50%', textAlign: 'center' }}>
                                    {translations.MODEL}
                                    </Text>

                                <Text style={{ color: '#fff', width: '50%', textAlign: 'center' }}>
                                    {profileData.data.vehicle.model}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'transparent', width: "100%", padding: 5, marginTop: 10 }}>
                                <Text style={{ color: '#fff', width: '50%', textAlign: 'center' }}>
                                    {translations.REGISTRATION_NUMBER}
                                    </Text>

                                <Text style={{ color: '#fff', width: '50%', textAlign: 'center' }}>
                                    {profileData.data.vehicle.reg_number}
                                </Text>
                            </View>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#3A91FA', width: "100%", padding: 5, marginTop: 10 }}>
                                <Text style={{ color: '#fff', width: '50%', textAlign: 'center' }}>
                                   {translations.LISCENSE_NUMBER}
                                    </Text>

                                <Text style={{ color: '#fff', width: '50%', textAlign: 'center' }}>
                                    {profileData.data.vehicle.license}
                                </Text>
                            </View>

                        </View>
                    </View>
                </Modal>
            </View>
        )
    }


    renderAddVehicle = () => {
        const { translations } = this.context
        const { addVehicle, imageArr, riderImage } = this.state
        console.log("IMAGEARR", imageArr)
        const year = (new Date()).getFullYear();
        const years = Array.from(new Array(11), (val, index) => year - index);
        var brands = ["Zotye", "Volvo", "Tata", "Ssang Young", "Soueast", "Skoda", "Renault", "BMW", "Daewoo", "Ford", "Holden", "Honda", "Hyundai", "Isuzu", "Kia", "Lexus", "Mazda", "Mitsubishi", "Nissan", "Peugeot", "Subaru", "Suzuki", "Toyota", "Volkswagen", "other"]
        return (
            <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                <Modal
                    transparent={true}
                    visible={addVehicle}
                    onRequestClose={() => {
                        // this.setState({addVehicle:!addVehicle})
                        BackHandler.exitApp()
                    }}
                >
                    <View style={{ backgroundColor: 'rgb(41, 46, 66)', flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>

                        <ScrollView style={{ width: '100%' }}>



                            <View style={{ justifyContent: 'center', alignContent: 'center', padding: 15, width: '100%', borderRadius: 10, height: '100%', marginTop: '20%' }}>

                                <View>
                                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#fff', fontSize: 20 }}>
                                        {/* {Add Vehicle Details} */}
                                        {translations.ADD_VEHICLE_DETAIL}
                                    </Text>
                                </View>

                                <View style={{ alignItems: 'center', height: '100%' }}>

                                    <View>
                                        <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor: '#3A91FA' }}>
                                            <Input style={{ color: '#fff' }} placeholderTextColor="#fff" onChangeText={(e) => this.setState({ name: e })} placeholder={translations.VIHICLE_NAME} />
                                        </Item>
                                    </View>

                                    <View>
                                        <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor: '#3A91FA' }}>
                                            <Input style={{ color: '#fff' }} placeholderTextColor="#fff" onChangeText={(e) => this.setState({ colour: e })} placeholder={translations.VIHICLE_COLOUR} />
                                        </Item>
                                    </View>

                                    <View style={{ borderRadius: 30, borderColor: '#3A91FA', borderWidth: 1, marginTop: '2%', }}>
                                        <Picker
                                            selectedValue={this.state.model}
                                            style={{ height: 50, width: wp(75), color: '#fff' }}
                                            onValueChange={(itemValue, itemIndex) =>
                                                this.setState({ model: itemValue })
                                            }>
                                            {years.map((val, ind) => {
                                                // console.log("STRING", val, typeof val)
                                                return (
                                                    <Picker.Item color="#000" key={ind} label={val.toString()} value={val.toLocaleString()} />
                                                )
                                            })}
                                        </Picker>

                                    </View>

                                    <View style={{ borderRadius: 30, borderColor: '#3A91FA', borderWidth: 1, marginTop: '2%', }}>
                                        <Picker
                                            selectedValue={this.state.brand}
                                            style={{ height: 50, width: wp(75), color: '#fff' }}
                                            onValueChange={(itemValue, itemIndex) =>
                                                this.setState({ brand: itemValue })
                                            }>
                                            {brands.map((val, ind) => {
                                                // console.log("STRING", val, typeof val)
                                                return (
                                                    <Picker.Item color="#000" key={ind} label={val.toString()} value={val.toLocaleString()} />
                                                )
                                            })}
                                        </Picker>

                                    </View>

                                    <View>
                                        <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor: '#3A91FA' }}>
                                            <Input style={{ color: '#fff' }} placeholderTextColor="#fff" onChangeText={(e) => this.setState({ licenseNumber: e })} placeholder={translations.LISCENSE_NUMBER} />
                                        </Item>
                                    </View>

                                    <View>
                                        <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor: '#3A91FA' }}>
                                            <Input style={{ color: '#fff' }} placeholderTextColor="#fff" onChangeText={(e) => this.setState({ nicNumber: e })} placeholder={translations.CAR_NUMBER} />
                                        </Item>
                                    </View>

                                    <View>
                                        <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor: '#3A91FA' }}>
                                            <Input keyboardType="number-pad" style={{ color: '#fff' }} placeholderTextColor="#fff" onChangeText={(e) => this.setState({ totalSeats: e })} placeholder={translations.TOTAL_SEATS_IN_CAR} />
                                        </Item>
                                    </View>

                                    <View>
                                        <Item rounded regular style={{ width: '80%', marginTop: '2%', borderColor: '#3A91FA' }}>
                                            <Input keyboardType="number-pad" style={{ color: '#fff' }} placeholderTextColor="#fff" onChangeText={(e) => this.setState({ experience: e })} placeholder={translations.ENTER_YOUR_EXPERIENCE_IN_YEARS} />
                                        </Item>
                                    </View>


                                    <TouchableOpacity onPress={this.openGallery}>
                                        <Item onPress={this.openGallery} rounded regular style={{ width: '80%', marginTop: '2%', borderColor: '#3A91FA' }}>
                                            <Input style={{ color: '#fff' }} disabled value={this.state.fileName} placeholderTextColor="#fff" onChangeText={(e) => this.setState({ email: e })} placeholder={translations.UPLOAD_YOUR_VEHICLE_PAPERS} />
                                        </Item>
                                    </TouchableOpacity >

                                    {imageArr.length >= 1 &&
                                        <View style={{ height: 220, width: "98%", alignSelf: 'center', justifyContent: 'flex-start' }}>
                                            <FlatList
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                data={imageArr}
                                                extraData={this.state}
                                                renderItem={({ item, index }) => {
                                                    console.log("item.uri => ", item)
                                                    return (
                                                        <View style={{ padding: 20 }}>
                                                            <TouchableOpacity onPress={() => {
                                                                imageArr.splice(index, 1)
                                                                this.setState({ imageArr })
                                                                console.log("func Called")
                                                            }}>
                                                                <Image source={require('../../../../../assets/close.png')} style={{ ...styles.imgIcon }} />
                                                            </TouchableOpacity>
                                                            <Image source={{ uri: item.uri }} style={{ height: 200, width: 240, borderRadius: 10, overflow: 'visible' }} />
                                                        </View>
                                                    )
                                                }}
                                            />
                                        </View>
                                    }

                                    <TouchableOpacity onPress={this.riderOpenGallery}>
                                        <Item onPress={this.riderOpenGallery} rounded regular style={{ width: '80%', marginTop: '2%', borderColor: '#3A91FA' }}>
                                            <Input style={{ color: '#fff' }} disabled value={this.state.fileName} placeholderTextColor="#fff" onChangeText={(e) => this.setState({ email: e })} placeholder={translations.UPLOAD_RIDER_PICTURE} />
                                        </Item>
                                    </TouchableOpacity >

                                    {riderImage !== null &&
                                        <View style={{ height: 220, width: "98%", alignSelf: 'center', justifyContent: 'flex-start' }}>
                                            <FlatList
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                data={[riderImage]}
                                                extraData={this.state}
                                                renderItem={({ item, index }) => {
                                                    console.log("item.uri => ", item)
                                                    return (
                                                        <View style={{ padding: 20 }}>
                                                            <TouchableOpacity onPress={() => {
                                                                this.setState({ riderImage: null })
                                                                console.log("func Called")
                                                            }}>
                                                                <Image source={require('../../../../../assets/close.png')} style={{ ...styles.imgIcon }} />
                                                            </TouchableOpacity>
                                                            <Image source={{ uri: item.uri }} style={{ height: 200, width: 240, borderRadius: 10, overflow: 'visible' }} />
                                                        </View>
                                                    )
                                                }}
                                            />
                                        </View>
                                    }

                                    <View>
                                        <Button onPress={() => {
                                            this.addAndEditVehicle()
                                        }} style={{ width: '80%', marginVertical: '10%', borderColor: '#3A91FA', backgroundColor: '#3A91FA' }} full rounded>
                                            <Text style={{ color: '#fff' }}>
                                                {translations.SAVE}
                                            </Text>
                                        </Button>
                                    </View>
                                </View>



                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        )

    }





    onRefresh = () => {
        const { userDetails, getHistory, getUserDetail, getPaymentDetails, getEmergencyNumber, getSchedule, getNotification, getBookingReq, getReviewStatus } = this.props
        this.setState({ refreshing: true })
        // getHistory(userDetails.data.id)
        getUserDetail(userDetails.data.id)
        getHistory(userDetails.data.id)
        getEmergencyNumber()
        getPaymentDetails(userDetails.data.id)
        getSchedule(userDetails.data.id)
        getNotification(userDetails.data.id)
        getBookingReq(userDetails.data.id)
        getReviewStatus(userDetails.data.id)

        console.log("this.props.fetching", this.props.fetching)
        if (!this.props.fetching) {
            this.setState({ refreshing: false })
        }

    }

    render() {
        const { translations } = this.context
        const { userDetails, paymentDetail, reviewStastus } = this.props
        const { addPayment } = this.state
        var rating = Number(userDetails.data.rider_schedule_rating)
        console.log('Number(userDetails.data.trips) + Number(userDetails.data.rider_schedule_count)', Number(userDetails.data.trips), Number(userDetails.data.rider_schedule_count), userDetails.data)
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={profileBack} style={{ height: "100%", width: '102%', flex: 1, right: 5 }}>
                    <ScrollView refreshControl={<RefreshControl colors={["#3A91FA"]} refreshing={this.props.fetching} onRefresh={this.onRefresh} />} contentContainerStyle={{ paddingBottom: 70 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>

                            {this.renderModal()}
                            {this.renderAddVehicle()}
                            <RenderAddPayment addPayment={addPayment} />
                            {reviewStastus && !reviewStastus.status && reviewStastus.dismiss == "0" && <RenderReviewModal reviewModal={reviewStastus.status == false ? true : false} data={reviewStastus.data} />}
                            <Header
                                containerStyle={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}
                                rightComponent={
                                    <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                                        <Image source={sidebar} style={{ height: 20, width: 20 }} />
                                    </TouchableOpacity>
                                }
                            />

                            <View style={{ marginTop: hp(10), flexDirection: 'row', alignSelf: 'center', left: wp(10) }}>

                                <Avatar
                                    accessory={{ style: { top: '80%', left: 0 } }}
                                    showAccessory
                                    onAccessoryPress={() => {

                                        this.props.navigation.navigate('EditProfile')
                                    }}
                                    containerStyle={{ borderWidth: 15, borderColor: '#fff', borderRadius: 100, }}
                                    size="xlarge"
                                    rounded
                                    source={{ uri: userDetails.data.image ? "http://144.91.105.44/~ruta/public/profile_pics/" + userDetails.data.image : defaultAvatar }}
                                />

                                <TouchableOpacity onPress={() => this.setState({ modalVisible: true, })} style={{ top: 110 }}>
                                    <Text style={{
                                        color: '#fff', textDecorationLine: 'underline',
                                        fontFamily: Platform.OS === "android" ? 'Auckland Free' : null
                                    }}>
                                        {translations.VIEW_VEHICLE}
                                    </Text>
                                </TouchableOpacity>
                            </View>





                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', top: hp(5), padding: 5 }}>

                                <View style={{ width: '28%', backgroundColor: 'rgba(74, 83, 116, 0.9)', borderRadius: 10, }}>
                                    <View style={{ top: hp(1.5) }}>
                                        <Image source={Profilestar} style={{ height: 35, width: 35, alignSelf: 'center' }} />
                                    </View>

                                    <View style={{ height: 2, backgroundColor: '#3A91FA', width: '80%', alignSelf: 'center', marginVertical: hp(2) }} />

                                    <View style={{ marginVertical: hp(1) }}>
                                        <Text style={{ color: '#fff', textAlign: 'center' }}>{rating.toFixed(1)}</Text>
                                        <Text style={{ color: '#fff', textAlign: 'center' }}>{translations.RATING}</Text>
                                    </View>
                                </View>


                                <View style={{ width: '28%', backgroundColor: 'rgba(74, 83, 116, 0.9)', borderRadius: 15, }}>
                                    <View style={{ top: hp(1.5) }}>
                                        <Image source={experience} style={{ height: 35, width: 35, alignSelf: 'center' }} />
                                    </View>

                                    <View style={{ height: 2, backgroundColor: '#3A91FA', width: '80%', alignSelf: 'center', marginVertical: hp(2) }} />

                                    <View style={{ marginVertical: hp(1) }}>
                                        <Text style={{ color: '#fff', textAlign: 'center' }}>{userDetails.data.vehicle && userDetails.data.vehicle.experience} {translations.YEARS_OF_EXPERIENCE}</Text>
                                        {/* <Text style={{ color: '#fff', textAlign: 'center' }}>Experience</Text> */}
                                    </View>
                                </View>


                                <View style={{ width: '28%', backgroundColor: 'rgba(74, 83, 116, 0.9)', borderRadius: 15, }}>
                                    <View style={{ top: hp(1.5) }}>
                                        <Image source={Trips} style={{ height: 35, width: 35, alignSelf: 'center' }} />
                                    </View>

                                    <View style={{ height: 2, backgroundColor: '#3A91FA', width: '80%', alignSelf: 'center', marginVertical: hp(2) }} />

                                    <View style={{ marginVertical: hp(1) }}>
                                        <Text style={{ color: '#fff', textAlign: 'center' }}>{Number(userDetails.data.trips) + Number(userDetails.data.rider_schedule_count)}</Text>
                                        <Text style={{ color: '#fff', textAlign: 'center' }}>{translations.TRIPS}</Text>
                                    </View>
                                </View>



                                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Payment')} style={{ width: '20%', backgroundColor: 'rgba(74, 83, 116, 0.9)', borderRadius: 15, }}>
                                    <View style={{ top: hp(1.5) }}>
                                        <Image source={km} style={{ height: 35, width: 35, alignSelf: 'center' }} />
                                    </View>

                                    <View style={{ height: 2, backgroundColor: '#3A91FA', width: '80%', alignSelf: 'center', marginVertical: hp(2) }} />

                                    <View style={{ marginVertical: hp(1) }}>
                                      {paymentDetail ?  <Text style={{ color: '#fff', textAlign: 'center' }}>{paymentDetail.km}</Text>
                                       :
                                       <Text style={{ color: '#fff', textAlign: 'center' }}>0</Text>
                                      }
                                        <Text style={{ color: '#fff', textAlign: 'center' }}>Total Kilometers</Text>
                                    </View>
                                </TouchableOpacity> */}

                            </View>


                            <View style={{ marginTop: hp(8) }}>
                                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 35 }}>{userDetails.data.first_name} {userDetails.data.last_name}</Text>
                                <Text style={{ color: '#fff', textAlign: 'center' }}>{translations.RUTA_DRIVER}</Text>
                            </View>




                            <View style={{ marginTop: hp(2) }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#3A91FA', textAlign: 'center', right: 15, fontSize: 25 }}>E</Text>
                                    <Text style={{ color: '#fff', textAlign: 'center', top: 5, fontSize: 17 }}>{userDetails.data.email}</Text>
                                </View>
                                {/* <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#3A91FA', textAlign: 'center', right: 15, fontSize: 25 }}>A</Text>
                                    <Text style={{ color: '#fff', textAlign: 'center', top: 5, fontSize: 17 }}>{userDetails.data.email}</Text>
                                </View> */}
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#3A91FA', textAlign: 'center', right: 15, fontSize: 25 }}>C</Text>
                                    <Text style={{ color: '#fff', textAlign: 'center', top: 5, fontSize: 17 }}>593-{userDetails.data.ph_number}</Text>
                                </View>
                            </View>


                        </View>
                    </ScrollView>
                    <FooterComponent goto={(e) => this.props.navigation.navigate(e, {
                        reqDetailParam: false
                    })} active={"profile"} />
                </ImageBackground>
            </View>
        )
    }
}




const mapStateToProps = state => {
    return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        paymentDetail: state.user.paymentDetail,
        reviewStastus: state.user.reviewStastus
    };
};

const mapDispatchToProps = {
    updateVehicle, getHistory, getPaymentDetails, getUserDetail, getEmergencyNumber, getSchedule, getNotification, getBookingReq, getReviewStatus
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);