import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { Observer } from "mobx-react-lite"
import React, { FC, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { admin_routes } from "../../main"
import { useAxios, useSnack } from "../../services"
import { Locker } from "../common"
import { SaveButton } from "../common"
import { AdminCreateModel } from "../models"
import { TAdminCreateRequest } from "./types"

export const AdminCreate: FC = () => {
  const axios = useAxios()
  const history = useHistory()
  const { enqueueSnackbar } = useSnack()
  const admin = useMemo(() => {
    return AdminCreateModel.create()
  }, [])

  const create = async () => {
    admin.setLoading(true)
    try {
      const res = await axios.makeRequest<string, TAdminCreateRequest>({
        data: admin.json,
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
      admin.setLoading(false)
    }
  }
  return (
    <Observer>
      {() => (
        <Card>
          <CardHeader title={`Create new admin: ${admin.login}`} />
          <CardContent>
            <Grid container>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="login"
                  value={admin.login}
                  onChange={(e) => admin.setLogin(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="email"
                  value={admin.email}
                  onChange={(e) => admin.setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="password"
                  type="password"
                  value={admin.password}
                  onChange={(e) => admin.setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="confirm password"
                  type="password"
                  value={admin.confirm_password}
                  onChange={(e) => admin.setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            {admin.validation && <SaveButton save={create} />}
            {admin.is_loading && <Locker />}
          </CardContent>
        </Card>
      )}
    </Observer>
  )
}
