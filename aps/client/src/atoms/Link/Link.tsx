import { PropsWithChildren } from "react"
import { ILink, LinkStyleType } from "./Link.types"
import "./Link.style.scss"
import { Link as RouterLink } from "react-router-dom"

export default function Link({ children = "link", styleType = LinkStyleType.PRIMARY, ...props }: PropsWithChildren<ILink>) {
  return (
    <RouterLink className={`link link--${styleType}`} {...props}>
      {children}
    </RouterLink>
  )
}
