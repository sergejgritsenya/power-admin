import { Observer } from "mobx-react-lite"
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
  const upload = async (data: FormData) => {
    const res = await axios.makeRequest<string, FormData>({
      data,
      method: "PUT",
      url: news_routes.upload(news.id),
    })
    news.setLogo(res)
  }
  const deleteLogo = async () => {
    await axios.makeRequest<string, string>({
      method: "DELETE",
      url: news_routes.deleteLogo(news.id),
    })
    news.setLogo("")
  }
  return (
    <Observer>
      {() => <ImageUpload src={news.logo} upload={upload} deleteLogo={deleteLogo} />}
    </Observer>
  )
}
