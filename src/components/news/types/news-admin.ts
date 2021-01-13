import { TNews } from "./news"
import { TNewsTournament } from "./news-tournament"

export type TNewsAdmin = {
  news: TNews
  tournaments: TNewsTournament[]
}
