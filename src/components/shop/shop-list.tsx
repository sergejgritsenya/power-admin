import { Avatar, Card, CardContent, CardHeader, Divider, Grid, makeStyles } from "@material-ui/core"
import React, { FC, useMemo } from "react"
import { ApplyRemoveDialog, ButtonLink, NoElements } from "../common"
import { TShopList } from "./types"

type TShopListProps = {
  list: TShopList[]
  deleteShop: (shop_id: string) => void
}
export const ShopList: FC<TShopListProps> = ({ list, deleteShop }) => {
  return (
    <Card>
      <CardContent>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <CardHeader title="Shop list" />
          </Grid>
          <Grid item>
            <ButtonLink to="/shop/create" color="primary">
              Create
            </ButtonLink>
          </Grid>
        </Grid>
        <Grid container justify="flex-start" alignItems="center">
          <Grid item xs={12} md={6} lg={2}>
            <h3>Logo</h3>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <h3>Name</h3>
          </Grid>
          <Grid item xs={12} md={6} lg={3} />
          <Grid item xs={12} md={6} lg={3} />
        </Grid>
        <ShopListTable list={list} deleteShop={deleteShop} />
      </CardContent>
    </Card>
  )
}

type TShopListTableProps = {
  list: TShopList[]
  deleteShop: (shop_id: string) => void
}
const ShopListTable: FC<TShopListTableProps> = ({ list, deleteShop }) => {
  const classes = useStyles()
  return (
    <div>
      {list.length ? (
        list.map((shop) => (
          <div key={shop.id}>
            <Grid container justify="flex-start" alignItems="center" style={{ padding: "7px 0" }}>
              <Grid item xs={12} md={6} lg={2}>
                {shop.logo ? (
                  <Avatar src={shop.logo} variant="rounded" className={classes.avatar} />
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                {shop.name}
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <ButtonLink to={`shop/${shop.id}`}>More</ButtonLink>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <ApplyRemoveDialog id={shop.id} removeEntity={deleteShop} entity_name="shop" />
              </Grid>
            </Grid>
            <Divider />
          </div>
        ))
      ) : (
        <NoElements />
      )}
    </div>
  )
}

const useStyles = makeStyles(() => ({
  avatar: {
    width: "auto",
    display: "flex",
    justifyContent: "flex-start",
    "& img": {
      width: "auto",
      objectFit: "contain",
    },
  },
}))
