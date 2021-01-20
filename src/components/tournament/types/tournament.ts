import { TMedia } from "./media"

export type TTournament = {
  id: string
  name: string
  logo: string | null
  description: string
  videos: TMedia[]
  images: TMedia[]
}
