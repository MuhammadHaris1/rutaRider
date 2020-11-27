import React, { useState } from 'react'
import { View, Text, Image, ImageBackground, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import { styles } from '../ScheduleBooking/scheduleStyling';
import {HeaderCustom} from '../../Rider/Constants/Header'
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Input, Item } from 'native-base';
import { Avatar } from 'react-native-elements';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import {updateProfile} from '../../../../Redux/Actions/userAction'

const EditProfile = (props) => {
    console.log('props.userDetails', props.userDetails)
    var data = props.userDetails.data
    const [firstName, setFn] = useState(data.first_name)
    const [lastName, setln] = useState(data.last_name)
    const [phone, setPhone] = useState(data.ph_number)
    const [email, setEmail] = useState(data.email)
    const [password, setPassword] = useState(data.password)


    const onUpdate = () => {
        const { fetchProfileData } = props.screenProps
        var formdata = new FormData();
        formdata.append("action", "update_user");
        formdata.append("id", data.id);
        formdata.append("first_name", firstName);
        formdata.append("last_name", lastName);
        formdata.append("email", email);
        formdata.append("ph_number", phone);
        formdata.append("password", password);
        props.updateProfile(formdata, fetchProfileData)
        .then((res) => {
            props.navigation.goBack()
        })
        .catch((err) => {
            console.log('err', err)
        })

    }

    return(
        <View style={{flex:1}}>
            <ImageBackground style={{height:'100%', width:'100%'}} source={require('../../../../../assets/welcome2.png')}>
                <View style={styles.container}>
                    <HeaderCustom headerTxt="Edit Profile" />
                    <ScrollView>  

                        <View style={{alignSelf:'center', borderRadius: 100, paddingVertical: 10 }}>
                            <Avatar
                                size="xlarge"
                                rounded
                                source={{ uri: 'https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' }}
                            />
                        </View>
                            
                              
                        <View style={[styles.row, styles.spaceBtw, styles.itemContainer, {width:'90%', alignSelf:'center'}]}>
                            <Item fixedLabel regular style={{width:'45%', paddingHorizontal: 10, borderRadius: 10}}>
                                <Input 
                                    onChangeText={(e) => setFn(e)}
                                    value={firstName}
                                    style={styles.whiteNormalTxt}
                                    placeholder="First Name" placeholderTextColor="#fff"/>
                            </Item>
                            <Item fixedLabel regular style={{width:'45%', paddingHorizontal: 10, borderRadius: 10}}>
                                <Input 
                                onChangeText={(e) => setln(e)}
                                value={lastName}
                                style={styles.whiteNormalTxt}
                                placeholder="Last Name" placeholderTextColor="#fff" />
                            </Item>
                        </View>
                        <View style={styles.itemContainer, {width:'95%', alignSelf:'center'}}>
                            <Item regular fixedLabel style={{width:'90%', alignSelf:'center',paddingHorizontal: 10, borderRadius: 10}}>
                                <Input 
                                onChangeText={(e) => setPhone(e)}
                                value={phone}
                                style={styles.whiteNormalTxt} placeholder="Phone Number" placeholderTextColor="#fff" />
                            </Item>
                        </View>
                        <View style={styles.itemContainer, {width:'95%', alignSelf:'center', marginTop: 10}}>
                            <Item regular fixedLabel style={{width:'90%', alignSelf:'center',paddingHorizontal: 10, borderRadius: 10}}>
                                <Input
                                value={email}
                                disabled style={styles.whiteNormalTxt} placeholder="Email Address" placeholderTextColor="#fff" />
                            </Item>
                        </View>
                        <View style={styles.itemContainer, {width:'95%', alignSelf:'center', marginTop: 10}}>
                            <Item regular fixedLabel style={{width:'90%', alignSelf:'center',paddingHorizontal: 10, borderRadius: 10}}>
                                <Input 
                                secureTextEntry
                                value={password}
                                disabled style={styles.whiteNormalTxt} placeholder="Password" placeholderTextColor="#fff" />
                            </Item>
                        </View>

                        <View style={styles.itemContainer}>
                        {!props.fetching ?
                        <Button onPress={() => {
                            onUpdate()
                        }} style={styles.btnStyle} full rounded>
                            <Text style={{color:'#fff'}}>
                                Update
                            </Text>
                        </Button>
                        :
                        <ActivityIndicator size="large" color="" />
                        }
                    </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>
    )
}


const mapStateToProps = state => {
    return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
    };
};

const mapDispatchToProps = {
    updateProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);