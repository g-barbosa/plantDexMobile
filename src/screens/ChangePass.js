import React, {useState, useContext} from  'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import FetchService from '../services/FetchService'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ThemeContext from '../../context/ThemeContext'
import AppTheme from '../components/Theme'
import styles from '../styles/ChangePassStyles'

const ChangePass = ({navigation}) => {
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
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newConfirmPassword, setNewConfirmPassword] = useState('')

    const save = () => {
        setLoading(true)
        setErrorMessage('')
        if (newPassword !== newConfirmPassword) {
            setLoading(false)
            setErrorMessage('As senhas não são iguais')
        } else {
            FetchService.changePass(password, newPassword)
            .then(response => {
                if (response.data != null ) {
                    setLoading(false)
                    ToastAndroid.show(response.data.changePassword, ToastAndroid.SHORT)
                    navigation.navigate('Home')
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
                    secureTextEntry={showPass}
                    onChangeText={txt => setPassword(txt)}
                    placeholder='Digite sua atual senha'/>

                <TextInput style={[styles.main__input, {backgroundColor: AppTheme[theme].secondary, color: AppTheme[theme].text}]}
                    placeholderTextColor={AppTheme[theme].placeholderText}
                    secureTextEntry={showPass}
                    onChangeText={txt => setNewPassword(txt)}
                    placeholder='Digite sua nova senha'/>

                <TextInput style={[styles.main__input, {backgroundColor: AppTheme[theme].secondary, color: AppTheme[theme].text}]}
                    placeholderTextColor={AppTheme[theme].placeholderText}
                    secureTextEntry={showPass}
                    onChangeText={txt => setNewConfirmPassword(txt)}
                    placeholder='Digite novamente sua senha'/>

                <Text style={styles.errorMessage}>{errorMessage}</Text>

                <TouchableOpacity style={styles.main__eye} onPress={() => setShowPass(!showPass)}>
                    <Icon name='eye' size={20} color={AppTheme[theme].icons}/>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.main__button} onPress={save}>
                    {loading && <ActivityIndicator animating={loading} color="white" size="large"/>}
                    {!loading && <Text style={styles.main__button__text}>Salvar</Text>}          
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChangePass
