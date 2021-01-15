import { Avatar, Button, makeStyles } from "@material-ui/core"
import CloudUpload from "@material-ui/icons/CloudUpload"
import Delete from "@material-ui/icons/Delete"
import React, { ChangeEvent, FC, useState } from "react"
import { useSnack } from "../../services"
import { Locker } from "./locker"
import { FileUploadButton } from "./upload-button"

type TImageUploadProps = {
  deleteLogo: () => Promise<void>
  src: string
  upload: (file: FormData) => Promise<void>
}
export const ImageUpload: FC<TImageUploadProps> = ({ src, upload, deleteLogo }) => {
  const { actions, avatar, root } = useStyles()
  const { enqueueSnackbar } = useSnack()
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
  const _remove = async () => {
    try {
      setIsLoading(true)
      await deleteLogo()
      enqueueSnackbar("Successfully removed", {
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
    <div className={root}>
      <Avatar className={avatar} src={src || "/static/default-img.png"} variant="rounded" />
      <div className={actions}>
        <FileUploadButton name="avatar" upload={_upload}>
          <CloudUpload />
        </FileUploadButton>
        <Button color="secondary" fullWidth onClick={_remove}>
          <Delete />
        </Button>
        {is_loading && <Locker />}
      </div>
    </div>
  )
}

type TImageItemUploadProps = {
  upload: (file: File) => Promise<void>
}
export const ImageItemUpload: FC<TImageItemUploadProps> = ({ upload }) => {
  const { actions } = useStyles()
  const { enqueueSnackbar } = useSnack()
  const [is_loading, setIsLoading] = useState<boolean>(false)

  const _upload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true)
      const files = e.target.files
      if (files && files.length > 0) {
        const file = files[0]
        await upload(file)
      }
      e.target.value = ""
      enqueueSnackbar("Successfully upload", {
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
