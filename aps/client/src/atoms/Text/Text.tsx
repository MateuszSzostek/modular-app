import { PropsWithChildren } from "react"
import { IText, TextStyleType } from "./Text.types"
import "./Text.style.scss"
import { Typography } from "antd"

export default function Text({ children = "text", styleType = TextStyleType.PRIMARY, ...props }: PropsWithChildren<IText>) {
  return (
    <Typography.Text className={`text text--${styleType}`} {...props}>
      {children}
    </Typography.Text>
  )
}
