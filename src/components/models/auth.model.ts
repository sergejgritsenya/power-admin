import { Instance, types } from "mobx-state-tree"
import { TAuthRequest } from "../auth"

export const AuthModel = types
  .model({
    login: "",
    password: "",
    is_loading: false,
  })
  .actions((self) => ({
    setLogin(login: string) {
      self.login = login.trim()
    },
    setPassword(password: string) {
      self.password = password.trim()
    },
    setLoading(is_loading: boolean) {
      self.is_loading = is_loading
    },
  }))
  .views((self) => ({
    get json(): TAuthRequest {
      return { login: self.login.trim(), password: self.password.trim() }
    },
  }))

export interface TAuthModel extends Instance<typeof AuthModel> {}
