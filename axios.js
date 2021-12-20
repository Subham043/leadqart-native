import axios from 'axios';



const instance = axios.create({
    // baseURL: "http://127.0.0.1:8080/",
    // baseURL: "https://leadqart.herokuapp.com/",
    baseURL: "http://156.67.217.238/",
    // baseURL: "https://enthousiaste-saucisson-12296.herokuapp.com/",
    headers: {
        post: {
            "Accept": 'application/json',
            "Content-Type": "application/json",
        },
        get: {
            "Accept": 'application/json',
            "Content-Type": "application/json",
        },
    },
    withCredentials: true,
})

export default instance;