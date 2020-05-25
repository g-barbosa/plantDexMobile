import React, {useState} from  'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, YellowBox } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import FetchService from '../services/FetchService'

import logo from "../../assets/logo-header.png"
import eye from '../../assets/eye.png'

YellowBox.ignoreWarnings(['Require cycle:'])

const Login = ({navigation}) => {
    const [showPass, setShowPass] = useState(true)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const SignIn = () => {
        setErrorMessage('')
        FetchService.login({login: login, password: password})
        .then(response => {
            if (response.data.login != null){
                AsyncStorage.setItem('@token', response.data.login.token)
                navigation.navigate('Home')
            } else{
                setErrorMessage(response.errors[0].message)
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo}/>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
            <View style={styles.main}>
                <TextInput style={styles.main__input}
                    placeholderTextColor="#656363"
                    autoCapitalize='none'
                    onChangeText={txt => setLogin(txt)}
                    placeholder='Digite seu login'/>

                <TextInput style={styles.main__input}
                    placeholderTextColor="#656363"
                    secureTextEntry={showPass}
                    onChangeText={txt => setPassword(txt)}
                    placeholder='Digite sua senha'/>

                <TouchableOpacity onPress={() => navigation.navigate('ChangePass')}>
                    <Text style={styles.main__textForgot}>Esqueceu sua senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.main__eye} onPress={() => setShowPass(!showPass)}>
                    <Image source={eye}/>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.main__button} onPress={SignIn}>
                    <Text style={styles.main__button__text}>Entrar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.registerWrapper}>
                <Text style={styles.registerWrapper__text}>Não tem conta?</Text>
                    <TouchableOpacity style={styles.registerWrapper__button} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.registerWrapper__textRegister}>Cadastre-se</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        alignItems: "center",
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
        padding: 25,
        paddingTop: 20
    },

    main: {
        marginTop: 20,
        width: "100%"
    },

    main__input: {
        backgroundColor: "#F7F7F7",
        borderColor: "#DDD",
        borderWidth: 1,
        borderRadius: 8,
        height: 55,
        marginBottom: 20,
        paddingHorizontal: 15,
        width: "100%"
    },

    main__textForgot: {
        alignSelf: "flex-end",
        color: "#099820",
        fontSize: 15,
        fontWeight: 'bold'
    },

    main__eye: {
        position: "absolute",
        top: 98,
        left: "86%"
    },

    main__button: {
        alignItems: "center",
        backgroundColor: "#099820",
        borderRadius: 8,
        justifyContent: "center",
        height: 55,
        marginTop: 60,
        width: "100%"
    },

    main__button__text: {
        color: "white", 
        fontWeight: "bold", 
        fontSize: 18
    },

    registerWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    registerWrapper__text: {
        marginRight: 2,
        color: "#8E8E8E",
        fontSize: 15
    },

    registerWrapper__button: {
        flexDirection: "row",
        alignItems: "center"
    },

    registerWrapper__textRegister: {
        marginRight: 5,
        fontSize: 15,
        fontWeight: "bold",
        color: "#099820"
    },

    errorMessage: {
        color: "red",
        textAlign: "center"
    }
})

export default Login