import { StyleSheet, Dimensions } from 'react-native'

const width = Dimensions.get('screen').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    PlantImage: {
        width: 120, 
        height: 120, 
        borderRadius: 35, 
        margin: 10,
        position: "absolute",
        top: 2,
        borderWidth: 1,
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },

    selectedImage: {
        width: 120, 
        height: 120, 
        borderRadius: 35, 
        position: "absolute",
        borderWidth: 1,
        alignItems: "flex-end",
        justifyContent: "flex-end"  
    },

    card: {
        marginTop: 75,
        paddingTop: 80,
        height: "90%",
        width: width * 0.9,
        flex: 0.82,
        borderRadius: 12,
        alignItems: "center",
    },

    card__input: {
        marginTop: 2,
        marginBottom: 25,
        borderColor: "#DDD",
        borderWidth: 1,
        borderRadius: 8,
        height: 48,
        paddingHorizontal: 15,
        width: "90%",
    },

    card__down: {
        position: "absolute",
        top: 242,
        left: "80%",
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },

    card__button: {
        alignItems: "center",
        backgroundColor: "#2B983C",
        borderRadius: 8,
        justifyContent: "center",
        height: 60,
        marginTop: 20,
        marginBottom: 10,
        width: "90%"
    },

    card__button__text: {
        color: "white", 
        fontWeight: "bold", 
        fontSize: 18
    },

    warning: {
        width: "90%",
        alignItems: "flex-end",
    },

    warning__items: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    warning__text: {
        lineHeight: 15
    },
})

export default styles