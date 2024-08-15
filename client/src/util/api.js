import axios from "axios";

const loginAPI = async (email, password) => {
    const API_URL = "/api/login";
    const data = {
        email,
        password
    }
    return await axios.post(API_URL, data);
}

const registerAPI = async (name, email, password) => {
    const API_URL = "/api/register";
    const data = {
        name,
        email,
        password
    }
    return await axios.post(API_URL, data);
}

export {
    loginAPI,
    registerAPI
}