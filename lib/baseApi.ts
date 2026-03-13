import axios from "axios"
import { localStore } from "@/components/utils/localStore"
import { Endpoints } from "@/components/shared/Endpoints"

const ACCESS_TOKEN = "access_token"
const REFRESH_TOKEN = "refresh_token"
const { get, remove, set } = localStore

const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_baseApi_URL,
})

baseApi.interceptors.request.use(async (config) => {
  const token = get(ACCESS_TOKEN)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

baseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (error.response.status === 401 && !original._retry) {
      original._retry = true
      try {
        const refreshToken = get(REFRESH_TOKEN)
        if (!refreshToken) {
          remove(ACCESS_TOKEN)
          remove(REFRESH_TOKEN)
          window.location.href = "/auth"
          return Promise.reject(error)
        }
        if (refreshToken) {
          const response = await baseApi.post(Endpoints.REFRESH_TOKEN, {
            refreshToken,
          })
          set(ACCESS_TOKEN, response.data.accessToken)
          original.headers.Authorization = `Bearer ${response.data.accessToken}`
        }
        return await baseApi(original)
      } catch {
        remove(ACCESS_TOKEN)
        remove(REFRESH_TOKEN)
        window.location.href = "/auth"
      }
    }
    return Promise.reject(error)
  },
)

export default baseApi
export { ACCESS_TOKEN, REFRESH_TOKEN }
