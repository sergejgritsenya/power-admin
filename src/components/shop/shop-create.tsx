import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { Observer } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { shop_routes } from "../../main"
import { useAxios } from "../../services"
import { Locker, SaveButton } from "../common"
import { ShopCreateModel } from "../models"
import { TShopUpdateProps } from "./types"

export const ShopCreate: FC = () => {
  const axios = useAxios()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const model = useMemo(() => {
    return ShopCreateModel.create()
  }, [])
  const create = async () => {
    model.setLoading(true)
    try {
      const res = await axios.makeRequest<string, TShopUpdateProps>({
        data: model.json,
        method: "POST",
        url: shop_routes.root,
      })
      model.setLoading(false)
      enqueueSnackbar("Successfully created", {
        variant: "success",
      })
      history.replace(`/shop/${res}`)
    } catch (e) {
      model.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    }
  }
  return (
    <Observer>
      {() => (
        <Card>
          <CardHeader title={`Create new shop: ${model.name}`} />
          <CardContent>
            <Grid container>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="name"
                  value={model.name}
                  onChange={(e) => model.setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="price"
                  value={model.price}
                  onChange={(e) => model.setPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="description"
                  value={model.description}
                  onChange={(e) => model.setDescription(e.target.value)}
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
            {model.validation && <SaveButton save={create} />}
          </CardContent>
          {model.is_loading && <Locker />}
        </Card>
      )}
    </Observer>
  )
}
