import { WithSnackbarProps } from "notistack"

class SnackService {
  private static instance: SnackService
  private constructor() {}

  public static init(): SnackService {
    if (!SnackService.instance) {
      SnackService.instance = new SnackService()
    }
    return SnackService.instance
  }

  public enqueueSnackbar: WithSnackbarProps["enqueueSnackbar"] = () => {
    throw new Error("enqueueSnackbar is not initialized")
  }
  public closeSnackbar: WithSnackbarProps["closeSnackbar"] = () => {
    throw new Error("enqueueSnackbar is not initialized")
  }
}

export const useSnack = () => SnackService.init()
