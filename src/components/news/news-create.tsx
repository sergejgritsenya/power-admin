import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { Observer } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { news_routes } from "../../main"
import { useAxios } from "../../services"
import { Locker, SaveButton } from "../common"
import { NewsCreateModel } from "../models"
import { TNewsCreateRequest } from "./types"

export const NewsCreate: FC = () => {
  const axios = useAxios()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const model = useMemo(() => {
    return NewsCreateModel.create()
  }, [])
  const create = async () => {
    model.setLoading(true)
    try {
      const res = await axios.makeRequest<string, TNewsCreateRequest>({
        data: model.json,
        method: "POST",
        url: news_routes.root,
      })
      model.setLoading(false)
      enqueueSnackbar("Successfully created", {
        variant: "success",
      })
      history.replace(`/news/${res}`)
    } catch (e) {
      model.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    }
  }
  return (
    <Observer>
      {() => (
        <Card>
          <CardHeader title={`News: ${model.title}`} />
          <CardContent>
            <Grid container>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="title"
                  value={model.title}
                  onChange={(e) => model.setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="text"
                  value={model.text}
                  onChange={(e) => model.setText(e.target.value)}
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
