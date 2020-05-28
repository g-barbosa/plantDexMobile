import AsyncStorage from '@react-native-community/async-storage';

const uri = 'https://plantdex.herokuapp.com/'

export default class FetchSerice {
    static async login({login, password}) {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                query: `query{
                    login(data:{login:"${login}",password:"${password}"}){
                        token,
                        id
                    }
                }`
            }),
            headers: new Headers({
                "Content-type": "application/json",
                "Accept": "application/json"
            })
        }
        const data = await fetch(uri, requestInfo)
        const response = data.json()
        return response
    }

    static async AddPlant(plantInfo, types) {
        const token = await AsyncStorage.getItem('@token')

        const {name, scientificName, informations, image, user_id} = plantInfo
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                query: `mutation{
                    registerPlant(data: {
                        name: "${name}", 
                        scientificName: "${scientificName}", 
                        informations: "${informations}", 
                        image: "${image}",
                        user_id: ${user_id}
                    }, types: [${types}])
                }` 
            }),
            headers: new Headers({
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization": token
            })
        }
        const data = await fetch(uri, requestInfo)
        const response = data.json()
        return response
    }

    static async getPlants() {
        const token = await AsyncStorage.getItem('@token')

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                query: `query{
                    plants{id, name, scientificName, informations, image, user_id, types}
                }` 
            }),
            headers: new Headers({
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization": token
            })
        }
        const data = await fetch(uri, requestInfo)
        const response = data.json()
        return response
    }

    static async register({login, password}) {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                query: `mutation{
                    registerUser(data:{login:"${login}",password:"${password}"}){
                        login
                    }
                }`
            }),
            headers: new Headers({
                "Content-type": "application/json",
                "Accept": "application/json",
            })
        }
        const data = await fetch(uri, requestInfo)
        const response = data.json()
        return response
    }

    static async updatePlant(plant_id, plantInfo, types) {
        const token = await AsyncStorage.getItem('@token')
        const {name, scientificName, informations, image, user_id } = plantInfo
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                query: `mutation{
                    updatePlant(id: ${plant_id}, data: {
                        name: "${name}", 
                        scientificName: "${scientificName}", 
                        informations: "${informations}", 
                        image: "${image}",
                        user_id: ${parseInt(user_id)}
                    }, types: [${types}])
                }` 
            }),
            headers: new Headers({
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization": token
            })
        }
        const data = await fetch(uri, requestInfo)
        const response = data.json()
        return response
    }

    static async deletePlant(id) {
        const token = await AsyncStorage.getItem('@token')

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                query: `mutation{
                    deletePlant(id: ${id})
                }` 
            }),
            headers: new Headers({
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization": token
            })
        }
        const data = await fetch(uri, requestInfo)
        const response = data.json()
        return response      
    }
}