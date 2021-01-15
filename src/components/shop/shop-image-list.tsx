import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core"
import { Observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { shop_routes } from "../../main"
import { useAxios, useSnack } from "../../services"
import { ApplyRemoveDialog, ImageItemUpload, NoElements } from "../common"
import { IShopImageModel } from "../models"
import { useShopContext } from "./shop.loader"
import { TShopImage } from "./types"

export const ShopImagesList: FC = () => {
  const shop = useShopContext()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnack()
  const uploadImage = async (file: File) => {
    shop.setLoading(true)
    try {
      const res = await axios.makeRequest<TShopImage[], File>({
        data: file,
        method: "PATCH",
        url: shop_routes.upload(shop.id),
      })
      shop.setImages(res)
      enqueueSnackbar("Succesfully uploaded", {
        variant: "success",
      })
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    } finally {
      shop.setLoading(false)
    }
  }
  const deleteImage = async (image_id: string) => {
    shop.setLoading(true)
    try {
      const res = await axios.makeRequest<TShopImage[]>({
        method: "DELETE",
        url: shop_routes.deleteImage(shop.id, image_id),
      })
      shop.setImages(res)
      enqueueSnackbar("Succesfully deleted", {
        variant: "success",
      })
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    } finally {
      shop.setLoading(false)
    }
  }
  return (
    <Observer>
      {() => (
        <Card>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <CardHeader title="Image list" />
            </Grid>
            <Grid item>
              <ImageItemUpload upload={uploadImage} />
            </Grid>
          </Grid>
          <CardContent>
            <div>
              {shop.images.length ? (
                shop.images.map((image) => (
                  <ImageListItem image={image} deleteImage={deleteImage} key={image.id} />
                ))
              ) : (
                <NoElements />
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </Observer>
  )
}

type TImageListItemProps = {
  image: IShopImageModel
  deleteImage: (id: string) => void
}
const ImageListItem: FC<TImageListItemProps> = (props) => {
  const { image, deleteImage } = props
  const classes = useStyles()
  return (
    <div>
      <Grid container justify="space-between" alignItems="center" style={{ padding: "7px 0" }}>
        <Grid item xs={12} md={1}>
          <Avatar src={image.url} variant="rounded" className={classes.avatar}></Avatar>
        </Grid>
        <Grid item xs={12} md={4}>
          <ImageItemDialog url={image.url} />
        </Grid>
        <Grid item xs={12} md={4}>
          <ApplyRemoveDialog id={image.id} removeEntity={deleteImage} entity_name="image" />
        </Grid>
      </Grid>
      <Divider />
    </div>
  )
}

type TImageItemDialogProps = {
  url: string
}
const ImageItemDialog: FC<TImageItemDialogProps> = (props) => {
  const { url } = props
  const [open, setOpen] = useState<boolean>(false)
  const classes = useStyles()
  return (
    <>
      <Button onClick={() => setOpen(true)}>More</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <img src={url} alt={"logo"} {...{ loading: "lazy" }} className={classes.fullImg} />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const useStyles = makeStyles(() => ({
  avatar: {
    width: "100%",
    "& img": {
      objectFit: "contain",
    },
  },
  fullImg: {
    width: "100%",
  },
}))