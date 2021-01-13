import { Container, makeStyles } from "@material-ui/core"
import React, { FC } from "react"
import { Route, Switch } from "react-router-dom"
import {
  NewsCreate,
  NewsListLoader,
  NewsLoader,
  TournamentCreate,
  TournamentListLoader,
  TournamentLoader,
} from "../components"
import { NotFound } from "./not-found"

export const Main: FC = () => {
  const classes = useStyles()
  return (
    <main className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Switch>
          <Route exact path="/">
            <>Hello</>
          </Route>
          <Route exact path="/admins"></Route>
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
          <Route exact path="/shop"></Route>
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
