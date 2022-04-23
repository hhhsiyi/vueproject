import axios from "axios";

const baseUrl = 'http://192.168.68.125:8081'

const myHttp = axios.create(
    {
        baseUrl: baseUrl,
        timeout: 5000
    }
)

export function request(config) {
    return new Promise((resolve, reject) => {
        const axiosInstance = axios.create({
            baseURL: baseUrl,
            timeout: 5000
        });

        return axiosInstance(config)
    })
}

export function requestPost(config, data) {
    const axiosInstance = axios.create({
        baseURL: baseUrl,
        timeout: 5000
    })
    return axiosInstance.post(config, data).then(res => {
        // console.log(res);
        config.success(res);
    }).catch(err => {
        // console.log(err);
        config.failure(err);
    })
}

// return new Promise((resolve, reject) => {
//     const axiosInstance = axios.create({
//         baseURL: baseUrl,
//         timeout: 5000
//     })
//     return axiosInstance(config).post(data);
// })


// export const myHttp
// export default myHttp

export function requestPost2(url, params) {
    return new Promise((resolve, reject) => {
        axios.defaults.baseURL = baseUrl
        axios({
            url: url,
            method: 'post',
            data: params,
            // transformRequest: [function(data) {
            //     let ret = ''
            //     for(let it in data) {
            //         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            //     }
            //     return ret
            // }],
            // headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded'
            // }
        }).then(res => {
                resolve(res.data);
            })
    });
}