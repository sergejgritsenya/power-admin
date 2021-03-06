import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core"
import Check from "@material-ui/icons/Check"
import Clear from "@material-ui/icons/Clear"
import React, { FC } from "react"
import { ApplyRemoveDialog, ButtonLink, NoElements } from "../common"
import { TNewsList } from "./types"

type TNewsListProps = {
  deleteOne: (news_id: string) => void
  news: TNewsList[]
}

export const NewsList: FC<TNewsListProps> = ({ news, deleteOne }) => (
  <Card>
    <CardContent>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <CardHeader title="News list" />
        </Grid>
        <Grid item>
          <ButtonLink to="/news/create" color="primary">
            Create
          </ButtonLink>
        </Grid>
      </Grid>
      <Grid container justify="flex-start" alignItems="center">
        <Grid item xs={12} md={6} lg={2}>
          <h3>Logo</h3>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <h3>Title</h3>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <h3>Publish</h3>
        </Grid>
        <Grid item xs={12} md={6} lg={2} />
        <Grid item xs={12} md={6} lg={2} />
      </Grid>
      <NewsListTable news={news} deleteOne={deleteOne} />
    </CardContent>
  </Card>
)

type TNewsListTableProps = {
  deleteOne: (news_id: string) => void
  news: TNewsList[]
}
const NewsListTable: FC<TNewsListTableProps> = ({ news, deleteOne }) => {
  const { avatar } = useStyles()

  if (!news.length) {
    return <NoElements />
  }
  return (
    <div>
      {news.map((item) => (
        <div key={item.id}>
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            style={{ padding: "7px 0" }}
          >
            <Grid item xs={12} md={6} lg={2}>
              {item.logo ? (
                <Avatar src={item.logo} variant="rounded" className={avatar} />
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              {item.title}
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              {item.publish ? <Check color="primary" /> : <Clear color="secondary" />}
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <ButtonLink to={`/news/${item.id}`}>More</ButtonLink>
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <ApplyRemoveDialog
                id={item.id}
                removeEntity={deleteOne}
                entity_name="news"
              />
            </Grid>
          </Grid>
          <Divider />
        </div>
      ))}
    </div>
  )
}

const useStyles = makeStyles((_theme) => ({
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
