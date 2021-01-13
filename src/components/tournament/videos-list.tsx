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
import { useObserver } from "mobx-react-lite"
import React, { FC, useMemo, useState } from "react"
import { tournament_routes } from "../../main"
import { useAxios, useSnack } from "../../services"
import { ApplyRemoveDialog, NoElements } from "../common"
import { ITournamentVideoModel, TournamentVideoCreateModel } from "../models"
import { useTournamentContext } from "./tournament.loader"
import { TTournamentVideo, TTournamentVideoCreateRequest } from "./types"

export const VideosList: FC = () => {
  const tournament = useTournamentContext()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnack()
  const createVideo = async (data: TTournamentVideoCreateRequest) => {
    tournament.setLoading(true)
    try {
      const res = await axios.makeRequest<TTournamentVideo[], TTournamentVideoCreateRequest>({
        data,
        method: "POST",
        url: tournament_routes.video(tournament.id),
      })
      tournament.setVideos(res)
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
  const deleteVideo = async (video_id: string) => {
    tournament.setLoading(true)
    try {
      const res = await axios.makeRequest<TTournamentVideo[]>({
        method: "DELETE",
        url: tournament_routes.deleteVideo(tournament.id, video_id),
      })
      tournament.setVideos(res)
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
          <CardHeader title="Video list" />
        </Grid>
        <Grid item>
          <VideoCreateDialog createVideo={createVideo} />
        </Grid>
      </Grid>
      <CardContent>
        <div>
          {tournament.videos.length ? (
            tournament.videos.map((video) => (
              <VideoListItem video={video} deleteVideo={deleteVideo} key={video.id} />
            ))
          ) : (
            <NoElements />
          )}
        </div>
      </CardContent>
    </Card>
  ))
}

type TVideoCreateItemProps = {
  createVideo: (data: TTournamentVideoCreateRequest) => void
}
const VideoCreateDialog: FC<TVideoCreateItemProps> = (props) => {
  const { createVideo } = props
  const classes = useStyles()
  const [open, setOpen] = useState<boolean>(false)
  const model = useMemo(() => {
    return TournamentVideoCreateModel.create()
  }, [])
  const create = () => {
    createVideo(model.json)
    setOpen(false)
    model.discard()
  }
  const close = () => {
    setOpen(false)
    model.discard()
  }
  return useObserver(() => (
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
  ))
}
type TVideoListItemProps = {
  video: ITournamentVideoModel
  deleteVideo: (id: string) => void
}
const VideoListItem: FC<TVideoListItemProps> = (props) => {
  const { video, deleteVideo } = props
  const classes = useStyles()
  return (
    <div>
      <Grid container justify="space-between" alignItems="center" style={{ padding: "7px 0" }}>
        <Grid item xs={12} md={10}>
          <div className={classes.iframe} dangerouslySetInnerHTML={{ __html: video.url }} />
        </Grid>
        <Grid item xs={12} md={2} container justify="center">
          <ApplyRemoveDialog id={video.id} removeEntity={deleteVideo} entity_name="video" />
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
