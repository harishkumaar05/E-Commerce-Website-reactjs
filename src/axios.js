import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001/ecommerce-website-1470a/us-central1/api'

});

export default instance;