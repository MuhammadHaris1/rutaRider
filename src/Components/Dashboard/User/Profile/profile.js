import React from 'react'
import {View, Text, ScrollView, ImageBackground, Image, TouchableOpacity, Dimensions, Modal, FlatList} from 'react-native'
import { connect } from 'react-redux';
import {signup} from '../../../../Redux/Actions/userAction'
import { Item, Input, Label, Button} from 'native-base';
import {Avatar, Header, } from 'react-native-elements'
import FooterComponent from '../../User/Footer/footer'
const profileBack = require('../../../../../assets/profileBack.png')
const back = require('../../../../../assets/back.png')
const sidebar = require('../../../../../assets/sidebar.png')
const experience = require('../../../../../assets/experience.png')
const Trips = require('../../../../../assets/Trips.png')
const Profilestar = require('../../../../../assets/Profilestar.png')

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



class Profile extends React.Component {
    constructor (props) {
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
            selectedImage: ''
        }
    }


    componentDidMount = () => {
        this.setState({selectedImage: this.state.carImages[0]})
    }



    renderModal = () => {
        const {modalVisible} = this.state
        console.log(' this.state.selectedImage',  this.state.selectedImage)
        return (
            <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0,left: 0, right: 0 }}>
                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {this.setState({modalVisible:!modalVisible})}}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            
                            <View style={{backgroundColor:'rgb(41, 46, 66)', justifyContent:'center', alignContent:'center', padding:15, width:'95%', borderRadius:10}}>

                                <View style={{flexDirection:'row' }}>
                                    <TouchableOpacity onPress={() => {this.setState({modalVisible:!modalVisible})}} style={{width:'25%'}}>
                                        <Text style={{backgroundColor:'red', borderRadius: 100, height:20, width: 20, textAlign:'center', color:'#fff'}}>X</Text>
                                    </TouchableOpacity>

                                    <View>
                                        <Text style={{textAlign:'center', color:'#fff', fontSize: 25}}>Vehicle View</Text>
                                    </View>
                                </View>

                               <View style={{borderWidth: 2, borderColor:'#fff', padding: 5}}>
                                         <Image source={{uri: this.state.selectedImage}} style={{height:150, width:'100%', alignSelf:'center'}}/>                                    
                                </View>
                                
                                <View>
                                    <FlatList
                                    data={this.state.carImages}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, index }) => {
                                        return(
                                            <TouchableOpacity style={{alignItems: 'center' }} onPress={() => {
                                                this.setState({selectedImage: item})
                                            }}>
                                                <View style={{borderWidth: 2, borderColor:'#fff', padding: 5, margin: 5}}>
                                                    <Image source={{uri: item}} style={{height:50, width: 80, alignSelf:'center'}}/>                                    
                                                </View>
                                            </TouchableOpacity>
                                            )
                                        }}
                                        keyExtractor={(item, index) => index}
                                    />
                                </View>

                                <View style={{flexDirection:'row', justifyContent:'space-around', backgroundColor:'#3A91FA', width:"100%", padding: 5, marginTop: 10}}>
                                    <Text style={{color:'#fff'}}>
                                        Vehicle Name
                                    </Text>

                                    <Text style={{color:'#fff'}}>
                                       Hyundai
                                    </Text>
                                </View>

                                <View style={{flexDirection:'row', justifyContent:'space-around', backgroundColor:'transparent', width:"100%", padding: 5, marginTop: 10}}>
                                    <Text style={{color:'#fff'}}>
                                        Vehicle Name
                                    </Text>

                                    <Text style={{color:'#fff'}}>
                                       Hyundai
                                    </Text>
                                </View>

                                <View style={{flexDirection:'row', justifyContent:'space-around', backgroundColor:'#3A91FA', width:"100%", padding: 5, marginTop: 10}}>
                                    <Text style={{color:'#fff'}}>
                                        Vehicle Name
                                    </Text>

                                    <Text style={{color:'#fff'}}>
                                       Hyundai
                                    </Text>
                                </View>

                                <View style={{flexDirection:'row', justifyContent:'space-around', backgroundColor:'transparent', width:"100%", padding: 5, marginTop: 10}}>
                                    <Text style={{color:'#fff'}}>
                                        Vehicle Name
                                    </Text>

                                    <Text style={{color:'#fff'}}>
                                       Hyundai
                                    </Text>
                                </View>


                                <View style={{flexDirection:'row', justifyContent:'space-around', backgroundColor:'#3A91FA', width:"100%", padding: 5, marginTop: 10}}>
                                    <Text style={{color:'#fff'}}>
                                        Vehicle Name
                                    </Text>

                                    <Text style={{color:'#fff'}}>
                                       Hyundai
                                    </Text>
                                </View>

                            </View>
                        </View>
                    </Modal>
            </View>
        )
    }

    render() {

            return (
                <View style={{flex: 1}}>
                <ImageBackground source={profileBack} style={{height:"100%", width:'102%', flex: 1, right:5}}> 
                    <ScrollView contentContainerStyle={{paddingBottom: 70}}>
                        <View style={{flex: 1, justifyContent:'center', alignItems:'center',  }}>

                            {this.renderModal()}

                            <Header
                                containerStyle={{backgroundColor:'transparent', borderBottomWidth: 0}}
                                // leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                //     <Image source={sidebar} style={{height: 20, width: 20}} />
                                // </TouchableOpacity>}
                                rightComponent={
                                    <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                                    <Image source={sidebar} style={{height: 20, width: 20}} />
                                    </TouchableOpacity>
                                }
                            />

                            <View style={{borderWidth: 15, borderColor:'#fff', borderRadius: 100, marginTop: hp(10)}}>
                                    <Avatar
                                    size="xlarge" 
                                    rounded
                                    source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGkKTkKnqZE23RyW0_npSDjVKIVg_uLRmZbw&usqp=CAU'}}
                                    />
                            </View>

                            {/* <TouchableOpacity onPress={() => this.setState({modalVisible: true})} style={{marginLeft:'65%', bottom:20}}>
                                <Text style={{color:'#fff', textDecorationLine:'underline'}}>
                                    View Vehicle
                                </Text>
                            </TouchableOpacity> */}



                            <View style={{flexDirection:'row', width:'100%', justifyContent:'space-around', paddingTop: 25}}>

                                    {/* <View style={{width:'25%', backgroundColor:'rgba(74, 83, 116, 0.9)', borderRadius: 10,}}>
                                            <View>
                                                <Image source={Profilestar} style={{height:35, width: 35, alignSelf:'center'}} />
                                            </View>

                                            <View style={{height: 2, backgroundColor:'#3A91FA', width:'80%', alignSelf:'center'}} />

                                            <View>
                                                <Text style={{color:'#fff', textAlign:'center'}}>4.9</Text>
                                                <Text style={{color:'#fff', textAlign:'center'}}>Rating</Text>
                                            </View>
                                    </View>


                                    <View style={{width:'25%', backgroundColor:'rgba(74, 83, 116, 0.9)', borderRadius: 15,}}>
                                            <View>
                                                <Image source={experience} style={{height:35, width: 35, alignSelf:'center'}} />
                                            </View>

                                            <View style={{height: 2, backgroundColor:'#3A91FA', width:'80%', alignSelf:'center'}} />

                                            <View>
                                                <Text style={{color:'#fff', textAlign:'center'}}>4 Years</Text>
                                                <Text style={{color:'#fff', textAlign:'center'}}>Experience</Text>
                                            </View>
                                    </View> */}


                                    <View style={{width:'25%', backgroundColor:'rgba(74, 83, 116, 0.9)', borderRadius: 15, }}>
                                            <View style={{top: hp(1.5)}}>
                                                <Image source={Trips} style={{height:35, width: 35, alignSelf:'center'}} />
                                            </View>

                                            <View style={{height: 2, backgroundColor:'#3A91FA', width:'80%', alignSelf:'center', marginVertical: hp(2)}} />

                                            <View style={{marginVertical: hp(1.5)}}>
                                                <Text style={{color:'#fff', textAlign:'center'}}>77</Text>
                                                <Text style={{color:'#fff', textAlign:'center'}}>Trips</Text>
                                            </View>
                                    </View>

                            </View>


                            <View style={{paddingVertical: 15}}>
                                <Text style={{color:'#fff', textAlign:'center', fontSize:35}}>JOHN DOE</Text>
                                {/* <Text style={{color:'#fff', textAlign:'center'}}>RUTA DRIVER</Text> */}
                            </View>




                            <View >
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{color:'#3A91FA', textAlign:'center', right: 15, fontSize: 25}}>E</Text>
                                    <Text style={{color:'#fff', textAlign:'center', top: 5, fontSize:17}}>johndoe@example.com</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{color:'#3A91FA', textAlign:'center', right: 15, fontSize: 25}}>A</Text>
                                    <Text style={{color:'#fff', textAlign:'center', top: 5, fontSize:17}}>johndoe@example.com</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{color:'#3A91FA', textAlign:'center', right: 15, fontSize: 25}}>C</Text>
                                    <Text style={{color:'#fff', textAlign:'center', top: 5, fontSize:17}}>+ 00 000 00000000</Text>
                                </View>
                            </View>


                        </View>
                    </ScrollView>
                    <FooterComponent  goto={(e) => this.props.navigation.navigate(e)} active={"profile"} />
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


export default connect(mapStateToProps, mapDispatchToProps)(Profile);