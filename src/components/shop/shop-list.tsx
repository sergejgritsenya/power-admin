import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core"
import React, { FC } from "react"
import { ApplyRemoveDialog, ButtonLink, NoElements } from "../common"
import { TShopList } from "./types"

type TShopListProps = {
  deleteOne: (shop_id: string) => void
  list: TShopList
}
export const ShopList: FC<TShopListProps> = ({ list, deleteOne }) => {
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
        <ShopListTable list={list} deleteOne={deleteOne} />
      </CardContent>
    </Card>
  )
}

type TShopListTableProps = {
  deleteOne: (shop_id: string) => void
  list: TShopList
}
const ShopListTable: FC<TShopListTableProps> = ({ deleteOne, list }) => {
  const { avatar } = useStyles()

  if (!list.length) {
    return <NoElements />
  }

  return (
    <>
      {list.map((shop) => (
        <div key={shop.id}>
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            style={{ padding: "7px 0" }}
          >
            <Grid item xs={12} md={6} lg={2}>
              {shop.logo ? (
                <Avatar src={shop.logo} variant="rounded" className={avatar} />
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
              <ApplyRemoveDialog
                id={shop.id}
                removeEntity={deleteOne}
                entity_name="shop"
              />
            </Grid>
          </Grid>
          <Divider />
        </div>
      ))}
    </>
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
