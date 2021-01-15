import { Instance, types } from "mobx-state-tree"

export const ShopImageModel = types
  .model({
    id: types.string,
    url: "",
  })
  .actions((self) => ({
    setUrl(url: string) {
      self.url = url
    },
  }))

export interface IShopImageModel extends Instance<typeof ShopImageModel> {}
