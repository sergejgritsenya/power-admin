import { Tab, Tabs } from "@material-ui/core"
import { Observer } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { shop_routes } from "../../main"
import { useAxios } from "../../services"
import { ShopModel } from "../models"
import { Shop } from "./shop"
import { ShopImagesList } from "./shop-image-list"
import { TShop, TShopUpdateProps } from "./types"

type TShopLoaderParams = {
  id: string
}
export const ShopLoader: FC = () => {
  const { id } = useParams<TShopLoaderParams>()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()

  const model = useMemo(() => ShopModel.create({ id }), [])

  const load = async () => {
    model.setLoading(true)
    try {
      const res = await axios.makeRequest<TShop>({
        url: shop_routes.get(id),
      })
      model.updateAll(res)
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    } finally {
      model.setLoading(false)
    }
  }

  const deleteLogo = async () => {
    model.setLoading(true)
    try {
      await axios.makeRequest<string>({
        method: "DELETE",
        url: shop_routes.deleteLogo(model.id),
      })
      model.setLogo("")
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    } finally {
      model.setLoading(false)
    }
  }

  const update = async () => {
    model.setLoading(true)
    try {
      await axios.makeRequest<TShop, TShopUpdateProps>({
        data: model.json,
        method: "PATCH",
        url: shop_routes.get(model.id),
      })
      enqueueSnackbar("Successfully saved", {
        variant: "success",
      })
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    } finally {
      model.setLoading(false)
    }
  }

  const upload = async (data: FormData) => {
    model.setLoading(true)
    try {
      const res = await axios.makeRequest<string, FormData>({
        data,
        method: "PUT",
        url: shop_routes.upload(model.id),
      })
      model.setLogo(res)
      enqueueSnackbar("Successfully saved", {
        variant: "success",
      })
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    } finally {
      model.setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])
  return (
    <Observer>
      {() => (
        <>
          <Tabs value={model.tab} onChange={(_, val) => model.setTab(val)}>
            <Tab value={0} label="Main" />
            <Tab value={1} label="Images" />
          </Tabs>
          {model.tab === 0 && (
            <Shop deleteLogo={deleteLogo} shop={model} update={update} upload={upload} />
          )}
          {model.tab === 1 && <ShopImagesList shop={model} />}
        </>
      )}
    </Observer>
  )
}
