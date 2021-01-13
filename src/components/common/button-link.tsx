import { Button, ButtonProps } from "@material-ui/core"
import React from "react"
import { Link, LinkProps } from "react-router-dom"

type TButtonLinkProps = ButtonProps & LinkProps
export const ButtonLink: React.SFC<TButtonLinkProps> = props => (
  <Button component={Link as any} {...props} />
)
