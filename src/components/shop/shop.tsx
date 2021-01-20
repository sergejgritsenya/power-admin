import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { Observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ImageUpload, Locker, SaveButton } from "../common"
import { IShopModel } from "../models"

type TShopProps = {
  deleteLogo: () => Promise<void>
  shop: IShopModel
  update: () => void
  upload: (file: FormData) => Promise<void>
}
export const Shop: FC<TShopProps> = ({ deleteLogo, shop, update, upload }) => (
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
              <ImageUpload src={shop.logo} upload={upload} deleteLogo={deleteLogo} />
            </Grid>
          </Grid>
          {shop.validation && <SaveButton save={update} />}
        </CardContent>
        {shop.is_loading && <Locker />}
      </Card>
    )}
  </Observer>
)
