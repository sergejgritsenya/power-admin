import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { Observer } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { tournament_routes } from "../../main"
import { useAxios } from "../../services"
import { Locker, SaveButton } from "../common"
import { TournamentCreateModel } from "../models"
import { TTournamentUpdateRequest } from "./types"

export const TournamentCreate: FC = () => {
  const axios = useAxios()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  const model = useMemo(() => TournamentCreateModel.create(), [])

  const create = async () => {
    model.setLoading(true)
    try {
      const res = await axios.makeRequest<string, TTournamentUpdateRequest>({
        data: model.json,
        method: "POST",
        url: tournament_routes.root,
      })
      enqueueSnackbar("Successfully created", {
        variant: "success",
      })
      history.replace(`/tournaments/${res}`)
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    } finally {
      model.setLoading(false)
    }
  }
  return (
    <Observer>
      {() => (
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
      )}
    </Observer>
  )
}
