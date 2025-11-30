import axios from 'axios'
export async function register(first_name, last_name, email, password, birthday, mobile) {
    try {
        const url = 'http://localhost:4000/user/register'
        const body = {
            first_name, last_name, email, password, birthday, mobile
        }
        const response = await axios.post(url, body)
        console.log(response)
        console.log(response)
        return response.data
    }
    catch (ex) {
        console.log(`exception:`, ex)
    }
}


export async function login(email, password) {
    try {
        const url = 'http://localhost:4000/user/login'
        const body = {
            email, password
        }
        const response = await axios.post(url, body)
        console.log(response.data)
        return response.data
    }
    catch (ex) {
        console.log(`exception:`, ex)
    }
}


export async function EditUser(first_name, last_name, email, birthday, mobile) {
    try {
        const body = { first_name, last_name, email, birthday, mobile }
        const url = `http://localhost:4000/user/edit`
        const response = await axios.put(url, body, {
            headers: {
                token: localStorage.getItem('token'),
                user_id: localStorage.getItem('user_id'),
            },
        })
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}


export async function ChangePasswords(currentPassword, newPassword) {
    try {
        const user_id = localStorage.getItem('user_id')
        const url = `http://localhost:4000/user/password`
        const body = { currentPassword, newPassword }
        const response = axios.put(url, body, {
            headers: {
                token: localStorage.getItem('token'),
                user_id: user_id
            },
        })
        return response.data
    }
    catch (error) {
        console.log(error)
    }

}