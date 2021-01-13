import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core"
import React, { FC, useState } from "react"

type TApplyRemoveDialogProps = {
  id: string
  removeEntity: (id: string) => void
  entity_name: string
}
export const ApplyRemoveDialog: FC<TApplyRemoveDialogProps> = props => {
  const { id, removeEntity, entity_name } = props
  const [open, setOpen] = useState<boolean>(false)
  const action = async () => {
    removeEntity(id)
    setOpen(false)
  }
  return (
    <>
      <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{`Delete ${entity_name}?`}</DialogTitle>
        <DialogContent>{`Are you shure, you want to delete this ${entity_name}?`}</DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={action}>
            Delete
          </Button>
          <Button variant="contained" color="primary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
