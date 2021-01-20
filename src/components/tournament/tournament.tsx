import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { Observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ImageUpload, Locker, SaveButton } from "../common"
import { ITournamentModel } from "../models"

type TTournamentProps = {
  deleteLogo: () => Promise<void>
  tournament: ITournamentModel
  update: () => void
  upload: (data: FormData) => Promise<void>
}
export const Tournament: FC<TTournamentProps> = ({
  deleteLogo,
  tournament,
  update,
  upload,
}) => (
  <Observer>
    {() => (
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
              <ImageUpload
                src={tournament.logo}
                upload={upload}
                deleteLogo={deleteLogo}
              />
            </Grid>
          </Grid>
          {tournament.validation && <SaveButton save={update} />}
        </CardContent>
        {tournament.is_loading && <Locker />}
      </Card>
    )}
  </Observer>
)
