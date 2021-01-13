import { createStyles, makeStyles } from "@material-ui/styles"
import React, { FC } from "react"
import { Header } from "./header"
import { Main } from "./main"
import { NavBar } from "./nav-bar"

export const Root: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.flex}>
        <NavBar />
        <Main />
      </div>
    </div>
  )
}

const useStyles = makeStyles(
  createStyles({
    root: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    flex: {
      display: "flex",
      flexGrow: 1,
    },
  })
)
