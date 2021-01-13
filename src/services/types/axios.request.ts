import { Method } from "axios"

export type TAxiosRequest<T = undefined> = {
  data?: T
  method?: Method
  url: string
}
