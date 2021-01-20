import { useSnackbar } from "notistack"
import React, { FC, useEffect, useState } from "react"
import { admin_routes } from "../../main"
import { useAuth, useAxios } from "../../services"
import { Locker } from "../common"
import { AdminList } from "./admin-list"
import { TAdminList } from "./types"

export const AdminListLoader: FC = () => {
  const axios = useAxios()
  const auth = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const [state, setState] = useState<TAdminList>([])
  const [is_super, setIsSuper] = useState<boolean>(false)

  const load = async () => {
    const res = await auth.admin_me()
    setIsSuper(res.is_super)
    const list = await axios.makeRequest<TAdminList>({ url: admin_routes.root })
    setState(list)
  }

  const deleteOne = async (admin_id: string) => {
    try {
      await axios.makeRequest<TAdminList[]>({
        method: "DELETE",
        url: admin_routes.get(admin_id),
      })
      setState(state.filter((item) => item.id !== admin_id))
      enqueueSnackbar("Successfully deleted", {
        variant: "success",
      })
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    }
  }

  useEffect(() => {
    load()
  }, [])
  if (!state) {
    return <Locker />
  }

  return <AdminList list={state} deleteOne={deleteOne} is_super={is_super} />
}
