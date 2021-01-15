import axios, { AxiosInstance } from "axios"
import { EAuthKey, ELocalStorageKeys, TAxiosRequest } from "./types"

export class AxiosService {
  private axios: AxiosInstance
  private static instance: AxiosService
  private baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3088"
  private constructor() {
    this.axios = axios.create({ baseURL: this.baseUrl })
  }
  public static init(): AxiosService {
    if (!AxiosService.instance) {
      AxiosService.instance = new AxiosService()
    }
    return AxiosService.instance
  }

  public makeRequest = async <T, K = undefined>(props: TAxiosRequest<K>): Promise<T> => {
    const { data, method, url } = props
    const headers = {
      ...(props.headers || {}),
      [EAuthKey.admin]: localStorage.getItem(ELocalStorageKeys.access) || "",
    }
    const res = await this.axios(url, { data, headers, method })
    return res.data
  }
}

export const useAxios = () => AxiosService.init()
