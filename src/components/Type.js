import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image } from  'react-native'
import CheckBox from '@react-native-community/checkbox'

const Type = (props) => {
    const [state, setState] = useState(props.checkboxState)
    return (
        <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxContainer__text}>{props.type}</Text>
            <CheckBox value={state} disable={false} onChange={() => {
                var types = props.types
                types[props.index] = !types[props.index]
                setState(!state)
                props.triggerTypes(types)
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    checkboxContainer: {
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between", 
        marginTop: 5,  
        marginLeft: 5
    },

    checkboxContainer__text: {
        color: "#006641", 
        fontWeight: "bold", 
        fontSize: 20
    }
})

export default Type