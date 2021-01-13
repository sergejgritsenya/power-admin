import { Avatar, Card, CardContent, CardHeader, Divider, Grid, makeStyles } from "@material-ui/core"
import React, { FC } from "react"
import { ApplyRemoveDialog, ButtonLink, NoElements } from "../common"
import { TTournamentList } from "./types"

type TTournamentListProps = {
  list: TTournamentList[]
  deleteTournament: (tournament_id: string) => void
}
export const TournamentList: FC<TTournamentListProps> = ({ list, deleteTournament }) => {
  return (
    <Card>
      <CardContent>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <CardHeader title="Tournament list" />
          </Grid>
          <Grid item>
            <ButtonLink to="/tournaments/create" color="primary">
              Create
            </ButtonLink>
          </Grid>
        </Grid>
        <Grid container justify="flex-start" alignItems="center">
          <Grid item xs={12} md={6} lg={2}>
            <h3>Logo</h3>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <h3>Name</h3>
          </Grid>
          <Grid item xs={12} md={6} lg={3} />
          <Grid item xs={12} md={6} lg={3} />
        </Grid>
        <TournamentListTable list={list} deleteTournament={deleteTournament} />
      </CardContent>
    </Card>
  )
}

type TTournamentListTableProps = {
  list: TTournamentList[]
  deleteTournament: (tournament_id: string) => void
}
const TournamentListTable: FC<TTournamentListTableProps> = ({ list, deleteTournament }) => {
  const classes = useStyles()

  if (!list.length) {
    return <NoElements />
  }
  return (
    <div>
      {list.map((tournament) => (
        <div key={tournament.id}>
          <Grid container justify="flex-start" alignItems="center" style={{ padding: "7px 0" }}>
            <Grid item xs={12} md={6} lg={2}>
              {tournament.logo ? (
                <Avatar src={tournament.logo} variant="rounded" className={classes.avatar} />
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {tournament.name}
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <ButtonLink to={`tournaments/${tournament.id}`}>More</ButtonLink>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <ApplyRemoveDialog
                id={tournament.id}
                removeEntity={deleteTournament}
                entity_name="tournament"
              />
            </Grid>
          </Grid>
          <Divider />
        </div>
      ))}
    </div>
  )
}

const useStyles = makeStyles((_theme) => ({
  avatar: {
    width: "auto",
    display: "flex",
    justifyContent: "flex-start",
    "& img": {
      width: "auto",
      objectFit: "contain",
    },
  },
}))
