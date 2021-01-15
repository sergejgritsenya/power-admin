import React, { FC, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { news_routes } from "../../main/routes"
import { useAxios, useSnack } from "../../services"
import { NewsModel } from "../models"
import { News } from "./news"
import { TNewsAdmin } from "./types"

type TNewsLoaderProps = {
  id: string
}
export const NewsLoader: FC = () => {
  const { id: news_id } = useParams<TNewsLoaderProps>()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnack()
  const model = useMemo(() => {
    return NewsModel.create()
  }, [])

  const load = async () => {
    try {
      const news = await axios.makeRequest<TNewsAdmin>({
        url: news_routes.get(news_id),
      })
      model.updateAll(news)
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    }
  }

  useEffect(() => {
    load()
  }, [])

  return <News news={model} />
}
