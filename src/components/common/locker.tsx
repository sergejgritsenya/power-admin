import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core"
import React, { FC } from "react"

export const Locker: FC = () => {
  const { locker } = useStyles()
  return (
    <Backdrop open={true} className={locker}>
      <CircularProgress color="secondary" size={50} />
    </Backdrop>
  )
}

const useStyles = makeStyles(() => ({
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
