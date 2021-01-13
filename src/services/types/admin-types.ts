export type TAdminList = {
  id: string
  login: string
  email: string
  is_super: boolean
}
export type TAdminCreateProps = {
  login: string
  email: string
  password: string
  confirm_password: string
}
