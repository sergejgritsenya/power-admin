import { types } from "mobx-state-tree"
import { TChangePasswordRequest } from "../account"

export const PasswordModel = types
  .model({
    old_password: "",
    new_password: "",
    confirm_password: "",
    open: false,
    is_loading: false,
  })
  .actions((self) => ({
    setOldPassword(old_password: string) {
      self.old_password = old_password.trim()
    },
    setNewPassword(new_password: string) {
      self.new_password = new_password.trim()
    },
    setConfirmPassword(confirm_password: string) {
      self.confirm_password = confirm_password.trim()
    },
    setOpen(open: boolean) {
      self.open = open
    },
    setLoading(is_loading: boolean) {
      self.is_loading = is_loading
    },
    clean() {
      self.old_password = ""
      self.new_password = ""
      self.confirm_password = ""
      self.open = false
    },
  }))
  .views((self) => ({
    get json(): TChangePasswordRequest {
      return {
        old_password: self.old_password.trim(),
        new_password: self.new_password.trim(),
        confirm_password: self.confirm_password.trim(),
      }
    },
    get validation(): boolean {
      return (
        !!self.old_password.trim() &&
        !!self.new_password.trim() &&
        !!self.confirm_password.trim() &&
        self.new_password === self.confirm_password
      )
    },
  }))
