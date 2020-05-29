import React, {useState} from  'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'

import FetchService from '../services/FetchService'

import Icon from 'react-native-vector-icons/FontAwesome5'

const SignUp = ({navigation}) => {
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
        <View style={styles.container}>
            <View style={styles.main}>
                <TextInput style={styles.main__input}
                    placeholderTextColor="#656363"
                    onChangeText={txt => setLogin(txt)}
                    placeholder='Digite seu login'/>

                <TextInput style={styles.main__input}
                    placeholderTextColor="#656363"
                    onChangeText={txt => setPassword(txt)}
                    secureTextEntry={showPass}
                    placeholder='Digite sua nova senha'/>

                <TextInput style={styles.main__input}
                    placeholderTextColor="#656363"
                    onChangeText={txt => setConfirmPassword(txt)}
                    secureTextEntry={showPass}
                    placeholder='Digite novamente sua senha'/>

                <Text style={styles.errorMessage}>{errorMessage}</Text>

                <TouchableOpacity style={styles.main__eye} onPress={() => setShowPass(!showPass)}>
                    <Icon name='eye' size={20} color="#099820"/>
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
        marginTop: 75,
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

    main__eye: {
        position: "absolute",
        top: 92,
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

export default SignUp