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
import { tournament_routes } from "../../main"
import { useAxios } from "../../services"
import { ApplyRemoveDialog, ImageItemUpload, NoElements } from "../common"
import { IMediaModel, ITournamentModel } from "../models"
import { TMedia } from "./types"

type TImageListProps = {
  tournament: ITournamentModel
}
export const ImagesList: FC<TImageListProps> = ({ tournament }) => {
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()

  const upload = async (data: FormData) => {
    tournament.setLoading(true)
    try {
      const res = await axios.makeRequest<TMedia, FormData>({
        data,
        method: "PUT",
        url: tournament_routes.image(tournament.id),
      })
      tournament.addImage(res)
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    } finally {
      tournament.setLoading(false)
    }
  }

  const deleteOne = async (image_id: string) => {
    tournament.setLoading(true)
    try {
      await axios.makeRequest({
        method: "DELETE",
        url: tournament_routes.deleteImage(image_id),
      })
      tournament.deleteImage(image_id)
      enqueueSnackbar("Succesfully deleted", {
        variant: "success",
      })
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
    } finally {
      tournament.setLoading(false)
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
              {tournament.images.length ? (
                tournament.images.map((image) => (
                  <ImageListItem image={image} deleteOne={deleteOne} key={image.id} />
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
  image: IMediaModel
  deleteOne: (id: string) => void
}
const ImageListItem: FC<TImageListItemProps> = ({ image, deleteOne }) => {
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
          <ApplyRemoveDialog id={image.id} removeEntity={deleteOne} entity_name="image" />
        </Grid>
      </Grid>
      <Divider />
    </div>
  )
}

type TImageItemDialogProps = {
  url: string
}
const ImageItemDialog: FC<TImageItemDialogProps> = ({ url }) => {
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

const useStyles = makeStyles((_theme) => ({
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
