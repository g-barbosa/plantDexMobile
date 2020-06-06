import { StyleSheet, Dimensions } from 'react-native'

const width = Dimensions.get('screen').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        //alignItems: "center"  
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
        flex: 0.9,
        borderRadius: 12,
    },

    card__plantName: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: "center",
        marginTop: 65,
    },

    card__scientificName: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: "center",
        marginTop: 2,
    },

    types: {
        marginTop: 35
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
       marginTop: 10,
       width: "20%",
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
        marginTop: 80,
        alignItems: "center",
        marginBottom: 65
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
        height: "45%"
    },

    informations__textContainer__text: {
        margin: 10,
        fontSize: 14
    },

    footer: {
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: width * 0.9,
        height: 45,
    }
})

export default styles