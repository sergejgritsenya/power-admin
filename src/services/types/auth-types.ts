export enum EAuthKey {
  admin = "power-auth-token-admin",
}
export enum ELocalStorageKeys {
  access = "admin_power_access",
  refresh = "admin_power_refresh",
}

export type TAuth = {
  access_token: string
  refresh_token: string
}
