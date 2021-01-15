import { Instance, types } from "mobx-state-tree"
import { TNewsAdmin, TNewsCreateRequest, TNewsTournament, TNewsUpdateProps } from "../news"

export const NewsCreateModel = types
  .model({
    title: "",
    text: "",
    is_loading: false,
  })
  .actions((self) => ({
    setTitle(title: string) {
      self.title = title
    },
    setText(text: string) {
      self.text = text
    },
    setLoading(is_loading: boolean) {
      self.is_loading = is_loading
    },
  }))
  .views((self) => ({
    get json(): TNewsCreateRequest {
      return {
        title: self.title.trim(),
        text: self.text.trim(),
      }
    },
    get validation(): boolean {
      return !!self.title.trim() && !!self.text.trim()
    },
  }))

const NewsTournamentModel = types.model({
  id: "",
  name: "",
})

export const NewsModel = types
  .model({
    id: "",
    title: "",
    publish: false,
    logo: "",
    text: "",
    tournament_id: "",
    is_loading: false,
    tournaments: types.array(NewsTournamentModel),
  })
  .actions((self) => ({
    setTitle(title: string) {
      self.title = title
    },

    setPublish(publish: boolean) {
      self.publish = publish
    },

    setLogo(logo: string) {
      self.logo = logo
    },

    setText(text: string) {
      self.text = text
    },

    setTournament(tournament_id: string) {
      self.tournament_id = tournament_id
    },

    setTournaments(tournaments: TNewsTournament[]) {
      self.tournaments.replace(tournaments)
    },

    setLoading(is_loading: boolean) {
      self.is_loading = is_loading
    },
  }))
  .actions((self) => ({
    updateAll(data: TNewsAdmin) {
      self.setTitle(data.news.title)
      self.setText(data.news.text)
      self.setTournaments(data.tournaments)
    },
  }))
  .views((self) => ({
    get json(): TNewsUpdateProps {
      return {
        title: self.title.trim(),
        publish: self.publish,
        text: self.text.trim(),
        tournament_id: self.tournament_id ? self.tournament_id : undefined,
      }
    },

    get validation(): boolean {
      return !!self.title.trim() && !!self.text.trim()
    },
  }))

export interface INewsModel extends Instance<typeof NewsModel> {}
