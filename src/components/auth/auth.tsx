import {
  Avatar,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { Observer } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "../../services"
import { AuthModel } from "../models"

export const Auth: FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const auth = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const model = useMemo(() => AuthModel.create(), [])

  const replace = () => {
    history.replace("/")
  }

  const login = async () => {
    try {
      model.setLoading(true)
      await auth.login(model.json)
      enqueueSnackbar("Success", {
        variant: "success",
      })
      replace()
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    } finally {
      model.setLoading(false)
    }
  }
  return (
    <Observer>
      {() => (
        <form onKeyPress={(e) => e.key === "Enter" && login()}>
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h3" gutterBottom align="center">
                Power Admin Login
              </Typography>
              <Grid container justify="center" alignItems="center">
                <Grid item xs={12}>
                  <TextField
                    label="Login"
                    type="text"
                    autoComplete="login"
                    required
                    value={model.login}
                    onChange={(e) => model.setLogin(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label="Password"
                    autoComplete="current-password"
                    required
                    value={model.password}
                    onChange={(e) => model.setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container justify="flex-end" alignItems="center">
                <Grid item>
                  <Button color="primary" onClick={login}>
                    Login
                  </Button>
                </Grid>
              </Grid>
              {/* <Locker show={model.is_loading} /> */}
            </div>
          </Container>
        </form>
      )}
    </Observer>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}))
