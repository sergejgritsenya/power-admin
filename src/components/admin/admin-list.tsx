import { Card, CardContent, CardHeader, Divider, Grid } from "@material-ui/core"
import React, { FC } from "react"
import { ApplyRemoveDialog, ButtonLink, NoElements } from "../common"
import { TAdminList } from "./types"

type TAdminListProps = {
  list: TAdminList[]
  deleteAdmin: (admin_id: string) => void
  is_super: boolean
}
export const AdminList: FC<TAdminListProps> = ({ list, deleteAdmin, is_super }) => {
  return (
    <Card>
      <CardContent>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <CardHeader title="Admin list" />
          </Grid>
          <Grid item>
            {is_super && (
              <ButtonLink to="/admins/create" color="primary">
                Create
              </ButtonLink>
            )}
          </Grid>
        </Grid>
        <Grid container justify="flex-start" alignItems="center">
          <Grid item xs={12} md={6} lg={3}>
            <h3>Login</h3>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h3>Email</h3>
          </Grid>
          <Grid item xs={12} md={6} lg={3} />
          <Grid item xs={12} md={6} lg={3} />
        </Grid>
        <AdminListTable list={list} deleteAdmin={deleteAdmin} is_super={is_super} />
      </CardContent>
    </Card>
  )
}

type TAdminListTableProps = {
  list: TAdminList[]
  deleteAdmin: (admin_id: string) => void
  is_super: boolean
}
export const AdminListTable: FC<TAdminListTableProps> = ({ list, deleteAdmin, is_super }) => {
  return (
    <div>
      {list.length ? (
        list.map((admin) => (
          <div key={admin.id}>
            <Grid container justify="flex-start" alignItems="center" style={{ padding: "7px 0" }}>
              <Grid item xs={12} md={6} lg={3}>
                {admin.login}
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                {admin.email}
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <ButtonLink to={`/admins/${admin.id}`}>More</ButtonLink>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                {is_super && !admin.is_super ? (
                  <ApplyRemoveDialog
                    id={admin.id}
                    removeEntity={deleteAdmin}
                    entity_name={`admin ${admin.login}`}
                  />
                ) : null}
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
