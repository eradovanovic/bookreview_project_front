import axios from "axios";
import {config} from "./common";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    validateStatus: () => true,
})

_addResponseInterceptors()

function _addResponseInterceptors() {
    axiosInstance.interceptors.response.use(
        handleResponse
    )

    function handleResponse(res) {

        const { data, status } = res
        if (status >= 200 && status < 300) {
            if (!data?.data) {
                return data
            }
            const resp = data.data
            return resp
        // } else if (status === 422) {
        //     return Promise.reject('Error 422')
        // } else if (status === 400) {
        //         return Promise.reject(data.message)
        // } else if (status === 401) {
        //     // if (res.config?.url !== config.api.logout) {
        //     //     store.dispatch(actions.auth.logout())
        //     // }
        //     return Promise.reject(data.message)
        // } else if (status === 403) {
        //     return Promise.reject(new Error('Request not authorized. - error 403'))
        // } else if (status === 404) {
        //     return Promise.reject(data.message)
        // } else if (status === 409) {
        //     return Promise.reject(data.message)
        } else {
            return Promise.reject(data.message)
        }
    }

}


export default axiosInstance
