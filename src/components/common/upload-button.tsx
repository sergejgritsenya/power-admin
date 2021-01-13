import { Button, ButtonProps } from "@material-ui/core"
import React, { FC } from "react"

type TFileUploadButtonProps = {
  uploadFile: (file: File) => void
  inputName: string
} & ButtonProps
export const FileUploadButton: FC<TFileUploadButtonProps> = ({
  uploadFile,
  inputName,
  ...rest
}) => (
  <label htmlFor={inputName} style={{ display: "block" }}>
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        document.getElementsByName(inputName)[0].click()
      }}
      {...rest}
    >
      {rest.children}
    </Button>
    <UploadInput uploadFile={uploadFile} name={inputName} />
  </label>
)

type TUploadInputProps = {
  uploadFile: (file: File) => void
  name: string
}
const UploadInput: FC<TUploadInputProps> = ({ name, uploadFile }) => {
  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      uploadFile(file)
    }
    e.target.value = ""
  }

  return (
    <input
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        opacity: 0,
        visibility: "hidden",
        right: "10000px",
      }}
      onChange={upload}
      type="file"
      name={name}
    />
  )
}
