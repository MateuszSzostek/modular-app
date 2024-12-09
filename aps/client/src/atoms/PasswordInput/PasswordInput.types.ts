import { InputProps } from "antd"

export interface IPasswordInput extends InputProps {
  styleType?: PasswordInputStyleType
}
export enum PasswordInputStyleType {
  PRIMARY = "primary",
}
