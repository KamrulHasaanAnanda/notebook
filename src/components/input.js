import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const Input = ({placeholder,secureTextEntry,onChangeText}) => {
    return (
        <View>
        <TextInput onChangeText={onChangeText} placeholder={placeholder} style={styles.input} secureTextEntry={secureTextEntry}/>
            
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginHorizontal: 20,
        height: 48,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginBottom: 28,
      },
})

export default Input;
