import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core"
import React, { FC } from "react"

type TLockerProps = {
  show: boolean
  position?: "fixed" | "absolute"
}
export const Locker: FC<TLockerProps> = ({ show }) => {
  const classes = useStyles()
  return (
    <Backdrop open={show} className={classes.locker}>
      <CircularProgress color="secondary" size={50} />
    </Backdrop>
  )
}

const useStyles = makeStyles(_theme => ({
  locker: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 2000, // needs to be more that MUI modal, currently 1300
  },
}))
