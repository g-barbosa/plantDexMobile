import React, {useState} from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TextInput, Dimensions, FlatList, TouchableOpacity } from  'react-native'

import backImage from '../../assets/logo-background.png'
import searchIcon from '../../assets/search-icon.png'
import addIcon from '../../assets/add-icon.png'

const width = Dimensions.get('screen').width

const HomeScreen = ({navigation}) => {
    const [plants, SetPlants] = useState([
        {
            id: 1,
            user_id: 1,
            name: "Chifre-de-viado",
            scientificName: "Platycerium bifurcatum",
            informations: "Platycerium bifurcatum, a samambaia elkhorn ou samambaia comum, é uma espécie de samambaia nativa de Java, Nova Guiné e sudeste da Austrália.",
            image: "http://res.cloudinary.com/dkafjz7rw/image/upload/qgfo9nrbtyiqj8wigeqf.jpg",
            types: ['Cacto', 'Flor']
        },
        {
            id: 2,
            user_id: 1,
            name: "Cacto",
            scientificName: "Cactaceae",
            informations: "Cactaceae é uma família botânica de arbustos, árvores, ervas, lianas e subarbustos representada pelos cactos ou catos.",
            image: "https://res.cloudinary.com/dkafjz7rw/image/upload/v1586650369/vewzmxqs2wzsfg1te3od.jpg",
            types: ['Cacto', 'Flor']
        },
        {
            id: 3,
            user_id: 1,
            name: "Chifre-de-viado",
            scientificName: "Platycerium bifurcatum",
            informations: "Platycerium bifurcatum, a samambaia elkhorn ou samambaia comum, é uma espécie de samambaia nativa de Java, Nova Guiné e sudeste da Austrália.",
            image: "http://res.cloudinary.com/dkafjz7rw/image/upload/qgfo9nrbtyiqj8wigeqf.jpg",
            types: ['Cacto', 'Flor']
        },
        {
            id: 4,
            user_id: 1,
            name: "Cacto",
            scientificName: "Cactaceae",
            informations: "Cactaceae é uma família botânica de arbustos, árvores, ervas, lianas e subarbustos representada pelos cactos ou catos.",
            image: "https://res.cloudinary.com/dkafjz7rw/image/upload/v1586650369/vewzmxqs2wzsfg1te3od.jpg",
            types: ['Cacto', 'Flor']
        }
    ])

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
                />
                <TouchableOpacity style={styles.logout} onPress={() => navigation.navigate("Login")}>
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