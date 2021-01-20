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
import { useSnackbar } from "notistack"
import React, { FC, useState } from "react"
import { shop_routes } from "../../main"
import { useAxios } from "../../services"
import { ApplyRemoveDialog, ImageItemUpload, NoElements } from "../common"
import { IMediaModel, IShopModel } from "../models"
import { TShopImage } from "./types"

type TShopImageListProps = {
  shop: IShopModel
}
export const ShopImagesList: FC<TShopImageListProps> = ({ shop }) => {
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()

  const deleteImage = async (image_id: string) => {
    shop.setLoading(true)
    try {
      await axios.makeRequest({
        method: "DELETE",
        url: shop_routes.deleteImage(image_id),
      })
      shop.deleteImage(image_id)
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

  const upload = async (data: FormData) => {
    shop.setLoading(true)
    try {
      const res = await axios.makeRequest<TShopImage, FormData>({
        data,
        method: "PUT",
        url: shop_routes.image(shop.id),
      })
      const list = shop.addImage(res)
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
              <ImageItemUpload upload={upload} />
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
  deleteImage: (id: string) => void
  image: IMediaModel
}
const ImageListItem: FC<TImageListItemProps> = (props) => {
  const { image, deleteImage } = props
  const { avatar } = useStyles()
  return (
    <div>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        style={{ padding: "7px 0" }}
      >
        <Grid item xs={12} md={1}>
          <Avatar src={image.url} variant="rounded" className={avatar}></Avatar>
        </Grid>
        <Grid item xs={12} md={4}>
          <ImageItemDialog url={image.url} />
        </Grid>
        <Grid item xs={12} md={4}>
          <ApplyRemoveDialog
            id={image.id}
            removeEntity={deleteImage}
            entity_name="image"
          />
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
  const { fullImg } = useStyles()
  return (
    <>
      <Button onClick={() => setOpen(true)}>More</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <img src={url} alt={"logo"} {...{ loading: "lazy" }} className={fullImg} />
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
