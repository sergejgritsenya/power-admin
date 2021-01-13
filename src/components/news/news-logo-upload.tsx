import { useObserver } from "mobx-react-lite"
import React, { FC } from "react"
import { news_routes } from "../../main"
import { useAxios } from "../../services"
import { ImageUpload } from "../common"
import { INewsModel } from "../models"

type TNewsLogoUploadProps = {
  news: INewsModel
}
export const NewsLogoUpload: FC<TNewsLogoUploadProps> = ({ news }) => {
  const axios = useAxios()
  const logo_src = news.logo || "/static/default-img.png"
  const upload = async (file: File) => {
    const res = await axios.makeRequest<string, File>({
      data: file,
      method: "PATCH",
      url: news_routes.upload(news.id),
    })
    news.setLogo(res)
  }
  const deleteLogo = async () => {
    await axios.makeRequest<string, string>({
      method: "PATCH",
      url: news_routes.deleteLogo(news.id),
    })
    news.setLogo(null)
  }
  return useObserver(() => <ImageUpload src={logo_src} upload={upload} deleteLogo={deleteLogo} />)
}
