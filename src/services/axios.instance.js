import axios from "axios";

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
        } else {
            return Promise.reject(data.message)
        }
    }

}


export default axiosInstance
