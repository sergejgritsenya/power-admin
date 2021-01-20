import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { Observer } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { admin_routes } from "../../main"
import { useAxios } from "../../services"
import { Locker, SaveButton } from "../common"
import { AdminCreateModel } from "../models"
import { TAdminCreateRequest } from "./types"

export const AdminCreate: FC = () => {
  const axios = useAxios()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  const model = useMemo(() => AdminCreateModel.create(), [])

  const create = async () => {
    model.setLoading(true)
    try {
      const res = await axios.makeRequest<string, TAdminCreateRequest>({
        data: model.json,
        method: "POST",
        url: admin_routes.root,
      })
      enqueueSnackbar("Successfully created", {
        variant: "success",
      })
      history.replace(`/admins/${res}`)
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
          <CardHeader title={`Create new admin: ${model.login}`} />
          <CardContent>
            <Grid container>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="login"
                  value={model.login}
                  onChange={(e) => model.setLogin(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="email"
                  value={model.email}
                  onChange={(e) => model.setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="password"
                  type="password"
                  value={model.password}
                  onChange={(e) => model.setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="confirm password"
                  type="password"
                  value={model.confirm_password}
                  onChange={(e) => model.setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            {model.validation && <SaveButton save={create} />}
            {model.is_loading && <Locker />}
          </CardContent>
        </Card>
      )}
    </Observer>
  )
}
