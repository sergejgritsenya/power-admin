import { useSnackbar } from "notistack"
import React, { FC, useEffect, useState } from "react"
import { news_routes } from "../../main"
import { useAxios } from "../../services"
import { NoElements } from "../common"
import { NewsList } from "./news-list"
import { TNewsDeleteRequest, TNewsList } from "./types"

export const NewsListLoader: FC = () => {
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const [state, setState] = useState<TNewsList[]>([])
  const [is_loading, setIsLoading] = useState<boolean>(true)

  const load = async () => {
    setIsLoading(true)
    try {
      const list = await axios.makeRequest<TNewsList[]>({ url: news_routes.root })
      setState(list)
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteNews = async (news_id: string) => {
    setIsLoading(true)
    try {
      await axios.makeRequest<TNewsList[], TNewsDeleteRequest>({
        method: "DELETE",
        url: news_routes.get(news_id),
      })
      setState(state.filter((news) => news.id !== news_id))
      enqueueSnackbar("Succesfully deleted", {
        variant: "success",
      })
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  if (is_loading) {
    return <NoElements />
  }

  return <NewsList news={state} deleteNews={deleteNews} />
}
