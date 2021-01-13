import { types } from "mobx-state-tree"
import { TAccountUpdateRequest } from "../account"
import { TAdminResponse } from "../account/types/admin.response"

export const AccountModel = types
  .model({
    login: "",
    email: "",
    is_loading: false,
  })
  .actions((self) => ({
    setAdmin(admin: TAdminResponse) {
      self.login = admin.login
      self.email = admin.email
      self.is_loading = false
    },
    setLogin(login: string) {
      self.login = login.trim()
    },
    setEmail(email: string) {
      self.email = email.trim()
    },
    setLoading(is_loading: boolean) {
      self.is_loading = is_loading
    },
  }))
  .views((self) => ({
    get json(): TAccountUpdateRequest {
      return {
        login: self.login.trim(),
        email: self.email.trim(),
      }
    },
    get validation(): boolean {
      return !!self.login.trim() && !!self.email.trim()
    },
  }))
