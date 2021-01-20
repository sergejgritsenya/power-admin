import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core"
import { Observer } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo } from "react"
import { admin_routes } from "../../main"
import { useAuth, useAxios } from "../../services"
import { Locker } from "../common"
import { PasswordModel } from "../models"

export const ChangePasswordDialog: FC = () => {
  const axios = useAxios()
  const auth = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const model = useMemo(() => PasswordModel.create(), [])

  const change = async () => {
    model.setLoading(true)
    try {
      await axios.makeRequest({
        url: admin_routes.change_pass,
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
      model.clean()
      model.setLoading(false)
    }
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
          {model.is_loading && <Locker />}
        </>
      )}
    </Observer>
  )
}
