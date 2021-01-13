import { Instance, types } from "mobx-state-tree"
import { TTournamentVideoCreateRequest } from "../tournament"

export const TournamentVideoModel = types
  .model({
    id: types.string,
    url: "",
  })
  .actions((self) => ({
    setUrl(url: string) {
      self.url = url
    },
  }))
  .views((self) => ({
    get json(): TTournamentVideoCreateRequest {
      return { url: self.url.trim() }
    },
  }))

export interface ITournamentVideoModel extends Instance<typeof TournamentVideoModel> {}

export const TournamentVideoCreateModel = types
  .model({
    url: "",
  })
  .actions((self) => ({
    setUrl(url: string) {
      self.url = url
    },
    discard() {
      self.url = ""
    },
  }))
  .views((self) => ({
    get json(): TTournamentVideoCreateRequest {
      return { url: self.url.trim() }
    },
  }))
