import { Instance, types } from "mobx-state-tree"
import { TShop, TShopImage, TShopUpdateProps } from "../shop"
import { ShopImageModel } from "./shop-image.model"

export const ShopModel = types
  .model({
    id: types.string,
    name: "",
    price: "",
    logo: "",
    description: "",
    is_loading: false,
    images: types.array(ShopImageModel),
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name
    },
    setPrice(price: string) {
      self.price = price
    },
    setLogo(logo: string) {
      self.logo = logo
    },
    setDescription(description: string) {
      self.description = description
    },

    setLoading(is_loading: boolean) {
      self.is_loading = is_loading
    },
    setImages(images: TShopImage[]) {
      const image_models = images.map((image) => ShopImageModel.create(image))
      self.images.replace(image_models)
    },
  }))
  .actions((self) => ({
    updateAll(data: TShop) {
      self.setName(data.name)
      self.setPrice(data.price)
      self.setLogo(data.logo || "")
      self.setDescription(data.description)
      self.setImages(data.images)
    },
  }))
  .views((self) => ({
    get json(): TShopUpdateProps {
      return {
        name: self.name.trim(),
        price: self.price.trim(),
        description: self.description.trim(),
      }
    },
    get validation(): boolean {
      return !!self.name.trim() && !!self.price.trim() && !!self.description.trim()
    },
  }))

export interface IShopModel extends Instance<typeof ShopModel> {}

export const ShopCreateModel = types
  .model({
    name: "",
    price: "",
    description: "",
    is_loading: false,
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name
    },
    setPrice(price: string) {
      self.price = price
    },
    setDescription(description: string) {
      self.description = description
    },
    setLoading(is_loading: boolean) {
      self.is_loading = is_loading
    },
  }))
  .views((self) => ({
    get json(): TShopUpdateProps {
      return {
        name: self.name.trim(),
        price: self.price.trim(),
        description: self.description.trim(),
      }
    },
    get validation(): boolean {
      return !!self.name.trim() && !!self.description.trim()
    },
  }))
