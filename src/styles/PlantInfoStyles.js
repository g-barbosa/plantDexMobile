import { StyleSheet, Dimensions } from 'react-native'

const width = Dimensions.get('screen').width

const styles = StyleSheet.create({
    container: {
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
        flex: 0.98,
        borderRadius: 12,
    },

    card__plantName: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: "center",
        top: 65,
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
    },

    types__types: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },

    types__types__container: {
       top: 10,
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
        fontSize: 14
    },

    footer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: width * 0.9,
        height: 50
    }
})

export default styles