import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core"
import { Observer } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo, useState } from "react"
import { tournament_routes } from "../../main"
import { useAxios } from "../../services"
import { ApplyRemoveDialog, NoElements } from "../common"
import { IMediaModel, ITournamentModel, TournamentVideoCreateModel } from "../models"
import { TMedia, TTournamentVideoCreateRequest } from "./types"

type TVideosListProps = {
  tournament: ITournamentModel
}
export const VideosList: FC<TVideosListProps> = ({ tournament }) => {
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()

  const create = async (data: TTournamentVideoCreateRequest) => {
    tournament.setLoading(true)
    try {
      const res = await axios.makeRequest<TMedia, TTournamentVideoCreateRequest>({
        data,
        method: "PUT",
        url: tournament_routes.video(tournament.id),
      })
      tournament.addVideo(res)
      tournament.setLoading(false)
      enqueueSnackbar("Succesfully created", {
        variant: "success",
      })
    } catch (e) {
      tournament.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
    }
  }

  const deleteOne = async (video_id: string) => {
    tournament.setLoading(true)
    try {
      await axios.makeRequest({
        method: "DELETE",
        url: tournament_routes.deleteVideo(video_id),
      })
      tournament.deleteVideo(video_id)
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
              <CardHeader title="Video list" />
            </Grid>
            <Grid item>
              <VideoCreateDialog createOne={create} />
            </Grid>
          </Grid>
          <CardContent>
            <div>
              {tournament.videos.length ? (
                tournament.videos.map((video) => (
                  <VideoListItem video={video} deleteVideo={deleteOne} key={video.id} />
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

type TVideoCreateItemProps = {
  createOne: (data: TTournamentVideoCreateRequest) => void
}
const VideoCreateDialog: FC<TVideoCreateItemProps> = (props) => {
  const { createOne } = props
  const classes = useStyles()
  const [open, setOpen] = useState<boolean>(false)
  const model = useMemo(() => {
    return TournamentVideoCreateModel.create()
  }, [])
  const create = () => {
    createOne(model.json)
    setOpen(false)
    model.discard()
  }
  const close = () => {
    setOpen(false)
    model.discard()
  }
  return (
    <Observer>
      {() => (
        <div className={classes.create}>
          <Button color="primary" onClick={() => setOpen(true)}>
            Add
          </Button>
          <Dialog open={open} onClose={close} maxWidth="sm" fullWidth>
            <DialogTitle>Incorporate YouTube link</DialogTitle>
            <DialogContent>
              <TextField
                label="url"
                value={model.url}
                onChange={(e) => model.setUrl(e.target.value)}
                multiline
                rows={4}
              />
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={close}>
                Close
              </Button>
              <Button color="primary" onClick={create}>
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </Observer>
  )
}
type TVideoListItemProps = {
  deleteVideo: (id: string) => void
  video: IMediaModel
}
const VideoListItem: FC<TVideoListItemProps> = ({ video, deleteVideo }) => {
  const { iframe } = useStyles()
  return (
    <div>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        style={{ padding: "7px 0" }}
      >
        <Grid item xs={12} md={10}>
          <div className={iframe} dangerouslySetInnerHTML={{ __html: video.url }} />
        </Grid>
        <Grid item xs={12} md={2} container justify="center">
          <ApplyRemoveDialog
            id={video.id}
            removeEntity={deleteVideo}
            entity_name="video"
          />
        </Grid>
      </Grid>
      <Divider />
    </div>
  )
}

const useStyles = makeStyles(
  (theme) => {
    return {
      create: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridColumnGap: "8px",
        margin: "8px 0",
      },
      iframe: {
        border: `1px solid ${theme.palette.common}`,
        "& iframe": {
          width: "100%",
          height: "400px",
          marginBottom: "-5px",
        },
      },
    }
  },
  { name: "VideoLisstItem" }
)
