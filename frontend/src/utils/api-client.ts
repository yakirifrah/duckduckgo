import axios, {AxiosInstance} from 'axios'
const BASE_URL = import.meta.env.VITE_APP_API_URL
let api: AxiosInstance

function init({baseURL = BASE_URL, axiosOptions = {headers: {}}} = {}) {
  api = axios.create({
    baseURL,
    ...axiosOptions,
    headers: {
      ...axiosOptions.headers,
    },
  })
}

export {init, api}
