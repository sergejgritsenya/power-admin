import { Tab, Tabs } from "@material-ui/core"
import { useSnackbar } from "notistack"
import {
  createContext,
  default as React,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useParams } from "react-router-dom"
import { tournament_routes } from "../../main"
import { useAxios } from "../../services"
import { ITournamentModel, TournamentModel } from "../models"
import { ImagesList } from "./images-list"
import { TournamentMain } from "./tournament-main"
import { TTournament } from "./types"
import { VideosList } from "./videos-list"

const TournamentContext = createContext<ITournamentModel>(null as any)
export const useTournamentContext = () => useContext(TournamentContext)

type TTournamentParams = {
  id: string
}

export const TournamentLoader: FC = () => {
  const { id } = useParams<TTournamentParams>()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const [value, setValue] = useState<number>(0)
  const tournament = useMemo(() => {
    return TournamentModel.create({ id, images: [], videos: [] })
  }, [])

  const load = async () => {
    tournament.setLoading(true)
    try {
      const res = await axios.makeRequest<TTournament>({
        url: tournament_routes.get(id),
      })
      tournament.updateAll(res)
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    } finally {
      tournament.setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])
  return (
    <TournamentContext.Provider value={tournament}>
      <Tabs value={value} onChange={(_, val) => setValue(val)}>
        <Tab value={0} label="Main" />
        <Tab value={1} label="Images" />
        <Tab value={2} label="Video" />
      </Tabs>
      {value === 0 && <TournamentMain />}
      {value === 1 && <ImagesList />}
      {value === 2 && <VideosList />}
    </TournamentContext.Provider>
  )
}
