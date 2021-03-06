import { Avatar, Button, makeStyles } from "@material-ui/core"
import CloudUpload from "@material-ui/icons/CloudUpload"
import Delete from "@material-ui/icons/Delete"
import { useSnackbar } from "notistack"
import React, { ChangeEvent, FC, useState } from "react"
import { Locker } from "./locker"
import { FileUploadButton } from "./upload-button"

type TImageUploadProps = {
  deleteLogo: () => Promise<void>
  src: string
  upload: (file: FormData) => Promise<void>
}
export const ImageUpload: FC<TImageUploadProps> = ({ src, upload, deleteLogo }) => {
  const { actions, avatar, root } = useStyles()

  const _upload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files
      if (files && files.length > 0) {
        const file = files[0]
        const data = new FormData()
        data.append("file", file)
        await upload(data)
      }
      e.target.value = ""
    } catch (e) {
      throw e
    }
  }

  return (
    <div className={root}>
      <Avatar
        className={avatar}
        src={src || "/static/default-img.png"}
        variant="rounded"
      />
      <div className={actions}>
        <FileUploadButton name="avatar" upload={_upload}>
          <CloudUpload />
        </FileUploadButton>
        <Button color="secondary" fullWidth onClick={deleteLogo}>
          <Delete />
        </Button>
      </div>
    </div>
  )
}

type TImageItemUploadProps = {
  upload: (data: FormData) => Promise<void>
}
export const ImageItemUpload: FC<TImageItemUploadProps> = ({ upload }) => {
  const { actions } = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [is_loading, setIsLoading] = useState<boolean>(false)

  const _upload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true)
      const files = e.target.files
      if (files && files.length > 0) {
        const file = files[0]
        const data = new FormData()
        data.append("file", file)
        await upload(data)
      }
      e.target.value = ""
      enqueueSnackbar("Successfully uploaded", {
        variant: "success",
      })
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={actions}>
      <FileUploadButton name="item" upload={_upload}>
        <CloudUpload />
      </FileUploadButton>
      {is_loading && <Locker />}
    </div>
  )
}

const useStyles = makeStyles({
  actions: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: "8px",
    margin: "8px 0",
  },
  avatar: {
    width: "100%",
    height: "250px",
    "& > img": {
      objectFit: "contain",
    },
  },
  root: {
    position: "relative",
  },
})
