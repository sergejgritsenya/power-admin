import { Instance, types } from "mobx-state-tree"

export const MediaModel = types
  .model({
    id: types.string,
    url: "",
  })
  .actions((self) => ({
    setUrl(url: string) {
      self.url = url
    },
  }))

export interface IMediaModel extends Instance<typeof MediaModel> {}
