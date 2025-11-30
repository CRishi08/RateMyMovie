import axios from "axios"

export async function addReview(movie_id, rating, review, user_id) {
    try {
        const url = "http://localhost:4000/review/add"
        const body = {
            movie_id, rating, review, user_id
        }
        const response = await axios.post(url, body, {
            headers: {
                token: localStorage.getItem('token')
            },
        })
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}

export async function reviews() {
    try {
        // create url

        const url = `http://localhost:4000/review/get`
        console.log("token", localStorage.getItem('token'),)
        // create headers with require token
        // send GET request and get the response
        const response = await axios.get(url, {
            headers: {
                token: localStorage.getItem('token'),
            },
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function reviewDelete(review_id) {
    try {
        const url = `http://localhost:4000/review/delete/`
        const response = await axios.delete(url, {
            headers: {
                review_id: review_id,
                token: localStorage.getItem('token'),
            },
        })
        console.log()
        return response.data

    } catch (error) {
        console.log(error)
    }
}
export async function UpdateReview(rating, review, review_id) {
    try {
        const body = { rating, review, review_id }
        const url = `http://localhost:4000/review/edit`
        const response = await axios.put(url, body, {
            headers: {
                token: localStorage.getItem('token'),
                review_id: review_id,
            },
        })
        return response.data

    }
    catch (error) {
        console.log(error)
    }
}
export async function MyReview() {
    try {
        const user_id = localStorage.getItem('user_id')
        const url = `http://localhost:4000/review/byme`
        console.log("user_id", user_id)
        const response = await axios.get(url, {
            headers: {
                token: localStorage.getItem('token'),
                user_id: user_id,
            },
        })
        console.log(response)
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}
export async function myReviewDelete(review_id) {
    try {
        const url = `http://localhost:4000/review/bymedelete`
        const response = await axios.delete(url, {
            headers: {
                token: localStorage.getItem('token'),
                review_id: review_id,
            },
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}