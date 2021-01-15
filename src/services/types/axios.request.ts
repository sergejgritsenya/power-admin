import { Method } from "axios"

export type TAxiosRequest<T = undefined> = {
  data?: T
  headers?: { [key: string]: string }
  method?: Method
  url: string
}
