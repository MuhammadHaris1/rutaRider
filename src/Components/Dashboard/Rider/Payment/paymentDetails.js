import React,{useState}   from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Item, Input } from 'native-base'
import {Picker} from '@react-native-community/picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PaymentDetails = (props) => {
const [year, setYear] = useState(new Date().getFullYear())
const [month, setMonth] = useState(new Date().getMonth())
const years = Array.from(new Array(11),( val, index) => year + index); 
const months = Array.from(new Array(12),(val, ind) => 1 + ind)

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.container}>
                   <View style={styles.itemContainer}>
                       <Item regular style={styles.inputContainer}>
                           <Input placeholder="Card Number" style={{color:'#fff'}} placeholderTextColor="#fff" />
                       </Item>
                       <View style={styles.grpItem}>
                           <View style={styles.pickerContainer}>
                                <Picker
                                    style={{...styles.pickerContainer, marginVertical:0}}
                                    selectedValue={years}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setYear(itemValue)
                                    }>
                                    {years.map((val, ind) => {
                                        // console.log("STRING", val, typeof val)
                                        return(
                                            <Picker.Item color="#000" key={ind} label={val.toString()} value={val.toLocaleString()} />
                                        )
                                    })}
                                </Picker>
                            </View>

                            <View style={styles.pickerContainer}>
                                <Picker
                                    style={{...styles.pickerContainer, marginVertical:0}}
                                    selectedValue={month}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setMonth(itemValue)
                                    }>
                                    {months.map((val, ind) => {
                                        // console.log("STRING", val, typeof val)
                                        return(
                                            <Picker.Item color="#000" key={ind} label={val.toString()} value={val.toLocaleString()} />
                                        )
                                    })}
                                </Picker>
                            </View>
                       </View>
                       <Item regular style={styles.inputContainer}>
                            <Input placeholder="Enter Your Card Name" style={{color:'#fff'}} placeholderTextColor="#fff" />
                        </Item>
                        <Item regular style={styles.inputContainer}>
                            <Input placeholder="CVV" style={{color:'#fff'}} placeholderTextColor="#fff" />
                        </Item>
                   </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        // backgroundColor:'rgb(43,48,68)',
        // width: wp(90)
    },
    normaText: {
        color:'#fff'
    },
    itemContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10
        
    },
    inputContainer: {
        borderColor:"#3A91FA",
        borderRadius: 10,
        // width: wp(90)
    },
    grpItem: {
        flexDirection:'row',
        justifyContent:'space-between'
    },
    pickerContainer: {
        height: 50, 
        width: wp(40), 
        color:'#fff',  
        borderColor:"#3A91FA",
        borderRadius: 10 , 
        borderWidth: 1, 
        marginVertical: 10
    }
})

export default PaymentDetails