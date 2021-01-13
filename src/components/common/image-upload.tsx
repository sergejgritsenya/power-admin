import { Avatar, Button, makeStyles } from "@material-ui/core"
import CloudUpload from "@material-ui/icons/CloudUpload"
import Delete from "@material-ui/icons/Delete"
import React, { FC, useState } from "react"
import { Locker } from "./locker"
import { FileUploadButton } from "./upload-button"

type TImageUploadProps = {
  upload: (file: File) => Promise<any>
  src?: string
  deleteLogo?: () => Promise<void> //TODO сделать обязательным
  inputName?: string // pass unique - when need more than 1 upload btn
}
export const ImageUpload: FC<TImageUploadProps> = ({ upload, src, deleteLogo, inputName }) => {
  const classes = useStyles()
  const [isLoading, setLoading] = useState<boolean>(false)

  const _upload = async (file: File) => {
    setLoading(true)
    await upload(file)
    setLoading(false)
  }
  const _remove = async () => {
    setLoading(true)
    deleteLogo && (await deleteLogo())
    setLoading(false)
  }

  return (
    <div className={classes.root}>
      <Avatar src={src} variant="rounded" className={classes.avatar} />
      <div className={classes.actions}>
        <FileUploadButton inputName={inputName || "avatar"} uploadFile={_upload} fullWidth>
          <CloudUpload />
        </FileUploadButton>
        <Button color="secondary" fullWidth onClick={_remove}>
          <Delete />
        </Button>
      </div>
      <Locker show={isLoading} position="absolute" />
    </div>
  )
}
ImageUpload.displayName = "ImageUpload"

type TImageItemUploadProps = {
  upload: (file: File) => Promise<any>
}
export const ImageItemUpload: FC<TImageItemUploadProps> = ({ upload }) => {
  const classes = useStyles()
  const [isLoading, setLoading] = useState<boolean>(false)

  const _upload = async (file: File) => {
    setLoading(true)
    await upload(file)
    setLoading(false)
  }

  return (
    <div className={classes.actions}>
      <FileUploadButton inputName={"item"} uploadFile={_upload} fullWidth>
        <CloudUpload />
      </FileUploadButton>
      <Locker show={isLoading} position="absolute" />
    </div>
  )
}

const useStyles = makeStyles(
  {
    root: {
      position: "relative",
    },
    avatar: {
      width: "100%",
      height: "250px",
      "& > img": {
        objectFit: "contain",
      },
    },
    actions: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridColumnGap: "8px",
      margin: "8px 0",
    },
  },
  { name: "ImageUpload" }
)
