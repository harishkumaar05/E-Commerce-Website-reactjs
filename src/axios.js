import axios from "axios";

const instance = axios.create({
    baseURL:'https://us-central1-ecommerce-website-1470a.cloudfunctions.net/api'
    //'http://localhost:5001/ecommerce-website-1470a/us-central1/api'
});

export default instance;

