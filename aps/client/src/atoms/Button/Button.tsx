import { Button as AntButton } from "antd"
import { PropsWithChildren } from "react"
import { IButton, ButtonStyleType } from "./Button.types"
import "./Button.style.scss"

export default function Button({ children = "Button", styleType = ButtonStyleType.PRIMARY, ...props }: PropsWithChildren<IButton>) {
  return (
    <AntButton className={`btn btn--${styleType}`} {...props} data-cy>
      {children}
    </AntButton>
  )
}
