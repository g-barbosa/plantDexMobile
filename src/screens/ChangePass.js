import React, {useState} from  'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'

import eye from '../../assets/eye.png'

const ChangePass = ({navigation}) => {
    const [showPass, setShowPass] = useState(true)

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <TextInput style={styles.main__input}
                    placeholderTextColor="#656363"
                    secureTextEntry={showPass}
                    placeholder='Digite sua nova senha'/>

                <TextInput style={styles.main__input}
                    placeholderTextColor="#656363"
                    secureTextEntry={showPass}
                    placeholder='Digite novamente sua senha'/>

                <TouchableOpacity style={styles.main__eye} onPress={() => setShowPass(!showPass)}>
                    <Image source={eye}/>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.main__button} onPress={() => navigation.navigate('Login')}>
                    <Text style={{color: "white", fontWeight: "bold", fontSize: 18}}>Salvar</Text>
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
        top: 20,
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
})

export default ChangePass