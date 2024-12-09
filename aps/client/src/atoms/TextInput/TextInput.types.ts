import { InputProps } from "antd"

export interface ITextInput extends InputProps {
  styleType?: TextInputStyleType
}
export enum TextInputStyleType {
  PRIMARY = "primary",
}
