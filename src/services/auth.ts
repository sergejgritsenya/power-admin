import { TAuthRequest, TAuthResponse, TRefreshRequest } from "../components"
import { TAdminResponse } from "../components/account/types/admin.response"
import { admin_routes, auth_routes } from "../main"
import { useAxios } from "./axios"
import { ELocalStorageKeys } from "./types"

class Auth {
  private static instance: Auth
  private axios = useAxios()

  private constructor() {}

  public static init(): Auth {
    if (!Auth.instance) {
      Auth.instance = new Auth()
    }
    return Auth.instance
  }

  private get access(): string {
    return localStorage.getItem(ELocalStorageKeys.access) || ""
  }

  private get refresh(): string {
    return localStorage.getItem(ELocalStorageKeys.refresh) || ""
  }

  public get is_loaded(): boolean {
    return !!(this.access && this.refresh)
  }

  public admin_me = async () => {
    if (!this.access) {
      await this.refreshTokens()
    }
    return await this.axios.makeRequest<TAdminResponse>({
      url: admin_routes.admin_me,
    })
  }

  public login = async (data: TAuthRequest) => {
    const tokens = await this.axios.makeRequest<TAuthResponse, TAuthRequest>({
      data,
      method: "POST",
      url: auth_routes.login,
    })
    this.setTokens(tokens)
  }

  public logout = () => {
    this.setTokens({ access_token: "", refresh_token: "" })
    window.location.reload()
  }

  private refreshTokens = async () => {
    const res = await this.axios.makeRequest<TAuthResponse, TRefreshRequest>({
      data: { refresh_token: localStorage.getItem(ELocalStorageKeys.refresh) || "" },
      method: "POST",
      url: auth_routes.refresh,
    })
    this.setTokens(res)
  }

  private setTokens = (tokens: TAuthResponse) => {
    localStorage.setItem(ELocalStorageKeys.access, tokens.access_token)
    localStorage.setItem(ELocalStorageKeys.refresh, tokens.refresh_token)
  }
}

export const useAuth = () => Auth.init()
