import React, {useState} from  'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import FetchService from '../services/FetchService'
import Icon from 'react-native-vector-icons/FontAwesome5'

const ChangePass = ({navigation}) => {
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
        <View style={styles.container}>
            <View style={styles.main}>
                <TextInput style={styles.main__input}
                    placeholderTextColor="#656363"
                    secureTextEntry={showPass}
                    onChangeText={txt => setPassword(txt)}
                    placeholder='Digite sua atual senha'/>

                <TextInput style={styles.main__input}
                    placeholderTextColor="#656363"
                    secureTextEntry={showPass}
                    onChangeText={txt => setNewPassword(txt)}
                    placeholder='Digite sua nova senha'/>

                <TextInput style={styles.main__input}
                    placeholderTextColor="#656363"
                    secureTextEntry={showPass}
                    onChangeText={txt => setNewConfirmPassword(txt)}
                    placeholder='Digite novamente sua senha'/>

                <Text style={styles.errorMessage}>{errorMessage}</Text>

                <TouchableOpacity style={styles.main__eye} onPress={() => setShowPass(!showPass)}>
                    <Icon name='eye' size={20} color="#099820"/>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.main__button} onPress={save}>
                    {loading && <ActivityIndicator animating={loading} color="white" size="large"/>}
                    {!loading && <Text style={styles.main__button__text}>Salvar</Text>}          
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
        marginTop: 150,
        marginBottom: 135,
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
        top: 18,
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

    errorMessage: {
        color: "red",
        textAlign: "center"
    }
})

export default ChangePass