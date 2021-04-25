import { Platform, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS == "ios" ? 20 : 0
    },
    backroundImage: {
        height: '100%',
        width: '110%',
        right: 15
    },
    itemContainer: {
        padding: 10,
    },
    round: {
        borderRadius: 10
    },
    scheduleCard : {
        backgroundColor: 'rgba(209, 210, 212, 0.4)',
        borderRadius: 10,
        marginVertical: 10,
        width:'85%',
        alignSelf:'center'
    },
    whiteBoldTxt: {
        fontWeight: 'bold',
        color:'#fff',
        letterSpacing: 2,
        fontSize: 18
    },
    row: {
        flexDirection:'row'
    },
    spaceBtw: {
        justifyContent:'space-between'
    },
    imgIcon: {
        height: 20, 
        width: 20,
        margin: 5
    },
    whiteNormalTxt: {
        color:'#fff',
        fontSize: 15
    },
    btnStyle: {
        alignSelf:'center', 
        marginTop:20, 
        backgroundColor:'#3A91FA',
        width:'90%'
    },
    yellowTxt: {
        color:'#fcd303',
        fontWeight: 'bold', 
        letterSpacing: 2
    },
    redTxt: {
        color:'#fc0f03',
        fontWeight: 'bold', 
        letterSpacing: 2
    },
    blueTxt: {
        color:'#3A91FA',
        fontWeight: 'bold', 
        letterSpacing: 2
    },
    greenTxt: {
        color:'#129406',
        fontWeight: 'bold', 
        letterSpacing: 2
    },
})