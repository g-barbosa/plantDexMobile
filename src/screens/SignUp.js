import React, {useState, useContext} from  'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import FetchService from '../services/FetchService'
import ThemeContext from '../../context/ThemeContext'
import AppTheme from '../components/Theme'
import styles from '../styles/SignUpStyles'


const SignUp = ({navigation}) => {
    const theme = useContext(ThemeContext)[0]

    navigation.setOptions({
        headerStyle: {
            height: 50, 
            backgroundColor: AppTheme[theme].logoutBackground, 
            elevation:0, 
            height: 75,
        }, 
        headerTintColor: AppTheme[theme].icons,
    })

    const [showPass, setShowPass] = useState(true)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const register = () => {
        setLoading(true)
        setErrorMessage('')
        if (password !== passwordConfirmation) {
            setErrorMessage('As senhas não são iguais')
        } else {
            FetchService.register({login: login, password: password})
            .then(response => {
                if (response.data != null ) {
                    setLoading(false)
                    navigation.navigate('Login')
                } else {
                    setLoading(false)
                    setErrorMessage(response.errors[0].message)
                }
            })
        }
    }

    return (
        <View style={[styles.container, {backgroundColor: AppTheme[theme].logoutBackground}]}>
            <View style={styles.main}>
                <TextInput style={[styles.main__input, {backgroundColor: AppTheme[theme].secondary, color: AppTheme[theme].text}]}
                    placeholderTextColor={AppTheme[theme].placeholderText}
                    onChangeText={txt => setLogin(txt)}
                    placeholder='Digite seu login'/>

                <TextInput style={[styles.main__input, {backgroundColor: AppTheme[theme].secondary, color: AppTheme[theme].text}]}
                    placeholderTextColor={AppTheme[theme].placeholderText}
                    onChangeText={txt => setPassword(txt)}
                    secureTextEntry={showPass}
                    placeholder='Digite sua nova senha'/>

                <TextInput style={[styles.main__input, {backgroundColor: AppTheme[theme].secondary, color: AppTheme[theme].text}]}
                    placeholderTextColor={AppTheme[theme].placeholderText}
                    onChangeText={txt => setConfirmPassword(txt)}
                    secureTextEntry={showPass}
                    placeholder='Digite novamente sua senha'/>

                <Text style={styles.errorMessage}>{errorMessage}</Text>

                <TouchableOpacity style={styles.main__eye} onPress={() => setShowPass(!showPass)}>
                    <Icon name='eye' size={20} color={AppTheme[theme].icons}/>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.main__button} onPress={register}>
                    {loading && <ActivityIndicator animating={loading} color="white" size="large"/>}
                    {!loading && <Text style={styles.main__button__text}>Cadastrar</Text>}
                </TouchableOpacity>
            </View>
            <View style={styles.registerWrapper}>
                <Text style={styles.registerWrapper__text}>Já possui uma conta?</Text>
                    <TouchableOpacity style={styles.registerWrapper__button} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.registerWrapper__textRegister}> Faça login!</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUp
