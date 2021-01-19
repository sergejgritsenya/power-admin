import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { Observer } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC } from "react"
import { shop_routes } from "../../main"
import { useAxios } from "../../services"
import { ImageUpload, Locker, SaveButton } from "../common"
import { IShopModel } from "../models"
import { useShopContext } from "./shop.loader"
import { TShop, TShopUpdateProps } from "./types"

export const ShopMain: FC = () => {
  const shop = useShopContext()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()

  const update = async () => {
    shop.setLoading(true)
    try {
      await axios.makeRequest<TShop, TShopUpdateProps>({
        data: shop.json,
        method: "PATCH",
        url: shop_routes.get(shop.id),
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
      shop.setLoading(false)
    }
  }
  return <ShopField shop={shop} update={update} />
}

type TShopFieldProps = {
  shop: IShopModel
  update: () => void
}
const ShopField: FC<TShopFieldProps> = (props) => {
  const { shop, update } = props
  return (
    <Observer>
      {() => (
        <Card>
          <CardHeader title={`Shop ${shop.name}`} />
          <CardContent>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={9}>
                <Grid item xs={9}>
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <TextField
                        label="name"
                        value={shop.name}
                        onChange={(e) => shop.setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <TextField
                        label="price"
                        value={shop.price}
                        onChange={(e) => shop.setPrice(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="description"
                        value={shop.description}
                        onChange={(e) => shop.setDescription(e.target.value)}
                        multiline
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3}>
                <LogoUpload />
              </Grid>
            </Grid>
            {shop.validation && <SaveButton save={update} />}
          </CardContent>
          {shop.is_loading && <Locker />}
        </Card>
      )}
    </Observer>
  )
}

const LogoUpload: FC = () => {
  const shop = useShopContext()
  const axios = useAxios()
  const upload = async (data: FormData) => {
    const res = await axios.makeRequest<string, FormData>({
      data,
      method: "PUT",
      url: shop_routes.upload(shop.id),
    })
    shop.setLogo(res)
  }

  const deleteLogo = async () => {
    await axios.makeRequest<string>({
      method: "DELETE",
      url: shop_routes.deleteLogo(shop.id),
    })
    shop.setLogo("")
  }

  return (
    <Observer>
      {() => <ImageUpload src={shop.logo} upload={upload} deleteLogo={deleteLogo} />}
    </Observer>
  )
}
