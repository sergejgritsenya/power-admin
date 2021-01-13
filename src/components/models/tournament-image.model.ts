import { Instance, types } from "mobx-state-tree"

export const TournamentImageModel = types
  .model({
    id: types.string,
    url: "",
  })
  .actions((self) => ({
    setUrl(url: string) {
      self.url = url
    },
  }))

export interface ITournamentImageModel extends Instance<typeof TournamentImageModel> {}
