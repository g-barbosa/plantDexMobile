import React, {useState, useEffect, useContext} from 'react'
import { 
    View, ImageBackground, 
    Image, TextInput, Dimensions, 
    FlatList, TouchableOpacity, RefreshControl } from  'react-native'

import AppTheme from '../components/Theme'
import ThemeContext from '../../context/ThemeContext'
import FetchService from '../services/FetchService'
import Icon from 'react-native-vector-icons/FontAwesome'
import backImage from '../../assets/logo-background.png'
import styles from '../styles/HomeScreenStyles'

const HomeScreen = ({navigation}) => {
    const theme = useContext(ThemeContext)[0]

    const [plants, SetPlants] = useState([])
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const getData = async() => {
        await FetchService.getPlants()
        .then(response => {
            SetPlants(response.data.plants)
            setData(response.data.plants)
        })
        setRefreshing(false)     
    }

    useEffect(() => {
        navigation.addListener('focus', () => getData())
    }, [navigation])

    const filter = (name) => {
        name = name.toLowerCase()
        let fullList = plants
        let filtered = fullList.filter((plant) => {
            if (plant.name.toLowerCase().match(name))
                return plant
        })
        if (!name || name === '') {
            setData(fullList)
        } else if (!filtered.length) {
            setData([])
        } else if (Array.isArray(filtered)) {
            setData(filtered)
        }
    }

    const push = () =>{
        setRefreshing(true)
        getData()
    }

    return (
        <View style={[styles.container, {backgroundColor: AppTheme[theme].homeBackground}]}>
            <ImageBackground source={backImage} style={styles.backimage}>
                <View style={styles.header}>

                    <TouchableOpacity style={{marginBottom: 20 }} onPress={() => navigation.openDrawer()}>
                        <Icon name='bars' size={25} color="#099820"/>
                    </TouchableOpacity>

                    <View >
                        <TextInput style={[styles.header__input, {backgroundColor: AppTheme[theme].overlays}]}
                            placeholderTextColor={AppTheme[theme].placeholderText}
                            onChangeText={(txt) => filter(txt)}
                            placeholder='Pesquisar planta'/>

                        <Icon name='search' style={styles.header__icon} size={20} color="#099820"/>
                    </View>
                </View>

                <FlatList 
                    style={styles.flatList}
                    data={[...data, { plusImage: true }]}
                    keyExtractor={item => item.id}
                    horizontal={false}
                    numColumns={3}
                    renderItem={( { item } ) => {
                        if (item.plusImage){
                            return (
                                <TouchableOpacity 
                                    style={[styles.flatList__addIcon, {backgroundColor: AppTheme[theme].overlays}]} 
                                    onPress={() => navigation.navigate("AddPlant")}>
                                        <Icon name='plus' size={40} color="#099820"/>
                                </TouchableOpacity> 
                            )
                        }
                        return (
                            <TouchableOpacity style={styles.flatList__image} 
                            onPress={() => navigation.navigate("PlantInfo", {
                                id: item.id,
                                name: item.name,
                                scientificName: item.scientificName,
                                informations: item.informations,
                                image: item.image,
                                types: item.types
                            })}>

                                <Image style={{width: 90, height: 90, borderRadius: 35, margin: 10}} source={{uri: item.image}}/>

                            </TouchableOpacity>
                        )
                    }}
                    refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={push}/> }
                />
            </ImageBackground>
        </View>
    )
}

export default HomeScreen
