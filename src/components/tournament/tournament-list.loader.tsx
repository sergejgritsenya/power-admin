import { useSnackbar } from "notistack"
import React, { FC, useEffect, useState } from "react"
import { tournament_routes } from "../../main"
import { useAxios } from "../../services"
import { NoElements } from "../common"
import { TournamentList } from "./tournament-list"
import { TTournamentList } from "./types"

export const TournamentListLoader: FC = () => {
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const [state, setState] = useState<TTournamentList[]>([])
  const [is_loading, setIsLoading] = useState<boolean>(true)

  const load = async () => {
    setIsLoading(true)
    try {
      const list = await axios.makeRequest<TTournamentList[]>({ url: tournament_routes.root })
      setState(list)
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTournament = async (tournament_id: string) => {
    setIsLoading(true)
    try {
      const res = await axios.makeRequest<TTournamentList[]>({
        method: "DELETE",
        url: tournament_routes.get(tournament_id),
      })
      setState(res)
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
  return <TournamentList list={state} deleteTournament={deleteTournament} />
}
