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
import { useObserver } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { tournament_routes } from "../../main"
import { useAxios, useSnack } from "../../services"
import { ApplyRemoveDialog, ImageItemUpload, NoElements } from "../common"
import { ITournamentImageModel } from "../models"
import { useTournamentContext } from "./tournament.loader"
import { TTournamentImage } from "./types"

export const ImagesList: FC = () => {
  const tournament = useTournamentContext()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnack()

  const uploadImage = async (file: File) => {
    tournament.setLoading(true)
    try {
      const res = await axios.makeRequest<TTournamentImage[], File>({
        data: file,
        method: "POST",
        url: tournament_routes.image(tournament.id),
      })
      tournament.setImages(res)
      enqueueSnackbar("Succesfully uploaded", {
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

  const deleteImage = async (image_id: string) => {
    tournament.setLoading(true)
    try {
      const res = await axios.makeRequest<TTournamentImage[]>({
        method: "DELETE",
        url: tournament_routes.deleteImage(tournament.id, image_id),
      })
      tournament.setImages(res)
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
  return useObserver(() => (
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
          {tournament.images.length ? (
            tournament.images.map((image) => (
              <ImageListItem image={image} deleteImage={deleteImage} key={image.id} />
            ))
          ) : (
            <NoElements />
          )}
        </div>
      </CardContent>
    </Card>
  ))
}

type TImageListItemProps = {
  image: ITournamentImageModel
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
