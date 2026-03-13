import axios from "axios"
import { localStore } from "@/components/utils/localStore";

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';
const { get, remove} = localStore;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})


api.interceptors.request.use(async (config) => {
  const token = get(ACCESS_TOKEN)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response.status === 401 && !original._retry) {
      original._retry = true;
      try {
        
      } catch (e) {
        console.log(e)
      }
    }
    return Promise.reject(error)
  },
)

api.interceptors.response.use(undefined, (error) => {
  if (error.response.status === 401) {
    window.location.href = '/auth'
  }
  return Promise.reject(error)
})

api.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + get(ACCESS_TOKEN)
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      remove(ACCESS_TOKEN)
      window.location.href = '/auth'
    }
    return Promise.reject(error)
  },
)

export default api