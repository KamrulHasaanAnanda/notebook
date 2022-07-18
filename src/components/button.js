import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = ({title,customStyle,onPress}) => {
    return (
        <TouchableOpacity style={[styles.button,customStyle]} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        borderRadius:10,
        width:160,
        height:50,
        backgroundColor:"#F24C4C",
        justifyContent:"center",
        alignItems:"center"
    },
    title:{
        fontSize:16,
        fontWeight:"bold",
        color:"white"
    }
})

export default Button;
