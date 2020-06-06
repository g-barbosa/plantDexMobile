import React, {useState, useContext} from  'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, YellowBox, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5'

import ThemeContext from '../../context/ThemeContext'
import AppTheme from '../components/Theme'
import FetchService from '../services/FetchService'
import logo from "../../assets/logo-header.png"
import styles from '../styles/LoginStyles'

YellowBox.ignoreWarnings(['Require cycle:'])

const Login = ({navigation}) => {
    const theme = useContext(ThemeContext)[0]

    const [showPass, setShowPass] = useState(true)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const SignIn = () => {
        setLoading(true)
        setErrorMessage('')
        FetchService.login({login: login, password: password})
        .then(response => {
            if (response.data.login != null){
                AsyncStorage.setItem('@token', response.data.login.token)
                AsyncStorage.setItem('@user_id', response.data.login.id.toString())
                AsyncStorage.setItem('@login', response.data.login.login)
                setLoading(false)
                navigation.navigate('Home')
            } else{
                setLoading(false)
                setErrorMessage(response.errors[0].message)
            }
        })
    }

    return (
        <View style={[styles.container, {backgroundColor: AppTheme[theme].logoutBackground}]}>
            <View style={styles.header}>
                <Image source={logo}/>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
            <View style={styles.main}>
                <TextInput style={[styles.main__input, {backgroundColor: AppTheme[theme].secondary, color: AppTheme[theme].text}]}
                    placeholderTextColor={AppTheme[theme].placeholderText}
                    autoCapitalize='none'
                    onChangeText={txt => setLogin(txt)}
                    placeholder='Digite seu login'/>

                <TextInput style={[styles.main__input, {backgroundColor: AppTheme[theme].secondary, color: AppTheme[theme].text}]}
                    placeholderTextColor={AppTheme[theme].placeholderText}
                    secureTextEntry={showPass}
                    onChangeText={txt => setPassword(txt)}
                    placeholder='Digite sua senha'/>

                <TouchableOpacity>
                    <Text style={styles.main__textForgot}>Esqueceu sua senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.main__eye} onPress={() => setShowPass(!showPass)}>
                    <Icon name='eye' size={20} color={AppTheme[theme].icons}/>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.main__button} onPress={SignIn}>
                    {loading && <ActivityIndicator animating={loading} color="white" size="large"/>}
                    {!loading && <Text style={styles.main__button__text}>Entrar</Text>}
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

export default Login
