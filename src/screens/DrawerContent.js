import React, {useState} from 'react'
import { View, Text } from 'react-native'
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome5'

const DrawerContent = ({navigation}, props) => {
    const [modeState, setModeState] = useState(false)
    const [login, setLogin] = useState('...')

    const getUserName = async () => {
        const username = await AsyncStorage.getItem('@login')
        setLogin(`Olá, ${username}!`)
    }

    getUserName()
    
    const logout = async () => {
        AsyncStorage.removeItem('@token')
        navigation.navigate('Login')
    }

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <Text style={{textAlign: "center", color: "#006641", fontWeight: "bold", margin: 10}}>{login}</Text>

                <DrawerItem 
                    icon={() => <Icon name='lock' size={20} color="#099820"/>}
                    onPress={() => navigation.navigate('ChangePass')}
                    labelStyle={{color: "#006641", fontWeight: "bold"}} 
                    label="Alterar Senha"/>
                {!modeState && 
                    <DrawerItem 
                        icon={() => <Icon name='sun' size={20} color="#099820"/>} 
                        onPress={() => setModeState(true)} 
                        labelStyle={{color: "#006641", fontWeight: "bold"}} 
                        label="Modo Diurno"/>}

                {modeState && 
                <DrawerItem 
                    icon={() => <Icon name='moon' size={20} color="#099820"/>} 
                    onPress={() => setModeState(false)} 
                    labelStyle={{color: "#006641", fontWeight: "bold"}} 
                    label="Modo Noturno"/>}

                <DrawerItem 
                    icon={() => <Icon name='power-off' size={20} color="#099820"/>} 
                    onPress={logout} 
                    labelStyle={{color: "#006641", fontWeight: "bold"}} 
                    label="Sair"/>
            </DrawerContentScrollView>
        </View>
    )
}

export default DrawerContent