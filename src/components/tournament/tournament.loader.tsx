import { Tab, Tabs } from "@material-ui/core"
import { Observer } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import { default as React, FC, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { tournament_routes } from "../../main"
import { useAxios } from "../../services"
import { TournamentModel } from "../models"
import { ImagesList } from "./images-list"
import { Tournament } from "./tournament"
import { TTournament, TTournamentUpdateRequest } from "./types"
import { VideosList } from "./videos-list"

type TTournamentParams = {
  id: string
}
export const TournamentLoader: FC = () => {
  const { id } = useParams<TTournamentParams>()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()

  const model = useMemo(() => TournamentModel.create({ id }), [])

  const load = async () => {
    model.setLoading(true)
    try {
      const res = await axios.makeRequest<TTournament>({
        url: tournament_routes.get(id),
      })
      model.updateAll(res)
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
      await axios.makeRequest<string>({
        method: "DELETE",
        url: tournament_routes.deleteLogo(model.id),
      })
      model.setLogo("")
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    } finally {
      model.setLoading(false)
    }
  }

  const update = async () => {
    model.setLoading(true)
    try {
      await axios.makeRequest<TTournament, TTournamentUpdateRequest>({
        data: model.json,
        method: "PATCH",
        url: tournament_routes.get(model.id),
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
        url: tournament_routes.upload(model.id),
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
  return (
    <Observer>
      {() => (
        <>
          <Tabs value={model.tab} onChange={(_, val) => model.setTab(val)}>
            <Tab value={0} label="Main" />
            <Tab value={1} label="Images" />
            <Tab value={2} label="Video" />
          </Tabs>
          {model.tab === 0 && (
            <Tournament
              deleteLogo={deleteLogo}
              tournament={model}
              update={update}
              upload={upload}
            />
          )}
          {model.tab === 1 && <ImagesList tournament={model} />}
          {model.tab === 2 && <VideosList tournament={model} />}
        </>
      )}
    </Observer>
  )
}
