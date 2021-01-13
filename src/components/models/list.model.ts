import { Instance, types } from "mobx-state-tree"

const ListItem = types.model()

export const ListModel = types
  .model({
    is_loading: false,
    list: types.array(ListItem),
  })
  .actions((self) => ({
    setList<T>(list: T[]) {
      self.list.replace(list)
    },
    setLoading(is_loading: boolean) {
      self.is_loading = is_loading
    },
  }))

export interface IListModel extends Instance<typeof ListModel> {}
