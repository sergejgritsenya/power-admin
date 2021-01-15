import { Container, makeStyles } from "@material-ui/core"
import React, { FC } from "react"
import { Route, Switch } from "react-router-dom"
import {
  Admin,
  AdminAccount,
  AdminCreate,
  NewsCreate,
  NewsListLoader,
  NewsLoader,
  ShopLoader,
  TournamentCreate,
  TournamentListLoader,
  TournamentLoader,
} from "../components"
import { ShopCreate } from "../components"
import { ShopListLoader } from "../components"
import { AdminListLoader } from "../components"
import { NotFound } from "./not-found"

export const Main: FC = () => {
  const classes = useStyles()
  return (
    <main className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Switch>
          <Route exact path="/">
            <AdminAccount />
          </Route>
          <Route exact path="/admins">
            <AdminListLoader />
          </Route>
          <Route exact path="/admins/create">
            <AdminCreate />
          </Route>
          <Route exact path="/admins/:id">
            <Admin />
          </Route>
          <Route exact path="/news">
            <NewsListLoader />
          </Route>
          <Route exact path="/news/create">
            <NewsCreate />
          </Route>
          <Route path="/news/:id">
            <NewsLoader />
          </Route>
          <Route exact path="/tournaments">
            <TournamentListLoader />
          </Route>
          <Route exact path="/tournaments/create">
            <TournamentCreate />
          </Route>
          <Route path="/tournaments/:id">
            <TournamentLoader />
          </Route>
          <Route exact path="/shop">
            <ShopListLoader />
          </Route>
          <Route exact path="/shop/create">
            <ShopCreate />
          </Route>
          <Route path="/shop/:id">
            <ShopLoader />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Container>
    </main>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "auto",
    background: "#fafafa",
    maxWidth: "1280px",
    width: "100%",
    margin: "0 auto",
    padding: "24px 24px",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))
