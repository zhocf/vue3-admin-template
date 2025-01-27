import axios, {AxiosError, AxiosResponse} from "axios"
import {ElLoading, ElMessage} from "element-plus";

const baseURl = import.meta.env.VITE_BASE_URL as string

export const service = axios.create({
    baseURL: baseURl,
    timeout: 10000
})
let loading: any
//请求拦截器
service.interceptors.request.use((config: any) => {
    // const userStore = useUserStore()
    //当数据为formData，自动修改请求头
    if ((config.data instanceof FormData)) {
        config.headers["Content-Type"] = "multipart/form-data"
    }
    // if (userStore.token && config.headers) {
    //     config.headers.Authorization = `Bearer ${userStore.token}`
    // }
    if (config.method == 'post') {
        loading = ElLoading.service({
            text: 'loading...'
        })
    }
    return config
}, (error: AxiosError) => {

    return Promise.reject(error)
})

//响应拦截器
service.interceptors.response.use((config: AxiosResponse) => {
    const res = config.data
    if (loading) {
        loading.close()
    }
    if (res.code === 1) {
        return res.data
        //重新登录
    } else if (res.code === 401) {
        ElMessage({
            message: res.message,
            type: 'warning',
        })
        showError()
    } else {
        ElMessage({
            message: res.message,
            type: 'warning',
        })
        return Promise.reject(res)
    }
}, (error) => {
    if (loading) {
        loading.close()
    }
    console.log(error)
    if (error.code === 'ECONNABORTED') {
        ElMessage.warning("网速较慢，请耐心等待")
        error.config.timeout = 1000 * 60 * 3
        return service(error.config)
    } else if (error.message === 'Network Error') {
        ElMessage.error("网络中断")
        return Promise.reject()
    } else if (error.response.status === 404) {
        ElMessage.error("接口404")
        return Promise.reject()
    } else {
        ElMessage.error("网络异常")
        return Promise.reject()
    }
})

//处理错误
function showError() {
    // const userStore = useUserStore()
    // setTimeout(() => {
    //     userStore.loginOut()
    // }, 2000)
}

function requestPost(url: string, data = {}) {
    return service.post(url, data)
}

function requestGet(url: string, params: any = {}) {
    return service.get(url, params)
}

function requestDelete(url: string, data = {}) {
    return service.delete(url, {data: data})
}

let request = {
    get: requestGet,
    post: requestPost,
    delete: requestDelete
}
export default request
