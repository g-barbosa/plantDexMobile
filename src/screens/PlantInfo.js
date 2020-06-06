import React, {useContext} from 'react'
import { View, Text, Image, Alert, ToastAndroid, TouchableOpacity } from  'react-native'

import FetchService from '../services/FetchService'
import AppTheme from '../components/Theme'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ThemeContext from '../../context/ThemeContext'
import styles from '../styles/PlantInfoStyles'

const PlantInfo = ({navigation, route}) => {
    const theme = useContext(ThemeContext)[0]

    navigation.setOptions({
        headerStyle: {height: 50, backgroundColor: AppTheme[theme].homeBackground, elevation:0}, 
        headerTintColor: AppTheme[theme].icons,
    })

    const {params} = route

    const DeleteAlert = () => {
        Alert.alert(
            "Excluir Planta",
            "Tem certeza que deseja excluir esta planta?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Confirmar", onPress: async () => {
                    await FetchService.deletePlant(params.id)
                    .then(response => {
                        ToastAndroid.show(response.data.deletePlant, ToastAndroid.SHORT)
                        navigation.navigate('Home')
                    })
                } },
            ],
            { cancelable: false }
        )
    }

    return (
        <View style={[styles.container, {backgroundColor: AppTheme[theme].homeBackground}]}>
            <View style={[styles.card, {backgroundColor: AppTheme[theme].secondary}]}>
                <Text style={[styles.card__plantName, {color: AppTheme[theme].name}]}>{params.name}</Text>
                <Text style={[styles.card__scientificName, {color: AppTheme[theme].scientificName}]}>{params.scientificName}</Text>

                <View style={styles.types}>
                    <Text style={[styles.types__title, {color: AppTheme[theme].text}]}>Tipos</Text>
                    <View style={styles.types__types}>
                        {
                            params.types.map(type => (
                                <View key={type} style={[styles.types__types__container, {backgroundColor: AppTheme[theme].typesBackground}]}>
                                    <Text style={[styles.types__types__container__text, {color: AppTheme[theme].typeText}]}>{type}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>

                <View style={styles.informations}>
                    <Text style={[styles.informations__tile, {color: AppTheme[theme].text}]}>Informações</Text>
                    <View style={styles.informations__textContainer}>
                        <Text style={[styles.informations__textContainer__text, {color: AppTheme[theme].text}]}>{params.informations}</Text>
                    </View>
                </View>
            </View>
            <Image style={styles.PlantImage} source={{uri: params.image}}/>
            <View style={styles.footer}>
                <TouchableOpacity hitSlop={{right: 150}} onPress={() => navigation.navigate('Edit', {
                    id: params.id,
                    name: params.name,
                    scientificName: params.scientificName,
                    types: params.types,
                    informations: params.informations,
                    image: params.image
                })}>
                    <Icon name='edit' size={20} color="#099820"/>
                </TouchableOpacity>

                <TouchableOpacity onPress={DeleteAlert} hitSlop={{left: 150}}>
                    <Icon name='trash-alt' size={20} color="#099820"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PlantInfo
