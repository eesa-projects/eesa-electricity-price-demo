import axios from 'axios'
import { md5 } from "js-md5"

// 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}
// 创建axios实例
const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_API, // api的base_url
    timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
    config => {
        config.params = filterNull(config.params)
        config.data = filterNull(config.data)
        config.headers = {
            appId: import.meta.env.VITE_APP_ID,
            timestamp: new Date().getTime(),
            nonce: Array.from({length: 10}, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('')
        }
        // 签名原始数据拼接 将appId、appSecret、nonce、timestamp按首字母进行排序，然后拼接成字符串，最后进行md5加密
        const originSign = `appId=${config.headers.appId}&appSecret=${import.meta.env.VITE_APP_SECRET}&nonce=${config.headers.nonce}&timestamp=${config.headers.timestamp}`
        config.headers.sign = md5(originSign)
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// respone拦截器
service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default service
