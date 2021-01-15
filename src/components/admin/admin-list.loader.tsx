import React, { FC, useEffect, useState } from "react"
import { admin_routes } from "../../main"
import { TAdminList, useAuth, useAxios, useSnack } from "../../services"
import { AdminList } from "./admin-list"

export const AdminListLoader: FC = () => {
  const axios = useAxios()
  const auth = useAuth()
  const { enqueueSnackbar } = useSnack()
  const [state, setState] = useState<TAdminList[]>([])
  const [is_super, setIsSuper] = useState<boolean>(false)

  const load = async () => {
    const res = await auth.admin_me()
    setIsSuper(res.is_super)
    const list = await axios.makeRequest<TAdminList[]>({ url: admin_routes.root })
    setState(list)
  }

  const deleteAdmin = async (admin_id: string) => {
    try {
      const res = await axios.makeRequest<TAdminList[]>({
        method: "DELETE",
        url: admin_routes.get(admin_id),
      })
      setState(res)
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
  return <AdminList list={state} deleteAdmin={deleteAdmin} is_super={is_super} />
}
