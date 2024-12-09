import { LinkProps } from "antd/es/typography/Link"

export interface ILink extends LinkProps {
  styleType?: LinkStyleType
  to: string
}
export enum LinkStyleType {
  PRIMARY = "primary"
}
