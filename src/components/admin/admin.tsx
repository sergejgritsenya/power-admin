import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { Observer } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { admin_routes } from "../../main"
import { useAxios } from "../../services"
import { Locker } from "../common"
import { AdminModel } from "../models"
import { TAdmin } from "./types"

type TAdminLoaderProps = {
  id: string
}
export const Admin: FC = () => {
  const { id: admin_id } = useParams<TAdminLoaderProps>()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()

  const model = useMemo(() => AdminModel.create({ id: admin_id }), [])

  const load = async () => {
    model.setLoading(true)
    try {
      const admin = await axios.makeRequest<TAdmin>({
        url: admin_routes.get(admin_id),
      })
      model.updateAll(admin)
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
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
          <CardHeader title={`Hello Admin: ${model.login}`} />
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
            </Grid>
          </CardContent>
          {model.is_loading && <Locker />}
        </Card>
      )}
    </Observer>
  )
}
