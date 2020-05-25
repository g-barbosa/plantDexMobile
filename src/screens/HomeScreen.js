import React, {useState, useEffect} from 'react'
import { 
    View, 
    StyleSheet, 
    ImageBackground, 
    Text, 
    Image, 
    TextInput, 
    Dimensions, 
    FlatList, 
    TouchableOpacity, 
    RefreshControl } from  'react-native'

import backImage from '../../assets/logo-background.png'
import searchIcon from '../../assets/search-icon.png'
import addIcon from '../../assets/add-icon.png'
import AsyncStorage from '@react-native-community/async-storage'

import FetchService from '../services/FetchService'

const width = Dimensions.get('screen').width

const HomeScreen = ({navigation}) => {
    const [plants, SetPlants] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const getData = async() => {
        await FetchService.getPlants()
        .then(response => {
            SetPlants(response.data.plants)
        })
        setRefreshing(false)     
    }

    useEffect(() => {
        getData()
    }, [])

    const push = () =>{
        setRefreshing(true)
        getData()
    }

    const logout = async () => {
        AsyncStorage.removeItem('@token')
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={backImage} style={styles.backimage}>
                <View style={styles.header}>
                    <TextInput style={styles.header__input}
                        placeholderTextColor="#656363"
                        placeholder='Pesquisar planta'/>

                    <Image style={styles.header__icon} source={searchIcon}/>
                </View>

                <FlatList 
                    style={styles.flatList}
                    data={[...plants, { plusImage: true }]}
                    keyExtractor={item => item.id}
                    horizontal={false}
                    numColumns={3}
                    renderItem={( { item } ) => {
                        if (item.plusImage){
                            return (
                                <TouchableOpacity style={styles.flatList__addIcon} onPress={() => navigation.navigate("AddPlant")}>
                                    <Image style={{width:40, height: 40}} source={addIcon}/>
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
                <TouchableOpacity style={styles.logout} onPress={logout}>
                    <Text style={styles.logout__text}>Sair</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#CCFFC8",
        flex: 1,
        flexDirection: 'column'
    },

    backimage:{
        flex: 1,
        justifyContent: 'space-between',
        resizeMode: 'cover',
        alignItems: "center",
        display: "flex",
        padding: 25,
        paddingTop: 20
    },

    header__input: {
        backgroundColor: "#F7F7F7",
        borderColor: "#DDD",
        borderWidth: 1,
        borderRadius: 8,
        height: 40,
        marginBottom: 20,
        paddingHorizontal: 15,
        width: width * 0.9
    },

    header__icon: {
        position: 'absolute',
        top: 12,
        left: "95%"
    },

    flatList: {
        width: width * 0.9
    },

    flatList__addIcon:{
        width: 90, 
        height: 90, 
        borderRadius: 35, 
        margin: 10, 
        backgroundColor: "#FFFFFF", 
        alignItems: 'center', 
        justifyContent: "center"
    },

    flatList__image: {
        display: "flex", 
        justifyContent: 'space-between' 
    },

    logout: {
        display: "flex", 
        alignItems: "flex-end", 
        width: width * 0.95
    },

    logout__text: {
        fontWeight: 'bold', 
        fontSize: 20, 
        color: "#95fe9d"
    }
})

export default HomeScreen