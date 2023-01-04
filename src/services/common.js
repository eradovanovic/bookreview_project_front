import axios from './axios.instance'

export const config = {}
export const setAccessToken = token => {
  config.accessToken = token
  axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : null
}
