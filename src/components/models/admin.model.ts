import { Instance, types } from "mobx-state-tree"
import { TAdmin, TAdminCreateRequest } from "../admin"

export const AdminModel = types
  .model({
    id: types.string,
    login: "",
    email: "",
    is_loading: false,
  })
  .actions((self) => ({
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
  .actions((self) => ({
    updateAll(admin: TAdmin) {
      self.setLogin(admin.login)
      self.setEmail(admin.email)
    },
  }))

export interface IAdminModel extends Instance<typeof AdminModel> {}

export const AdminCreateModel = types
  .model({
    login: "",
    email: "",
    password: "",
    confirm_password: "",
    is_loading: false,
  })
  .actions((self) => ({
    setLogin(login: string) {
      self.login = login
    },
    setEmail(email: string) {
      self.email = email
    },
    setPassword(password: string) {
      self.password = password
    },
    setConfirmPassword(confirm_password: string) {
      self.confirm_password = confirm_password
    },
    setLoading(is_loading: boolean) {
      self.is_loading = is_loading
    },
  }))
  .views((self) => ({
    get json(): TAdminCreateRequest {
      return {
        login: self.login.trim(),
        email: self.email.trim(),
        password: self.password.trim(),
        confirm_password: self.confirm_password.trim(),
      }
    },
    get validation(): boolean {
      return (
        !!self.login.trim() &&
        !!self.email.trim() &&
        !!self.password.trim() &&
        !!self.confirm_password.trim() &&
        self.password === self.confirm_password
      )
    },
  }))
