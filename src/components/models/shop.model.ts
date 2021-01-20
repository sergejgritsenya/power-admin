import { Instance, types } from "mobx-state-tree"
import { TShop, TShopImage, TShopUpdateProps } from "../shop"
import { MediaModel } from "./media.model"

export const ShopModel = types
  .model({
    id: types.string,
    description: "",
    is_loading: false,
    logo: "",
    name: "",
    price: "",
    tab: 0,
    images: types.array(MediaModel),
  })
  .actions((self) => ({
    setDescription(description: string) {
      self.description = description
    },
    setLoading(is_loading: boolean) {
      self.is_loading = is_loading
    },
    setLogo(logo: string) {
      self.logo = logo
    },
    setName(name: string) {
      self.name = name
    },
    setPrice(price: string) {
      self.price = price
    },
    setTab(tab: number) {
      self.tab = tab
    },
    addImage(image: TShopImage) {
      self.images.push(MediaModel.create(image))
    },
    deleteImage(image_id: string) {
      self.images.replace(self.images.filter((img) => img.id !== image_id))
    },
    setImages(images: TShopImage[]) {
      const image_models = images.map((image) => MediaModel.create(image))
      self.images.replace(image_models)
    },
  }))
  .actions((self) => ({
    updateAll(data: TShop) {
      self.setDescription(data.description)
      self.setLogo(data.logo || "")
      self.setName(data.name)
      self.setPrice(data.price)
      self.setImages(data.images)
    },
  }))
  .views((self) => ({
    get json(): TShopUpdateProps {
      return {
        description: self.description.trim(),
        name: self.name.trim(),
        price: self.price.trim(),
      }
    },
    get validation(): boolean {
      return !!self.name.trim() && !!self.price.trim() && !!self.description.trim()
    },
  }))

export interface IShopModel extends Instance<typeof ShopModel> {}

export const ShopCreateModel = types
  .model({
    description: "",
    is_loading: false,
    name: "",
    price: "",
  })
  .actions((self) => ({
    setDescription(description: string) {
      self.description = description
    },
    setLoading(is_loading: boolean) {
      self.is_loading = is_loading
    },
    setName(name: string) {
      self.name = name
    },
    setPrice(price: string) {
      self.price = price
    },
  }))
  .views((self) => ({
    get json(): TShopUpdateProps {
      return {
        description: self.description.trim(),
        name: self.name.trim(),
        price: self.price.trim(),
      }
    },
    get validation(): boolean {
      return !!self.name.trim() && !!self.description.trim()
    },
  }))
