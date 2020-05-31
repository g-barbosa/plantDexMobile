import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Alert, ToastAndroid, TouchableOpacity } from  'react-native'
import FetchService from '../services/FetchService'

const width = Dimensions.get('screen').width

import Icon from 'react-native-vector-icons/FontAwesome5'

const PlantInfo = ({navigation, route}) => {
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
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.card__plantName}>{params.name}</Text>
                <Text style={styles.card__scientificName}>{params.scientificName}</Text>

                <View style={styles.types}>
                    <Text style={styles.types__title}>Tipos</Text>
                    <View style={styles.types__types}>
                        {
                            params.types.map(type => (
                                <View key={type} style={styles.types__types__container}>
                                    <Text style={styles.types__types__container__text}>{type}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>

                <View style={styles.informations}>
                    <Text style={styles.informations__tile}>Informações</Text>
                    <View style={styles.informations__textContainer}>
                        <Text style={styles.informations__textContainer__text}>{params.informations}</Text>
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#CCFFC8",
        flex: 1,
        flexDirection: 'column',
        alignItems: "center"  
    },

    PlantImage: {
        width: 120, 
        height: 120,
        borderWidth: 1,
        borderRadius: 35, 
        margin: 10,
        position: "absolute",
        top: 2
    },

    card: {
        marginTop: 75,
        height: "90%",
        width: width * 0.9,
        backgroundColor: "#FFF",
        flex: 0.98,
        borderRadius: 12,
    },

    card__plantName: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: "center",
        top: 65,
        color: "black"
    },

    card__scientificName: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: "center",
        top: 65,
    },

    types: {
        top: 130
    },

    types__title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "black"
    },

    types__types: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },

    types__types__container: {
       top: 10,
       backgroundColor:  "#E1E1E1",
       width: "25%",
       height: 30,
       borderRadius: 20,
       alignItems: "center",
       justifyContent: "center"
    },

    types__types__container__text: {
        fontSize: 16,
        textAlign: "center"
    },

    informations: {
        top: 200,
        alignItems: "center"
    },

    informations__tile: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "black"   
    },

    informations__textContainer: {
        marginTop: 10,
        borderWidth: 0.5,
        borderRadius: 10,
        width: "80%",
        height: "40%"
    },

    informations__textContainer__text: {
        margin: 10,
        color: "black",
        fontSize: 14
    },

    footer: {
        //backgroundColor: "pink",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: width * 0.9,
        height: 50
    }

})

export default PlantInfo