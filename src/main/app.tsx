import { CssBaseline, ThemeProvider } from "@material-ui/core"
import { SnackbarProvider } from "notistack"
import React, { FC, useEffect, useRef } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Auth } from "../components"
import { useSnack } from "../services"
import { Layout } from "./layout"
import { getTheme } from "./theme"

export const App: FC = () => {
  const ref = useRef<any>()
  const snackService = useSnack()

  useEffect(() => {
    snackService.enqueueSnackbar = ref.current.enqueueSnackbar
    snackService.closeSnackbar = ref.current.closeSnackbar
  }, [])
  return (
    <ThemeProvider theme={getTheme()}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        ref={ref}
      >
        <Router>
          <Switch>
            <Route exact path="/login">
              <Auth />
            </Route>
            <Route>
              <Layout />
            </Route>
          </Switch>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
