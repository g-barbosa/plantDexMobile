import React, { useState, useContext } from 'react'
import { 
    View, Text, StyleSheet, Dimensions, TextInput, 
    TouchableOpacity, Image, ScrollView, ActivityIndicator,ToastAndroid } from  'react-native'
import ImagePicker from 'react-native-image-picker'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5'

import SelectType from '../components/SelectType'
import FetchService from '../services/FetchService'
import ThemeContext from '../../context/ThemeContext'
import AppTheme from '../components/Theme'
import styles from '../styles/EditPlantStyles'

const options = {
    storageOptions: {
        skipBackup: true,
        path: 'images',
      },
}

const EditPlant = ({navigation, route}) => {
    const theme = useContext(ThemeContext)[0]

    navigation.setOptions({
        headerStyle: {height: 50, backgroundColor: AppTheme[theme].homeBackground, elevation:0}, 
        headerTintColor: AppTheme[theme].icons,
    })

    const {params} = route

    const [showSelect, setShowSelect] = useState(false)
    const [name, setName] = useState(params.name)
    const [scientificName, setScientificName] = useState(params.scientificName)
    const [types, setTypes] = useState([false, false, false, false])
    const [informations, setInformations] = useState(params.informations)
    const [image, setImage] = useState({uri: params.image})
    const [loading, setLoading] = useState(false)

    const save = async () => {
        setLoading(true)
        const user_id = await AsyncStorage.getItem('@user_id')
        await FetchService.updatePlant(params.id, {
            name: name,
            scientificName: scientificName,
            types: types,
            informations: informations,
            image: image.uri,
            user_id: user_id
        }, types)
        .then((response) => {
            setLoading(false)
            ToastAndroid.show(response.data.updatePlant, ToastAndroid.SHORT)
            navigation.navigate('Home')
        })
    }

    return (
        <ScrollView 
            style={[styles.container, {backgroundColor: AppTheme[theme].homeBackground}]} 
            contentContainerStyle={{alignItems: "center"}}> 
            <View style={[styles.card, {backgroundColor: AppTheme[theme].secondary}]}>
                <TextInput style={[styles.card__input, {backgroundColor: AppTheme[theme].overlays}]}
                    placeholderTextColor={AppTheme[theme].placeholderText}
                    value={name}
                    onChangeText={txt => setName(txt)}
                    maxLength={18}
                    placeholder='Nome da Planta'/>

                <TextInput style={[styles.card__input, {backgroundColor: AppTheme[theme].overlays}]}
                    placeholderTextColor={AppTheme[theme].placeholderText}
                    value={scientificName}
                    onChangeText={txt => setScientificName(txt)}
                    maxLength={22}
                    placeholder='Nome Cientifico'/>

                <TextInput editable={false} style={[styles.card__input, {backgroundColor: AppTheme[theme].overlays}]}
                    placeholderTextColor={AppTheme[theme].placeholderText}
                    placeholder='Tipo'/>

                <TouchableOpacity style={styles.card__down} onPress={() => setShowSelect(!showSelect)} hitSlop={{left: 300}}>
                    <Icon name='chevron-down' size={20} color="#099820"/>
                </TouchableOpacity>

                <TextInput multiline={true} style={[styles.card__input, {height: 100, backgroundColor: AppTheme[theme].overlays}]}
                    placeholderTextColor={AppTheme[theme].placeholderText}
                    placeholder='Informações adicionais'
                    value={informations}
                    onChangeText={txt => setInformations(txt)}
                    maxLength={130}/>

                <View style={styles.warning}>
                    <View style={styles.warning__items}>
                        <Icon name='exclamation-triangle' style={{marginRight: 15}} size={20} color="red"/>
                        <Text style={[styles.warning__text, {color: AppTheme[theme].warningText}]}>
                            {'As informações devem\nconter até 130 caracteres.'}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.card__button} onPress={save}>
                    {loading && <ActivityIndicator animating={loading} color="white" size="large"/>}
                    {!loading && <Text style={styles.card__button__text}>Salvar</Text>}
                </TouchableOpacity>

                {showSelect && <SelectType selectedTypes={types} changeTypesState={(types) => setTypes(types)}/>}
            </View>
            <View style={styles.PlantImage}>
                <Image source={image} style={styles.selectedImage}/>
                <TouchableOpacity style={{margin: 15}} hitSlop={{left: 300, top: 300}}  onPress={() => ImagePicker.launchImageLibrary(options, (response) => {
                    setImage({uri: 'data:image/jpeg;base64,' + response.data})
                })}>
                    <Icon name='camera' size={20} color="#099820"/>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default EditPlant
