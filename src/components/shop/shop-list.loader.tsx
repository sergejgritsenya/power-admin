import React, { FC, useEffect, useState } from "react"
import { shop_routes } from "../../main"
import { useAxios, useSnack } from "../../services"
import { ShopList } from "./shop-list"
import { TShopList } from "./types"

export const ShopListLoader: FC = () => {
  const axios = useAxios()
  const { enqueueSnackbar } = useSnack()
  const [state, setState] = useState<TShopList[]>([])

  const load = async () => {
    try {
      const list = await axios.makeRequest<TShopList[]>({ url: shop_routes.root })
      setState(list)
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    } finally {
    }
  }

  const deleteShop = async (shop_id: string) => {
    try {
      const res = await axios.makeRequest<TShopList[]>({
        method: "DELETE",
        url: shop_routes.get(shop_id),
      })
      setState(res)
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

  return <ShopList list={state} deleteShop={deleteShop} />
}
