import { types } from "mobx-state-tree"
import { TTournamentVideoCreateRequest } from "../tournament"

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
