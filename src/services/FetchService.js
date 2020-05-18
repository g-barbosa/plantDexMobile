const uri = 'https://plantdex.herokuapp.com/'

export default class FetchSerice {
    static async login({login, password}) {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                query: `query{
                    login(data:{login:"${login}",password:"${password}"}){
                        token
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
}