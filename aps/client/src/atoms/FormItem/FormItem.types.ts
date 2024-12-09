import { FormItemProps } from "antd"

export interface IFormItem extends FormItemProps {
  styleType?: FormItemStyleType
}
export enum FormItemStyleType {
  PRIMARY = "primary",
}
