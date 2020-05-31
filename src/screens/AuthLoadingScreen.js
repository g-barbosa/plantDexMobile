import React, { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const AuthLoadingScreen = ({navigation}) => {

    useEffect(() => {
        const auth = async () => {
            const userToken = await AsyncStorage.getItem('@token');

            navigation.navigate(userToken ? 'Home' : 'Login')
        }
        auth()
    })

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#CCFFC8" }}>
            <ActivityIndicator size="large" color="#099820" />
        </View>
    )
}

export default AuthLoadingScreen