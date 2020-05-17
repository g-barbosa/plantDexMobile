import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image } from  'react-native'
import CheckBox from '@react-native-community/checkbox'

import Type from './Type'

const SelectType = (props) => {
    const [types, setTypes] = useState(props.selectedTypes)

    const updateTypes = (updateds) => {
        setTypes(updateds)
        props.changeTypesState(types)
    }

    return (
        <>
        <View style={styles.select}>
            <Type type={'Árvore'} types={types} index={0} triggerTypes={(updateds) => updateTypes(updateds)} checkboxState={types[0]}/>
            <Type type={'Cacto'} types={types} index={1} triggerTypes={(updateds) => updateTypes(updateds)} checkboxState={types[1]}/>
            <Type type={'Flor'} types={types} index={2} triggerTypes={(updateds) => updateTypes(updateds)} checkboxState={types[2]}/>
            <Type type={'Folha'} types={types} index={3} triggerTypes={(updateds) => updateTypes(updateds)} checkboxState={types[3]}/>
        </View>
        <View style={styles.triangle}/>
        </>
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

    select: {
        width: 100, 
        height: 150, 
        backgroundColor: "#E5E5E5", 
        borderRadius: 5, 
        position: "absolute",
        top: 270,
        left: "45%"
    },

    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#E5E5E5',
        top: 260,
        left: "65%",
        position: "absolute"
      }
})

export default SelectType