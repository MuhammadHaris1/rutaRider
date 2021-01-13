import React, { useContext, useState } from 'react'
import { View, Text, Image, ImageBackground, ActivityIndicator, Alert } from 'react-native'
import { connect } from 'react-redux';
import { styles } from '../ScheduleBooking/scheduleStyling';
import {HeaderCustom} from '../../Rider/Constants/Header'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Input, Item } from 'native-base';
import { Avatar } from 'react-native-elements';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import {updateProfile} from '../../../../Redux/Actions/userAction'
import ImagePicker from "react-native-image-picker";
import { TextInputMask } from 'react-native-masked-text'
import { LocalizationContext } from '../../../../Localization/LocalizationContext';

const showPass = require('../../../../../assets/show.png')
const hidePass = require('../../../../../assets/hide.png')
const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

const defaultAvatar = 'https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'


const EditProfile = (props) => {
    console.log('props.userDetails', props.userDetails)
    var data = props.userDetails.data
    const [firstName, setFn] = useState(data.first_name)
    const [lastName, setln] = useState(data.last_name)
    const [phone, setPhone] = useState(data.ph_number)
    const [email, setEmail] = useState(data.email)
    const [password, setPassword] = useState(data.password)
    const [show, setShow] = useState(true)
    const [username, setSsername] = useState(data.username)
    const contextType = useContext(LocalizationContext)
    const { translations } = contextType

    const [profilePic, setprofilePic] = useState(data.image ? data.image_path : null)
    const [fileName, setfileName] = useState('')
    const [fileUri, setfileUri] = useState(data.image ? data.image_path : null)

    const onUpdate = () => {
        const { fetchProfileData } = props.screenProps

        var file = {
            uri: fileUri,
            name: fileName,
            type: 'image/png'
        }

        var formdata = new FormData();
       
        if(/^(\d{3})[-](\d{2})[-](\d{4})[-](\d{3})$/.test(phone)) {
            if (fileName) {
                formdata.append("image", file);
                }
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
        }else {
            Alert.alert("Alert", "Phone number is not in format or complete")
        }

    }


    const openGallery = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
            //   const source = { uri: response.uri };
              // You can also display the image using data:
              const source = { uri: 'data:image/jpeg;base64,' + response.data };
              console.log( "uri: response.uri", source, response)
          
              setprofilePic(source)
              setfileName(response.fileName)
              setfileUri(response.uri)
            }
          });
    } 

    return(
        <View style={{flex:1}}>
            <ImageBackground style={{height:'100%', width:'100%'}} source={require('../../../../../assets/welcome2.png')}>
                <View style={styles.container}>
                    <HeaderCustom headerTxt={translations.EDIT_PROFILE} navigation={props.navigation}/>
                    <ScrollView>  

                        <View style={{alignSelf:'center', borderRadius: 100, paddingVertical: 10 }}>
                            <Avatar
                                showAccessory
                                onAccessoryPress={() => openGallery()}
                                size="xlarge"
                                rounded
                                source={{ uri: profilePic ? fileUri : defaultAvatar  }}
                                 />
                        </View>
                            
                              
                        <View style={[styles.row, styles.spaceBtw, styles.itemContainer, {width:'90%', alignSelf:'center'}]}>
                            <Item fixedLabel regular style={{width:'45%', paddingHorizontal: 10, borderRadius: 10}}>
                                <Input 
                                    onChangeText={(e) => setFn(e)}
                                    value={firstName}
                                    style={styles.whiteNormalTxt}
                                    placeholder={translations.FIRST_NAME} placeholderTextColor="#fff"/>
                            </Item>
                            <Item fixedLabel regular style={{width:'45%', paddingHorizontal: 10, borderRadius: 10}}>
                                <Input 
                                onChangeText={(e) => setln(e)}
                                value={lastName}
                                style={styles.whiteNormalTxt}
                                placeholder={translations.LAST_NAME} placeholderTextColor="#fff" />
                            </Item>
                        </View>
                        <View style={styles.itemContainer, {width:'95%', alignSelf:'center'}}>
                            <Item regular fixedLabel style={{width:'90%', alignSelf:'center',paddingHorizontal: 10, borderRadius: 10}}>
                                <TextInputMask
                                    type={'custom'}
                                    placeholder="000-00-0000-000"
                                    placeholderTextColor="#fff"
                                    keyboardType="number-pad"
                                    options={{
                                        mask: '999-99-9999-999'
                                    }}
                                    value={phone}
                                    onChangeText={(e) => setPhone(e)}
                                    style={[styles.whiteNormalTxt, {width:'100%'}]}
                                    />
                            </Item>
                        </View>
                        <View style={styles.itemContainer, {width:'95%', alignSelf:'center', marginTop: 10}}>
                            <Item regular fixedLabel style={{width:'90%', alignSelf:'center',paddingHorizontal: 10, borderRadius: 10}}>
                                <Input
                                value={username}
                                disabled style={styles.whiteNormalTxt} placeholder={translations.USER_NAME} placeholderTextColor="#fff" />
                            </Item>
                        </View>
                        <View style={styles.itemContainer, {width:'95%', alignSelf:'center', marginTop: 10}}>
                            <Item regular fixedLabel style={{width:'90%', alignSelf:'center',paddingHorizontal: 10, borderRadius: 10}}>
                                <Input
                                value={email}
                                disabled style={styles.whiteNormalTxt} placeholder={translations.EMAIL} placeholderTextColor="#fff" />
                            </Item>
                        </View>
                        <View style={styles.itemContainer, {width:'95%', alignSelf:'center', marginTop: 10}}>
                            <Item regular fixedLabel style={{width:'90%', alignSelf:'center',paddingHorizontal: 10, borderRadius: 10}}>
                                <Input 
                                secureTextEntry={show}
                                value={password}
                                onChangeText={(e) => setPassword(e)}
                                style={styles.whiteNormalTxt} placeholder={translations.PASSWORD} placeholderTextColor="#fff" />
                                <TouchableOpacity onPress={() => {setShow(!show)}}>
                                    <Image source={show ? hidePass : showPass} style={styles.imgIcon} />
                                </TouchableOpacity>
                            </Item>
                        </View>

                        <View style={styles.itemContainer}>
                        {!props.fetching ?
                        <Button onPress={() => {
                            onUpdate()
                        }} style={styles.btnStyle} full rounded>
                            <Text style={{color:'#fff'}}>
                                {translations.UPDATE}
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