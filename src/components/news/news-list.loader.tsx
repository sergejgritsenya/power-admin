import { useSnackbar } from "notistack"
import React, { FC, useEffect, useState } from "react"
import { news_routes } from "../../main"
import { useAxios } from "../../services"
import { Locker } from "../common"
import { NewsList } from "./news-list"
import { TNewsDeleteRequest, TNewsList } from "./types"

export const NewsListLoader: FC = () => {
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const [state, setState] = useState<TNewsList[] | null>(null)

  const load = async () => {
    try {
      const list = await axios.makeRequest<TNewsList[]>({ url: news_routes.root })
      setState(list)
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    }
  }

  const deleteOne = async (news_id: string) => {
    try {
      await axios.makeRequest<TNewsList[], TNewsDeleteRequest>({
        method: "DELETE",
        url: news_routes.get(news_id),
      })
      if (state) {
        setState(state.filter((news) => news.id !== news_id))
      }
      enqueueSnackbar("Succesfully deleted", {
        variant: "success",
      })
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    }
  }

  useEffect(() => {
    load()
  }, [])
  if (!state) {
    return <Locker />
  }

  return <NewsList news={state} deleteOne={deleteOne} />
}
