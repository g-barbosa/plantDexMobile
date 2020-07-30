import React, {useState, useContext} from 'react'
import { View, Text } from 'react-native'
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome5'

import ThemeContext from '../../context/ThemeContext'
import AppTheme from '../components/Theme'

const DrawerContent = ({navigation}, props) => {
    const theme = useContext(ThemeContext)[0]

    const [modeState, setModeState] = useContext(ThemeContext)
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
        <View style={{flex: 1, backgroundColor: AppTheme[theme].sideMenuBackground}}>
            <DrawerContentScrollView {...props}>
                <Text style={{textAlign: "center", color: "#099820", fontWeight: "bold", margin: 10}}>{login}</Text>

                <DrawerItem 
                    icon={() => <Icon name='lock' size={20} color="#099820"/>}
                    onPress={() => navigation.navigate('ChangePass')}
                    labelStyle={{color: AppTheme[theme].text, fontWeight: "bold"}} 
                    label="Alterar Senha"/>
                {modeState === 'dark' && 
                    <DrawerItem 
                        icon={() => <Icon name='sun' size={20} color="#099820"/>} 
                        onPress={() => setModeState('light')} 
                        labelStyle={{color: AppTheme[theme].text, fontWeight: "bold"}} 
                        label="Tema Claro"/>}

                {modeState === 'light' && 
                <DrawerItem 
                    icon={() => <Icon name='moon' size={20} color="#099820"/>} 
                    onPress={() => setModeState('dark')} 
                    labelStyle={{color: AppTheme[theme].text, fontWeight: "bold"}} 
                    label="Tema Escuro"/>}

                <DrawerItem 
                    icon={() => <Icon name='power-off' size={20} color="#099820"/>} 
                    onPress={logout} 
                    labelStyle={{color: AppTheme[theme].text, fontWeight: "bold"}} 
                    label="Sair"/>
            </DrawerContentScrollView>
        </View>
    )
}

export default DrawerContent