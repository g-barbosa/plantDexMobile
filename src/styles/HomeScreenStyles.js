import { StyleSheet, Dimensions } from 'react-native'

const width = Dimensions.get('screen').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },

    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: width * 0.9
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
        borderColor: "#DDD",
        borderWidth: 1,
        borderRadius: 8,
        height: 40,
        marginBottom: 20,
        paddingHorizontal: 15,
        width: width * 0.82
    },

    header__icon: {
        position: 'absolute',
        top: 9,
        left: "88%",
        width: 20
    },

    flatList: {
        width: width * 0.9
    },

    flatList__addIcon:{
        width: 90, 
        height: 90, 
        borderRadius: 35, 
        margin: 10, 
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
        width: width * 0.9
    },

    logout__text: {
        fontWeight: 'bold', 
        fontSize: 20, 
        color: "black"
    }
})

export default styles