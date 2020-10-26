import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Modal } from 'react-native'
import PaymentDetails from '../Payment/paymentDetails'
const RenderAddPayment = (props) => {

    const onSubmit = (year, month, cardNumber, CVV, name) => {
        console.log("year, month, cardNumber, CVV, name", year, month, cardNumber, CVV, name)
    }

    return (
        <View style={styles.mainContainer}>
            <Modal
                transparent={true}
                visible={props.addPayment}
                onRequestClose={() => {
                    // this.setState({addVehicle:!addVehicle})
                    BackHandler.exitApp()
                }}
            >
                <View style={styles.backgroundContainer}>
                    <View style={[styles.heading, styles.itemContainer]}>
                        <Text style={styles.heading}>
                            Add Payment
                        </Text>
                    </View>
                    <ScrollView style={{ width: '100%' }}>
                        <PaymentDetails submit={onSubmit}  />
                    </ScrollView>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: { 
        flex: 1, 
        position: 'absolute', 
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0 
    },
    backgroundContainer: { 
        backgroundColor: 'rgb(41, 46, 66)', 
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center', 
        height: '100%' 
    },
    heading: {
        color:"#fff",
        fontSize: 18
    },
    centerComponent: {
        alignItems:'center',
        justifyContent:'center'
    },
    itemContainer: {
        padding: 20
    }
})

export default RenderAddPayment;