import { useSnackbar } from "notistack"
import React, { FC, useEffect, useState } from "react"
import { shop_routes } from "../../main"
import { useAxios } from "../../services"
import { Locker } from "../common"
import { ShopList } from "./shop-list"
import { TShopList } from "./types"

export const ShopListLoader: FC = () => {
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const [state, setState] = useState<TShopList | null>(null)

  const load = async () => {
    try {
      const list = await axios.makeRequest<TShopList>({ url: shop_routes.root })
      setState(list)
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    } finally {
    }
  }

  const deleteOne = async (shop_id: string) => {
    try {
      await axios.makeRequest<TShopList>({
        method: "DELETE",
        url: shop_routes.get(shop_id),
      })
      if (state) {
        setState(state.filter((shop) => shop.id !== shop_id))
      }
      enqueueSnackbar("Succesfully deleted", {
        variant: "success",
      })
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    } finally {
    }
  }

  useEffect(() => {
    load()
  }, [])
  if (!state) {
    return <Locker />
  }

  return <ShopList list={state} deleteOne={deleteOne} />
}
