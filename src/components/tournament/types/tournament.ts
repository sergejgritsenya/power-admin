import { TTournamentImage } from "./tournament-image"
import { TTournamentVideo } from "./tournament-video"

export type TTournament = {
  id: string
  name: string
  logo: string | null
  description: string
  videos: TTournamentVideo[]
  images: TTournamentImage[]
}
