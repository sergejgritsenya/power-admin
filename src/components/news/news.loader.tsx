import { useSnackbar } from "notistack"
import React, { FC, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { news_routes } from "../../main/routes"
import { useAxios } from "../../services"
import { NewsModel } from "../models"
import { News } from "./news"
import { TNewsAdmin, TNewsUpdateProps } from "./types"

type TNewsLoaderProps = {
  id: string
}
export const NewsLoader: FC = () => {
  const { id: news_id } = useParams<TNewsLoaderProps>()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const model = useMemo(() => {
    return NewsModel.create({ id: news_id })
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

  const update = async () => {
    model.setLoading(true)
    try {
      await axios.makeRequest<TNewsAdmin, TNewsUpdateProps>({
        data: model.json,
        method: "PATCH",
        url: news_routes.get(model.id),
      })
      enqueueSnackbar("Successfully saved", {
        variant: "success",
      })
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    } finally {
      model.setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return <News news={model} update={update} />
}
