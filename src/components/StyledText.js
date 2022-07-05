import React from 'react'
import {Text,View, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        color: 'grey'
    },
    bold: {
        fontWeight:'bold'
    },
    black: {
        color: 'black'
    },
    white:{
        color:'white'
    },
    big: {
        fontSize: 15
    },
    small: {
        fontSize: 10
    },
    alignCenter:{
        textAlign:'center'
    },
    alignRight:{
        textAlign:'right',
    },
    mainColor:{
        color:'#6556D9'
    },
    backgroundGrey:{
        backgroundColor:'grey',
        
    },
    padding5:{
        padding:3
    }
    
    

})



export default function StyledSheet({numberOfLines = 0,white,padding5,backgroundGrey,mainColor,alignCenter, alignRight, black, bold, children, big,small}){
    const textStyle = [
        styles.text,
        alignCenter  && styles.alignCenter,
        alignRight  && styles.alignRight,
        black  && styles.black,
        white  && styles.white,
        bold  && styles.bold,
        big   && styles.big,
        small && styles.small,
        mainColor && styles.mainColor,
        backgroundGrey && styles.backgroundGrey,
        padding5 && styles.padding5
    ]
    return (
        <Text  numberOfLines={numberOfLines} style={textStyle}>
            {children}
        </Text>
    )
}