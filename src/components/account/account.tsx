import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { Observer } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useEffect, useMemo } from "react"
import { admin_routes } from "../../main"
import { useAuth, useAxios } from "../../services"
import { Locker, SaveButton } from "../common"
import { AccountModel } from "../models"
import { ChangePasswordDialog } from "./change-password-dialog"

export const AdminAccount: FC = () => {
  const axios = useAxios()
  const auth = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const model = useMemo(() => AccountModel.create(), [])

  const load = async () => {
    model.setLoading(true)
    try {
      const admin = await auth.admin_me()
      model.setAdmin(admin)
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    } finally {
      model.setLoading(false)
    }
  }

  const update = async () => {
    model.setLoading(true)
    try {
      await axios.makeRequest({
        url: admin_routes.root,
        method: "PATCH",
        data: model.json,
      })
      enqueueSnackbar("Successfully saved", {
        variant: "success",
      })
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    } finally {
      model.setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])
  return (
    <Observer>
      {() => (
        <Card>
          <CardContent>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <CardHeader title="Admin Account" />
              </Grid>
              <Grid item>
                <ChangePasswordDialog />
              </Grid>
            </Grid>
            <Grid container justify="space-between" alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  label="login"
                  value={model.login}
                  onChange={(e) => model.setLogin(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="email"
                  value={model.email}
                  onChange={(e) => model.setEmail(e.target.value)}
                />
              </Grid>
            </Grid>
            {model.validation && <SaveButton save={update} />}
          </CardContent>
          {model.is_loading && <Locker />}
        </Card>
      )}
    </Observer>
  )
}
