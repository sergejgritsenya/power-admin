import { Button, makeStyles } from "@material-ui/core"
import React, { ChangeEvent, FC } from "react"

type TFileUploadButtonProps = {
  name: string
  upload: (e: ChangeEvent<HTMLInputElement>) => void
}
export const FileUploadButton: FC<TFileUploadButtonProps> = ({ children, name, upload }) => {
  const { input, label } = useStyles()
  return (
    <label htmlFor={name} className={label}>
      <Button
        color="primary"
        fullWidth
        onClick={() => document.getElementsByName(name)[0].click()}
        variant="contained"
      >
        {children}
      </Button>
      <input className={input} name={name} onChange={upload} type="file" />
    </label>
  )
}

const useStyles = makeStyles({
  input: {
    position: "absolute",
    width: 0,
    height: 0,
    opacity: 0,
    visibility: "hidden",
    right: "10000px",
  },
  label: { display: "block" },
})
