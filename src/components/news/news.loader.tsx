import { useSnackbar } from "notistack"
import React, { FC, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { news_routes, tournament_routes } from "../../main/routes"
import { useAxios } from "../../services"
import { NewsModel } from "../models"
import { TTournamentList } from "../tournament"
import { News } from "./news"
import { TNewsAdmin, TNewsUpdateProps } from "./types"

type TNewsLoaderProps = {
  id: string
}
export const NewsLoader: FC = () => {
  const { id: news_id } = useParams<TNewsLoaderProps>()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()

  const model = useMemo(() => NewsModel.create({ id: news_id }), [])

  const load = async () => {
    model.setLoading(true)
    try {
      const [news, tournaments] = await Promise.all([
        axios.makeRequest<TNewsAdmin>({
          url: news_routes.get(news_id),
        }),
        axios.makeRequest<TTournamentList>({
          url: tournament_routes.root,
        }),
      ])
      model.updateAll(news, tournaments)
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    } finally {
      model.setLoading(false)
    }
  }

  const deleteLogo = async () => {
    model.setLoading(true)
    try {
      await axios.makeRequest<string, string>({
        method: "DELETE",
        url: news_routes.deleteLogo(model.id),
      })
      model.setLogo("")
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    } finally {
      model.setLoading(false)
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

  const upload = async (data: FormData) => {
    model.setLoading(true)
    try {
      const res = await axios.makeRequest<string, FormData>({
        data,
        method: "PUT",
        url: news_routes.upload(model.id),
      })
      model.setLogo(res)
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
  return <News deleteLogo={deleteLogo} news={model} update={update} upload={upload} />
}
