import { Card, CardContent, CardHeader, Checkbox, Grid, TextField } from "@material-ui/core"
import { Observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Locker, SaveButton } from "../common"
import { INewsModel } from "../models"
import { NewsLogoUpload } from "./news-logo-upload"

type TNewsProps = {
  news: INewsModel
  update: () => void
}
export const News: FC<TNewsProps> = ({ news, update }) => {
  return (
    <Observer>
      {() => (
        <Card>
          <CardHeader title={`News ${news.title}`} />
          <CardContent>
            <Grid container>
              <Grid item xs={9}>
                <Grid container>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      label="title"
                      value={news.title}
                      onChange={(e) => news.setTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      label="tournament"
                      value={news.tournament_id}
                      onChange={(e) => news.setTournament(e.target.value)}
                      select
                      SelectProps={{ native: true }}
                    >
                      <option value="" />
                      {news.tournaments.map((tournament) => (
                        <option key={tournament.id} value={tournament.id}>
                          {tournament.name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Checkbox
                      value="publish"
                      checked={news.publish}
                      onChange={(e) => news.setPublish(e.target.checked)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="text"
                      value={news.text}
                      onChange={(e) => news.setText(e.target.value)}
                      multiline
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3}>
                <NewsLogoUpload news={news} />
              </Grid>
            </Grid>
            {news.validation && <SaveButton save={update} />}
          </CardContent>
          {news.is_loading && <Locker />}
        </Card>
      )}
    </Observer>
  )
}
