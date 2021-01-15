import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { useObserver } from "mobx-react-lite"
import React, { FC, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { tournament_routes } from "../../main"
import { useAxios, useSnack } from "../../services"
import { Locker, SaveButton } from "../common"
import { TournamentCreateModel } from "../models"
import { TTournamentUpdateRequest } from "./types"

export const TournamentCreate: FC = () => {
  const axios = useAxios()
  const history = useHistory()
  const { enqueueSnackbar } = useSnack()
  const model = useMemo(() => {
    return TournamentCreateModel.create()
  }, [])

  const create = async () => {
    model.setLoading(true)
    try {
      const res = await axios.makeRequest<string, TTournamentUpdateRequest>({
        data: model.json,
        method: "POST",
        url: tournament_routes.root,
      })
      model.setLoading(false)
      enqueueSnackbar("Successfully created", {
        variant: "success",
      })
      history.replace(`/tournaments/${res}`)
    } catch (e) {
      model.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    }
  }
  return useObserver(() => (
    <Card>
      <CardHeader title={`Create new tournament: ${model.name}`} />
      <CardContent>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <TextField
              label="name"
              value={model.name}
              onChange={(e) => model.setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="description"
              value={model.description}
              onChange={(e) => model.setDescription(e.target.value)}
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        {model.validation && <SaveButton save={create} />}
      </CardContent>
      {model.is_loading && <Locker />}
    </Card>
  ))
}
