import { useSnackbar } from "notistack"
import React, { FC, useEffect, useState } from "react"
import { tournament_routes } from "../../main"
import { useAxios } from "../../services"
import { Locker } from "../common"
import { TournamentList } from "./tournament-list"
import { TTournamentList } from "./types"

export const TournamentListLoader: FC = () => {
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const [state, setState] = useState<TTournamentList | null>(null)

  const load = async () => {
    try {
      const list = await axios.makeRequest<TTournamentList>({
        url: tournament_routes.root,
      })
      setState(list)
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    }
  }

  const deleteOne = async (tournament_id: string) => {
    try {
      await axios.makeRequest<TTournamentList>({
        method: "DELETE",
        url: tournament_routes.get(tournament_id),
      })
      if (state) {
        setState(state.filter((item) => item.id !== tournament_id))
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

  return <TournamentList deleteOne={deleteOne} list={state} />
}
