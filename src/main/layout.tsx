import React, { FC, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "../services"
import { Root } from "./root"

export const Layout: FC = () => {
  const auth = useAuth()
  const history = useHistory()

  useEffect(() => {
    if (!auth.is_loaded) {
      history.replace("/login")
    }
  }, [])

  if (!auth.is_loaded) {
    return null
  }
  return <Root />
}
