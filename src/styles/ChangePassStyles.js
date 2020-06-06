import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        alignItems: "center",
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
        padding: 25,
        paddingTop: 20
    },

    main: {
        marginTop: 150,
        marginBottom: 135,
        width: "100%"
    },

    main__input: {
        backgroundColor: "#F7F7F7",
        borderColor: "#DDD",
        borderWidth: 1,
        borderRadius: 8,
        height: 55,
        marginBottom: 20,
        paddingHorizontal: 15,
        width: "100%"
    },

    main__eye: {
        position: "absolute",
        top: 18,
        left: "86%"
    },

    main__button: {
        alignItems: "center",
        backgroundColor: "#099820",
        borderRadius: 8,
        justifyContent: "center",
        height: 55,
        marginTop: 60,
        width: "100%"
    },

    main__button__text: {
        color: "white", 
        fontWeight: "bold", 
        fontSize: 18
    },

    errorMessage: {
        color: "red",
        textAlign: "center"
    }
})

export default styles