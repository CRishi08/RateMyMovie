import axios from "axios"

export async function movies() {
    try {
        const url = `http://localhost:4000/movies/get`
        const response = await axios.get(url, {
            headers: {
                token: localStorage.getItem('token'),
            },
        })
        return response.data
    } catch (error) {
        console.log(`exception:`, ex)
        console.log(error)
    }

}