import axios from "axios";

const baseUrl = 'http://192.168.68.125:8081'
const userToken = sessionStorage.getItem('userToken');
const myHttp = axios.create({
        baseURL: baseUrl,
        headers: {
            'Authorization': userToken
        }
    }
)


export default myHttp
