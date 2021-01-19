import { Tab, Tabs } from "@material-ui/core"
import { useSnackbar } from "notistack"
import React, { createContext, FC, useContext, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { shop_routes } from "../../main"
import { useAxios } from "../../services"
import { IShopModel, ShopModel } from "../models"
import { ShopImagesList } from "./shop-image-list"
import { ShopMain } from "./shop-main"
import { TShop } from "./types"

const ShopContext = createContext<IShopModel>(null as any)
export const useShopContext = () => useContext(ShopContext)

type TShopLoaderParams = {
  id: string
}

export const ShopLoader: FC = () => {
  const { id } = useParams<TShopLoaderParams>()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const [value, setValue] = useState<number>(0)
  const shop = useMemo(() => {
    return ShopModel.create({ id })
  }, [])

  const load = async () => {
    shop.setLoading(true)
    try {
      const res = await axios.makeRequest<TShop>({
        url: shop_routes.get(id),
      })
      shop.updateAll(res)
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    } finally {
      shop.setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])
  return (
    <ShopContext.Provider value={shop}>
      <Tabs value={value} onChange={(_, val) => setValue(val)}>
        <Tab value={0} label="Main" />
        <Tab value={1} label="Images" />
      </Tabs>
      {value === 0 && <ShopMain />}
      {value === 1 && <ShopImagesList />}
    </ShopContext.Provider>
  )
}
