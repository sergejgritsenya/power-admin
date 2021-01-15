import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { Observer, useObserver } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC } from "react"
import { tournament_routes } from "../../main"
import { useAxios } from "../../services"
import { ImageUpload, Locker, SaveButton } from "../common"
import { ITournamentModel } from "../models"
import { useTournamentContext } from "./tournament.loader"
import { TTournament, TTournamentUpdateRequest } from "./types"

export const TournamentMain: FC = () => {
  const tournament = useTournamentContext()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const update = async () => {
    tournament.setLoading(true)
    try {
      const res = await axios.makeRequest<TTournament, TTournamentUpdateRequest>({
        data: tournament.json,
        method: "PUT",
        url: tournament_routes.get(tournament.id),
      })
      tournament.updateAll(res)
      enqueueSnackbar("Successfully saved", {
        variant: "success",
      })
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    } finally {
      tournament.setLoading(false)
    }
  }
  return <TournamentField tournament={tournament} update={update} />
}

type TTournamentFieldProps = {
  tournament: ITournamentModel
  update: () => void
}
const TournamentField: FC<TTournamentFieldProps> = (props) => {
  const { tournament, update } = props
  return useObserver(() => (
    <Card>
      <CardHeader title={`Tournament ${tournament.name}`} />
      <CardContent>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={9}>
            <Grid item xs={9}>
              <Grid container>
                <Grid item xs={12} lg={6}>
                  <TextField
                    label="name"
                    value={tournament.name}
                    onChange={(e) => tournament.setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="description"
                    value={tournament.description}
                    onChange={(e) => tournament.setDescription(e.target.value)}
                    multiline
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3}>
            <LogoUpload />
          </Grid>
        </Grid>
        {tournament.validation && <SaveButton save={update} />}
      </CardContent>
      {tournament.is_loading && <Locker />}
    </Card>
  ))
}

const LogoUpload: FC = () => {
  const tournament = useTournamentContext()
  const axios = useAxios()
  const upload = async (data: FormData) => {
    const res = await axios.makeRequest<string, FormData>({
      data,
      method: "PATCH",
      url: tournament_routes.upload(tournament.id),
    })
    tournament.setLogo(res)
  }
  const deleteLogo = async () => {
    await axios.makeRequest<string>({
      method: "PATCH",
      url: tournament_routes.deleteLogo(tournament.id),
    })
    tournament.setLogo("")
  }
  return (
    <Observer>
      {() => <ImageUpload src={tournament.logo} upload={upload} deleteLogo={deleteLogo} />}
    </Observer>
  )
}
