import { Instance, types } from "mobx-state-tree"
import { TMedia, TTournament, TTournamentUpdateRequest } from "../tournament"
import { MediaModel } from "./media.model"

export const TournamentModel = types
  .model({
    id: types.string,
    description: "",
    is_loading: false,
    logo: "",
    name: "",
    tab: 0,
    images: types.optional(types.array(MediaModel), []),
    videos: types.optional(types.array(MediaModel), []),
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
    setTab(tab: number) {
      self.tab = tab
    },
    addImage(image: TMedia) {
      self.images.push(MediaModel.create(image))
    },
    deleteImage(image_id: string) {
      self.images.replace(self.images.filter((img) => img.id !== image_id))
    },
    setImages(images: TMedia[]) {
      const image_models = images.map((image) => MediaModel.create(image))
      self.images.replace(image_models)
    },
    addVideo(video: TMedia) {
      self.videos.push(MediaModel.create(video))
    },
    deleteVideo(video_id: string) {
      self.videos.replace(self.videos.filter((video) => video.id !== video_id))
    },
    setVideos(videos: TMedia[]) {
      const video_models = videos.map((video) => MediaModel.create(video))
      self.videos.replace(video_models)
    },
  }))
  .actions((self) => ({
    updateAll(data: TTournament) {
      self.setDescription(data.description)
      self.setLogo(data.logo || "")
      self.setName(data.name)
      self.setImages(data.images)
      self.setVideos(data.videos)
    },
  }))
  .views((self) => ({
    get json(): TTournamentUpdateRequest {
      return { name: self.name.trim(), description: self.description.trim() }
    },
    get validation(): boolean {
      return !!self.name.trim() && !!self.description.trim()
    },
  }))

export interface ITournamentModel extends Instance<typeof TournamentModel> {}

export const TournamentCreateModel = types
  .model({
    name: "",
    description: "",
    is_loading: false,
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
  }))
  .views((self) => ({
    get json(): TTournamentUpdateRequest {
      return { name: self.name.trim(), description: self.description.trim() }
    },
    get validation(): boolean {
      return !!self.name.trim() && !!self.description.trim()
    },
  }))
