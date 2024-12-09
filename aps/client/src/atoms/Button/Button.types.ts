import { ButtonProps } from "antd/lib/button"

export interface IButton extends ButtonProps {
  styleType?: ButtonStyleType
}
export enum ButtonStyleType {
  PRIMARY = "primary",
}
