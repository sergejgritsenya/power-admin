import { CssBaseline, ThemeProvider } from "@material-ui/core"
import { SnackbarProvider } from "notistack"
import React, { FC } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Auth } from "../components"
import { Layout } from "./layout"
import { getTheme } from "./theme"

export const App: FC = () => {
  return (
    <ThemeProvider theme={getTheme()}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: "center", vertical: "bottom" }}>
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
