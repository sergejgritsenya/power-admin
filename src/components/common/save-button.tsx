import { Button } from "@material-ui/core"
import { createStyles, withStyles, WithStyles } from "@material-ui/styles"
import React, { FC } from "react"

const jssStyles = () =>
  createStyles({
    fixed: {
      position: "fixed",
      right: "24px",
      bottom: "24px",
      zIndex: 1250,
    },
  })

interface ISaveButtonProps extends WithStyles<typeof jssStyles> {
  save: () => void
  disabled?: boolean
  local?: boolean
}

const LeanSaveButton: FC<ISaveButtonProps> = props => {
  const { classes, save, disabled } = props
  return (
    <div className={classes.fixed}>
      <Button color="primary" disabled={disabled} onClick={save}>
        Save
      </Button>
    </div>
  )
}
export const SaveButton = withStyles(jssStyles)(LeanSaveButton)
