import axios from "./axios.custom";

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
/////////////
const getAllUsersAPI = async () => {
    const API_URL = "/api/users";
    return await axios.get(API_URL);
}

const getUserAPI = async (id) => {
    const API_URL = `/api/users/${id}`;
    return await axios.get(API_URL);
}

const createUserAPI = async (name, email, password, role) => {
    const API_URL = `/api/users/`;
    const data = {
        name,
        email,
        password,
        role
    }
    return await axios.post(API_URL, data);
}

const updateUserAPI = async (id, name, email, password, role) => {
    const API_URL = `/api/users/${id}`;
    const data = {
        id,
        name,
        email,
        password,
        role
    }
    return await axios.put(API_URL, data);
}

const deleteUserAPI = async (id) => {
    const API_URL = `/api/users/${id}`;
    return await axios.delete(API_URL);
}

/////////////////////////

const getAllProductsAPI = async () => {
    const API_URL = "/api/products";
    return await axios.get(API_URL);
}

const getProductAPI = async (id) => {
    const API_URL = `/api/products/${id}`;
    return await axios.get(API_URL);
}

const createProductAPI = async (name, price, quantity, description) => {
    const API_URL = `/api/products/`;
    const data = {
        name,
        price,
        quantity,
        description
    }
    return await axios.post(API_URL, data);
}

const updateProductAPI = async (id, name, price, quantity, description) => {
    const API_URL = `/api/products/${id}`;
    const data = {
        id,
        name,
        price,
        quantity,
        description
    }
    return await axios.put(API_URL, data);
}

const deleteProductAPI = async (id) => {
    const API_URL = `/api/products/${id}`;
    return await axios.delete(API_URL);
}

const searchProductAPI = async (name, category, minPrice, maxPrice) => {
    const API_URL = `/api/search/products?name=${name}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    return await axios.get(API_URL);
}

export {
    loginAPI,
    registerAPI,
    getAllUsersAPI,
    getUserAPI,
    createUserAPI,
    updateUserAPI,
    deleteUserAPI,
    getAllProductsAPI,
    getProductAPI,
    createProductAPI,
    updateProductAPI,
    deleteProductAPI,
    searchProductAPI
}