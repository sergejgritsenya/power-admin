import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core"
import { Observer } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useEffect, useMemo } from "react"
import { admin_routes } from "../../main"
import { useAuth, useAxios } from "../../services"
import { SaveButton } from "../common"
import { AccountModel, PasswordModel } from "../models"
import { TChangePasswordRequest } from "./types"

export const AdminAccount: FC = () => {
  const axios = useAxios()
  const auth = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const model = useMemo(() => {
    return AccountModel.create({})
  }, [])

  const load = async () => {
    const admin = await auth.admin_me()
    model.setAdmin(admin)
  }
  const update = async () => {
    model.setLoading(true)
    try {
      await axios.makeRequest({ url: admin_routes.root, method: "PATCH", data: model.json })
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
  const changePassword = async (data: TChangePasswordRequest) => {
    model.setLoading(true)
    try {
      await axios.makeRequest({ url: admin_routes.change_pass, method: "PATCH", data })
      model.setLoading(false)
      enqueueSnackbar("Successfully saved", {
        variant: "success",
      })
    } catch (e) {
      model.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
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
                <ChangePasswordDialog changePassword={changePassword} />
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
            {/* <Locker show={model.is_loading} /> */}
          </CardContent>
        </Card>
      )}
    </Observer>
  )
}

type TChangePasswordDialogProps = {
  changePassword: (data: TChangePasswordRequest) => void
}
const ChangePasswordDialog: FC<TChangePasswordDialogProps> = (props) => {
  const { changePassword } = props
  const model = useMemo(() => {
    return PasswordModel.create({})
  }, [])
  const change = async () => {
    changePassword(model.json)
    model.clean()
  }
  return (
    <Observer>
      {() => (
        <>
          <Button color="primary" onClick={() => model.setOpen(true)}>
            Change password
          </Button>
          <Dialog open={model.open} onClose={() => model.setOpen(false)}>
            <DialogTitle>Change password form</DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="old password"
                    value={model.old_password}
                    onChange={(e) => model.setOldPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6} />
                <Grid item xs={12} md={6}>
                  <TextField
                    label="new password"
                    value={model.new_password}
                    onChange={(e) => model.setNewPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="confirm new password"
                    value={model.confirm_password}
                    onChange={(e) => model.setConfirmPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={() => model.setOpen(false)}>
                close
              </Button>
              <Button color="secondary" onClick={change} disabled={!model.validation}>
                change
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Observer>
  )
}
