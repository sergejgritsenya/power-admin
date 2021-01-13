import { Instance, types } from "mobx-state-tree"
import {
  TTournament,
  TTournamentImage,
  TTournamentUpdateRequest,
  TTournamentVideo,
} from "../tournament"
import { TournamentImageModel } from "./tournament-image.model"
import { TournamentVideoModel } from "./tournament-video.model"

export const TournamentModel = types
  .model({
    id: types.string,
    name: "",
    logo: types.maybeNull(types.string),
    description: "",
    is_loading: false,
    images: types.array(TournamentImageModel),
    videos: types.array(TournamentVideoModel),
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name
    },
    setLogo(logo: string | null) {
      self.logo = logo
    },
    setDescription(description: string) {
      self.description = description
    },
    setLoading(is_loading: boolean) {
      self.is_loading = is_loading
    },
    setImages(images: TTournamentImage[]) {
      const image_models = images.map((image) => TournamentImageModel.create(image))
      self.images.replace(image_models)
    },
    setVideos(videos: TTournamentVideo[]) {
      const video_models = videos.map((video) => TournamentVideoModel.create(video))
      self.videos.replace(video_models)
    },
  }))
  .actions((self) => ({
    updateAll(data: TTournament) {
      self.setName(data.name)
      self.setLogo(data.logo)
      self.setDescription(data.description)
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
    setName(name: string) {
      self.name = name
    },
    setDescription(description: string) {
      self.description = description
    },
    setLoading(is_loading: boolean) {
      self.is_loading = is_loading
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
